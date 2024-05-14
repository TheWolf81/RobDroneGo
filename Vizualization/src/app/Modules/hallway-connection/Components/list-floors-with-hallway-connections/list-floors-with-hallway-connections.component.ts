import { Component, OnInit } from '@angular/core';
import { EditHallwayConnectionRespons, HallwayConnectionService } from '../../HallwayConnection.service';
import { FloorService } from 'src/app/Modules/floor/floor.service';

@Component({
  selector: 'app-list-floors-with-hallway-connections',
  templateUrl: './list-floors-with-hallway-connections.component.html',
  styleUrls: ['./list-floors-with-hallway-connections.component.css']
})
export class ListFloorsWithHallwayConnectionsComponent implements OnInit {
  floors!: any[];
  data:string[]=[];
  errorMessage: string | null = null;

  constructor(private hallwayConnectionservice: HallwayConnectionService, private floorService: FloorService) {

  }

  ngOnInit(): void {
    this.ListarEdificiosPassagens();
  }
  ListarEdificiosPassagens() {
    this.floorService.listFloors().subscribe(floor => {


      this.floors = floor;
      
    this.hallwayConnectionservice.getListarEdificiosPassagens().subscribe(
      (response: any) => {
        if (response) {
          for(let i = 0; i < response.length; i++){
            for(let j = 0; j < this.floors.length; j++){
              if(response[i] == this.floors[j].DomainId){
                response[i] = this.floors[j].name;
              }
            }
          }
          this.data = response;
      }
        
      },
      (error: any) => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
    });

  }

}
