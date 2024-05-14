import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import Orientation from "./orientation.js"
import ThumbRaiser from "./thumb_raiser.js"
import { ActivatedRoute } from '@angular/router';
import { BuildingService, ListBuildingResponse } from 'src/app/Modules/building/building.service';
import { FloorService, ListFloorsByBuildingResponse, ListFloorsResponse } from 'src/app/Modules/floor/floor.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { GetHallwayConnection, HallwayConnectionService } from 'src/app/Modules/hallway-connection/HallwayConnection.service';
import { ListRoomsResponse, RoomService } from 'src/app/Modules/room/room.service';

@Component({
  selector: 'app-view-floor',
  templateUrl: './Thumb_Raiser.html',
  styleUrls: ['./view-floor.component.css']
})
export class ViewFloorComponent implements AfterViewInit {

  @ViewChild('myCanvas') private canvasRef!: ElementRef;
  private animationId: number | null = null;
  private data: any;
  thumbRaiser!: ThumbRaiser;
  buildservice: BuildingService;
  floorService: FloorService;
  http: HttpClient;
  roomService:RoomService;
  hallwayConnectionService: HallwayConnectionService;
  constructor(buildservice: BuildingService, floorService: FloorService, http: HttpClient, hallwayConnectionService: HallwayConnectionService,roomService:RoomService) {
    this.buildservice = buildservice;
    this.floorService = floorService;
    this.http = http;
    this.hallwayConnectionService = hallwayConnectionService;
    this.roomService=roomService;
  }

  getData(): Observable<any> {
    const buildings1 = this.buildservice.listBuildingsTo3D();

    const floors1 = this.floorService;
    let flors: Observable<ListFloorsResponse[]>;
    flors = floors1.listFloors();
    let halloowconection: Observable<GetHallwayConnection[]>;
    halloowconection = this.hallwayConnectionService.getAllHallways();



    // Suponha que buildingsObservable emite um array de EditBuildingResponse
    // e floorsObservable emite um array de ListFloorsByBuildingResponse
    let self = this;

    return combineLatest([buildings1, flors, halloowconection]).pipe(
      map(([buildings, floors, halloowconections]: [ListBuildingResponse[], ListFloorsResponse[], GetHallwayConnection[]]) => {
        return buildings.map(building => {
          return {

            ...building,
            floors: floors.filter((floor: ListFloorsResponse) => floor.building_id === building.domain_id).map(floor => {

              let nextfloors = [] as any, xs = [] as any, ys = [] as any;
              const halloowconectionsForFloor = halloowconections.filter((hc: GetHallwayConnection) => {
                if (hc.FloorId1 === floor.DomainId) {
                  nextfloors.push(hc.FloorId1);
                  xs.push(hc.x1);
                  ys.push(hc.y1);
                  return true;
                } else if (hc.FloorId2 === floor.DomainId) {
                  nextfloors.push(hc.FloorId2);
                  xs.push(hc.x2);
                  ys.push(hc.y2);
                  return true;
                }
                return false;
              });
              return {
                ...floor,
                nextfloors,
                xs,
                ys,
                halloowconections: halloowconectionsForFloor
              };
            })
          };
        });
      })
    );


  }
  getRoms(){
    const rooms = this.roomService.listRooms();
    let rom:ListRoomsResponse[] = [];
    let i=0;
    rooms.forEach(element => {
      for (let index = 0; index < element.length; index++) {
        rom.push(element[index]);
        
      }
     
    
    });
    return rom;
  }

  //url: string | null = this.route.snapshot.paramMap.get('url');  

  initialize() {
    this.getData().subscribe((data: any[]) => {
      const rooms = this.getRoms();
      console.log(rooms)
      this.data = data;
      //console.log("after assignment in subscribe", this.data);
      console.log(data)
      const request = this.http;
      console.log(request)
      const build = this.data;
      //console.log("in initialize", build);
      // Create the game
      this.thumbRaiser = new ThumbRaiser(
        this.canvas,
        {}, // General Parameters
        { scale: new THREE.Vector3(1.0, 0.5, 1.0) }, // Maze parameters
        {}, // Player parameters
        { ambientLight: { intensity: 0.1 }, pointLight1: { intensity: 50.0, distance: 20.0, position: new THREE.Vector3(-3.5, 10.0, 2.5) }, pointLight2: { intensity: 50.0, distance: 20.0, position: new THREE.Vector3(3.5, 10.0, -2.5) } }, // Lights parameters
        {}, // Fog parameters
        { view: "fixed", multipleViewsViewport: new THREE.Vector4(0.0, 1.0, 0.45, 0.5) }, // Fixed view camera parameters
        { view: "first-person", multipleViewsViewport: new THREE.Vector4(1.0, 1.0, 0.55, 0.5), initialOrientation: new Orientation(0.0, -10.0), initialDistance: 2.0, distanceMin: 1.0, distanceMax: 4.0 }, // First-person view camera parameters
        { view: "third-person", multipleViewsViewport: new THREE.Vector4(0.0, 0.0, 0.55, 0.5), initialOrientation: new Orientation(0.0, -20.0), initialDistance: 2.0, distanceMin: 1.0, distanceMax: 4.0 }, // Third-person view camera parameters
        { view: "top", multipleViewsViewport: new THREE.Vector4(1.0, 0.0, 0.45, 0.5), initialOrientation: new Orientation(0.0, -90.0), initialDistance: 4.0, distanceMin: 1.0, distanceMax: 16.0 }, // Top view camera parameters
        { view: "mini-map", multipleViewsViewport: new THREE.Vector4(0.99, 0.02, 0.3, 0.3), initialOrientation: new Orientation(180.0, -90.0), initialZoom: 0.64 }, // Mini-msp view camera parameters
        { build },
        { request},
        {rooms}
      );

    });

  }

  animate(): void {
    this.animationId = requestAnimationFrame(this.animate);
    // Update the game
    if (this.thumbRaiser)
      this.thumbRaiser.update();
  }

  ngAfterViewInit(): void {
    this.initialize();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.canvas.parentElement?.removeChild(this.canvas);
    if (this.thumbRaiser.userInterface) {
      this.thumbRaiser.userInterface.gui.destroy();
    }
  }



}
