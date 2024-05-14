import { Component } from '@angular/core';
import { FloorService } from 'src/app/Modules/floor/floor.service';
import { HallwayConnectionService } from 'src/app/Modules/hallway-connection/HallwayConnection.service';

@Component({
  selector: 'app-edit-hallway-connection',
  templateUrl: './edit-hallway-connection.component.html',
  styleUrls: ['./edit-hallway-connection.component.css']
})
export class EditHallwayConnectionComponent {

  FloorId1 = '';
  FloorId2 = '';
  DomainId = '';
  errorMessage: string | null = null;
  floors!: any[];
  hallwayConnections!: any;

  constructor(private hallwayConnectionservice: HallwayConnectionService, private floorService: FloorService) {
}

  ngOnInit(): void {
    this.floorService.listFloors().subscribe(floor => {
      console.log('floors', floor);
      this.floors = floor;
    
    this.hallwayConnectionservice.getAllHallways().subscribe(hallwayConnections => {
      console.log('hallwayConnections', hallwayConnections);
      this.hallwayConnections = hallwayConnections;
      for(let i = 0; i < this.hallwayConnections.length; i++){
        for(let j = 0; j < this.floors.length; j++){
          if(this.hallwayConnections[i].FloorId1 == this.floors[j].DomainId){
            this.hallwayConnections[i].FloorName1 = this.floors[j].name;
          }
          if(this.hallwayConnections[i].FloorId2 == this.floors[j].DomainId){
            this.hallwayConnections[i].FloorName2 = this.floors[j].name;
          }
        }
      }
    });
  });
  }

  editHallwayConnection() {
    const hallwayConnection = {
      FloorId1: this.FloorId1,
      FloorId2: this.FloorId2,
      DomainId: this.DomainId,
    }
    console.log(this.DomainId);
    this.hallwayConnectionservice.editHallwayConnection(hallwayConnection).subscribe(
      (response) => {

        console.log(response);
        this.resetForm();
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );

  }
  resetForm(): void {
    this.FloorId1 = '';
    this.FloorId2 = '';
    this.DomainId = '';
  }
}
