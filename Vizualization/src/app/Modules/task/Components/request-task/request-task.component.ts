import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { TypeOfRobotService } from 'src/app/Modules/type-of-robot/typeOfRobotService';
import { RoomService } from 'src/app/Modules/room/room.service';
import { ElevatorService, ListElevatorByBuildingResponse } from 'src/app/Modules/elevator/elevator.service';
import { BuildingService } from 'src/app/Modules/building/building.service';
import { HallwayConnectionService } from 'src/app/Modules/hallway-connection/HallwayConnection.service';
import { FloorService } from 'src/app/Modules/floor/floor.service';

@Component({
  selector: 'app-request-task',
  templateUrl: './request-task.component.html',
  styleUrls: ['./request-task.component.css']
})
export class RequestTaskComponent {

  taskType: string = '';
  code: number = 0;
  status: string = "";
  email: string = "";
  deviceType: string = '';
  description: string = '';
  location1: string = '';
  location2: string = '';

  errorMessage: string | null = null;
  successMessage: string | null = null;

  types!: any[];
  rooms!: any[];
  elevators: any[] = [];
  buildings!: any[];
  floors!: any[];
  hallwayConnections: any[] = [];
  locationList: string[] = [];


  constructor(private taskService: TaskService, private typesService: TypeOfRobotService, private roomService: RoomService, private elevatorService: ElevatorService, private buildingService: BuildingService, private hallwayService: HallwayConnectionService, private floorService: FloorService) { }

  ngOnInit(): void {
    this.typesService.getAll().subscribe((typeOfRobots: any) =>{
      this.types=typeOfRobots;
    });

    this.roomService.listRooms().subscribe(rooms => {
      this.rooms = rooms;
      for (let room of this.rooms) {
        this.locationList.push(room.identifier.toLowerCase());
      }
    });

    this.buildingService.listBuildings().subscribe(buildings => {
      this.buildings = buildings;
      this.floorService.listFloors().subscribe(floors => {
        this.floors = floors;
        for (let building of this.buildings) {
          this.elevatorService.listElevatorsByBuilding(building.domain_id).subscribe((elevators: any) => {
            for (let elevator of elevators) {
              for (let floor of elevator.floors_servedId) {
                for (let floor2 of this.floors) {
                  if (floor == floor2.DomainId) {
                    this.locationList.push("e" + floor2.name.toLowerCase());
                  }
                }
              }
            }
            
        });
      }
      this.hallwayService.getAllHallways().subscribe((data: any[]) => {
        this.hallwayConnections = data;
        for (let hallway of this.hallwayConnections) {
          for (let floor of this.floors) {
            if (hallway.FloorId1 == floor.DomainId) {
              hallway.FloorId1 = floor.name;
            }
            if (hallway.FloorId2 == floor.DomainId) {
              hallway.FloorId2 = floor.name;
            }
          }
          this.locationList.push(hallway.FloorId1.toLowerCase() + hallway.FloorId2.toLowerCase());
        }

      });
      });
      console.log(this.locationList);
    });

  }

  RequestTask() {
    const taskData = {
      taskType: this.taskType,
      code: this.code,
      status: this.status,
      email: this.email,
      deviceType: this.deviceType,
      description: this.description,
      location1: this.location1,
      location2: this.location2
    };
    this.taskService.requestTask(taskData).subscribe(
      (response) => {
        console.log('New task created:', response);
        this.errorMessage = null;
        this.successMessage = 'Task created successfully.';
        this.resetForm();
      },
      (error) => {
        console.error('Error:', error);
        this.successMessage = null;
        if(error.status == 400){
          this.errorMessage = error.error.title;
        }else{
          this.errorMessage = 'Something went wrong.';
        }
      }
    );
  }

  resetForm(): void {
    this.taskType = '';
    this.code = 0;
    this.status = "";
    this.email = "";
    this.deviceType = '';
    this.description = '';
    this.location1 = '';
    this.location2 = '';
  } 
}
