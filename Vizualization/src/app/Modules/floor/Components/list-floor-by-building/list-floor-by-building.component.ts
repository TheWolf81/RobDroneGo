import { Component } from '@angular/core';
import { ListFloorsByBuildingResponse, FloorService } from '../../floor.service';
import { BuildingService } from 'src/app/Modules/building/building.service';

@Component({
  selector: 'app-list-floor-by-building',
  templateUrl: './list-floor-by-building.component.html',
  styleUrls: ['./list-floor-by-building.component.css']
})
export class ListFloorByBuildingComponent {
  buildingId: string = '';
  errorMessage: string | null = null;
  data: ListFloorsByBuildingResponse[] = [];

  buildings!: any[];

  constructor(private floorService: FloorService, private buildingService: BuildingService) { }

  ngOnInit() {
    this.buildingService.listBuildings().subscribe(buildings => {
      console.log(buildings)
      this.buildings = buildings;
    });
  }

  listFloorsByBuilding(): void {
    this.floorService.listFloorsByBuilding(this.buildingId).subscribe(
      (response: any) => {
        if (response) {
          console.log(response);
          this.data = response.floorDTO;
        }
      },
      (error) => {
        console.error('Error fetching floors:', error);
        this.errorMessage = "Error retrieving floors. No floors found for this building.";
      }
    );
  }
}
