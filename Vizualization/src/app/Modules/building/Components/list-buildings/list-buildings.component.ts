import { Component, OnInit, Output } from '@angular/core';
import { BuildingService } from '../../building.service';
import { EditBuildingResponse } from '../../building.service';

@Component({
  selector: 'app-list-buildings',
  templateUrl: './list-buildings.component.html',
  styleUrls: ['./list-buildings.component.css']
})

export class ListBuildingsComponent implements OnInit{
  componentBuildingList!: EditBuildingResponse[];


  constructor(private buildingService: BuildingService) { }

  listBuildings() {
    this.buildingService.listBuildings().subscribe(
      (response: EditBuildingResponse[]) => {
        console.log(response);
        if (response) {
          this.componentBuildingList = response;
        }
      },
      (error) => {
        console.error('Error fetching buildings:', error);
      }
    );
  }

  ngOnInit(): void {
    this.listBuildings();
  }
  
  
  
  

}

