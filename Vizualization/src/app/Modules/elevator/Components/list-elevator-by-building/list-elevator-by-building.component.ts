import { Component } from '@angular/core';
import { ElevatorService, ListElevatorByBuildingResponse } from '../../elevator.service';
import { BuildingService } from 'src/app/Modules/building/building.service';
import { FloorService } from 'src/app/Modules/floor/floor.service';

@Component({
  selector: 'app-list-elevator-by-building',
  templateUrl: './list-elevator-by-building.component.html',
  styleUrls: ['./list-elevator-by-building.component.css']
})
export class ListElevatorByBuildingComponent {
  building_id: string = '';
  errorMessage: string | null = null;
  buildings!: any[];
  floors!: any[];
  data: ListElevatorByBuildingResponse[] = [];

  constructor(private elevatorService: ElevatorService, private buildingService: BuildingService, private floorService: FloorService) { }

  ngOnInit(): void {
    this.buildingService.listBuildings().subscribe(buildings => { 
      console.log(buildings)
      this.buildings = buildings;
    });

    this.floorService.listFloors().subscribe(floors => { 
      console.log(floors)
      this.floors = floors;
    });
  }

  onBuildingChange(): void {
    this.listElevatorsByBuilding();
  }

  listElevatorsByBuilding(): void {
    const buildingId = this.building_id;
    this.elevatorService.listElevatorsByBuilding(buildingId).subscribe(
      (response: any) => {
        console.log(response);
        if (response) {
          for (let i = 0; i < response.length; i++) {
            for(let j = 0; j < response[i].floors_servedId.length; j++) {
              response[i].floors_servedId[j] = this.floors.find(floor => floor.DomainId == response[i].floors_servedId[j])?.name;
            }
          }
          this.data = response;
        }
      },
      (error) => {
        console.error('Error fetching elevators:', error);
        this.errorMessage = error;
      }
    );
  }
}
