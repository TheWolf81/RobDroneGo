import { Component, OnInit } from '@angular/core';
import { CreateElevatorResponse, ElevatorService } from '../../elevator.service';
import { BuildingService } from 'src/app/Modules/building/building.service';
import { FloorService } from 'src/app/Modules/floor/floor.service';

@Component({
  selector: 'app-create-elevator',
  templateUrl: './create-elevator.component.html',
  styleUrls: ['./create-elevator.component.css']
})
export class CreateElevatorComponent implements OnInit {

  building_id: string = '';
  floors_servedId: string[] = [];
  description: string = '';

  buildings!: any[];
  floors!: any[];

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private elevatorService: ElevatorService,private buildingService: BuildingService, private floorService: FloorService) { }
  
  ngOnInit(): void {
    this.buildingService.listBuildings().subscribe(buildings => { 
      console.log(buildings)
      this.buildings = buildings;
    });
  }

  onBuildingChange(): void {
    if(this.building_id != '') {
    console.log('Building selection changed, loading floors...');
    this.loadFloorsByBuilding();
  }
  else {
    console.log('Building selection cleared, resetting data...');
    }
  }

  loadFloorsByBuilding() {
    this.floorService.listFloorsByBuilding(this.building_id).subscribe(
      (floors: any) => {
        console.log(floors);
        this.floors = floors.floorDTO;
        this.errorMessage = '';
      },
      (error) => {
        this.floors = [];
        console.error('Error fetching floors:', error);
        this.errorMessage = 'Failed to fetch floors';
      }
    );
  }

  onFloorChange(event: any): void {
    console.log('Floor selection changed');
    this.floors_servedId.push(event.target.value);
  }

  createElevator(): void {
    const elevatorData = {
      building_id: this.building_id,
      floors_servedId: JSON.parse(JSON.stringify(this.floors_servedId)),
      description: this.description
    };
    console.log(elevatorData);

    this.elevatorService.createElevator(elevatorData).subscribe(
      (response: CreateElevatorResponse) => {
        // Handle successful response
        this.resetForm();
        
      },
      (error) => {
        // Handle error
        this.errorMessage = "Failure in Elevator Creation"
        this.successMessage = null;
      }
    );
  }

  resetForm(): void {
    this.building_id = '';
    this.floors_servedId = [];
    this.description = '';
    this.errorMessage = null;
    this.successMessage = 'Elevator created successfully!';
  }
}
