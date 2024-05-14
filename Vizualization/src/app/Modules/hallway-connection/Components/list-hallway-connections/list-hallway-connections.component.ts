import { Component } from '@angular/core';
import { BuildingService } from 'src/app/Modules/building/building.service';
import { FloorService } from 'src/app/Modules/floor/floor.service';
import { GetHallwayConnection, HallwayConnectionService } from 'src/app/Modules/hallway-connection/HallwayConnection.service';

@Component({
  selector: 'app-list-hallway-connections',
  templateUrl: './list-hallway-connections.component.html',
  styleUrls: ['./list-hallway-connections.component.css']
})
export class ListHallwayConnectionsComponent {
  BuildingId1='';
  BuildingId2='';
  data:GetHallwayConnection[]=[];
  errorMessage: string | null = null;
  buildings!: any[];
  floors!: any[];

constructor(private hallwayConnectionservice : HallwayConnectionService ,private buildingService: BuildingService, private floorService: FloorService){
  this.buildingService.listBuildings().subscribe(buildings => {
    this.buildings = buildings;
    console.log(this.buildings);
  });
  this.floorService.listFloors().subscribe(floors => {
    this.floors = floors;
  });

}

ngOnInit(): void {
}


  ListarPassagensBtwene2Buildings(){
   
    this.hallwayConnectionservice.getHallwayConnection(this.BuildingId1,this.BuildingId2).subscribe(
      (response:any) => {
        console.log(response);
        for(let i = 0; i < response.length; i++){
          for(let j = 0; j < this.floors.length; j++){
            if(response[i].FloorId1 == this.floors[j].DomainId){
              response[i].FloorId1 = this.floors[j].name;
            }
            if(response[i].FloorId2 == this.floors[j].DomainId){
              response[i].FloorId2 = this.floors[j].name;
            }
          }
          for(let j = 0; j < this.buildings.length; j++){
            if(response[i].BuildingId1 == this.buildings[j].domain_id){
              response[i].BuildingId1 = this.buildings[j].code;
            }
            if(response[i].BuildingId2 == this.buildings[j].domain_id){
              response[i].BuildingId2 = this.buildings[j].code;
            }
          }
        }
        this.data = response;
        this.resetForm();
      },
      (error:any) => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }
  resetForm():void{
    this.BuildingId1='';
    this.BuildingId2='';
  }
}
