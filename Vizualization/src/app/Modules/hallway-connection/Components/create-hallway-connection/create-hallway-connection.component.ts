import { Component, OnInit } from '@angular/core';
import { FloorService } from 'src/app/Modules/floor/floor.service';
import { HallwayConnectionService } from 'src/app/Modules/hallway-connection/HallwayConnection.service';

@Component({
  selector: 'app-create-hallway-connection',
  templateUrl: './create-hallway-connection.component.html',
  styleUrls: ['./create-hallway-connection.component.css']
})
export class CreateHallwayConnectionComponent implements OnInit {

  FloorId1 = '';
  FloorId2 = '';
  x1=0;
  y1=0;
  x2=0;
  y2=0;
  errorMessage: string | null = null;
  floors!: any[];

  constructor(private hallwayConnectionservice: HallwayConnectionService, private floorService: FloorService) {
    this.floorService.listFloors().subscribe(floor => {
      console.log('floors', floor);
      this.floors = floor;
    });
  }

  ngOnInit(): void {
 
    
  }

  createHallwayConnection() {
    const hallwayConnection = {
      FloorId1: this.FloorId1,
      FloorId2: this.FloorId2,
      x1:this.x1,
      y1:this.y1,
      x2:this.x2,
      y2:this.y2,
    }
    this.hallwayConnectionservice.createHallwayConnection(hallwayConnection).subscribe(
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
  }
}
