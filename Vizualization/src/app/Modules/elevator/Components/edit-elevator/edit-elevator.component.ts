import { Component } from '@angular/core';
import { ElevatorService } from '../../elevator.service';
import { BuildingComponent } from 'src/app/Modules/building/building.component';
import { BuildingService } from 'src/app/Modules/building/building.service';
import { FloorService } from 'src/app/Modules/floor/floor.service';

@Component({
  selector: 'app-edit-elevator',
  templateUrl: './edit-elevator.component.html',
  styleUrls: ['./edit-elevator.component.css']
})
export class EditElevatorComponent {
  elevatorDomainID: string = '';
  floors_servedId: JSON[] = [];
  description: string = '';
  building_id: string = '';
  floors!: any[];
  buildings!: any[];

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private elevatorService: ElevatorService, private buildingService: BuildingService, private floorService: FloorService) { }
  
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
    this.elevatorService.listElevatorsByBuilding(this.building_id).subscribe(
      (elevators: any) => {
        console.log(elevators);
        this.elevatorDomainID = elevators[0].id;
        console.log(this.elevatorDomainID);
        this.errorMessage = '';
      },
      (error) => {
        this.elevatorDomainID = '';
        console.error('Error fetching elevators:', error);
        this.errorMessage = 'Failed to fetch elevators';
      }
    );
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

  onFloorChange(event: any){
    this.floors_servedId.push(event.target.value);
  }

  editElevator(): void {
    const id = this.elevatorDomainID;
    const elevatorData = {
      floors_servedId: this.floors_servedId,
      description: this.description
    };

    this.elevatorService.editElevator(elevatorData, id).subscribe((response) => {
      console.log('Edit elevator response:', response);
      this.resetForm();
    },
    (error) => {
      console.error('Error in editElevator:', error);
      this.errorMessage = 'Failed to edit elevator. Please try again later.';
      this.successMessage = null;
      }
    );
  }

  resetForm(): void {
    this.elevatorDomainID = '';
    this.floors_servedId = [];
    this.description = '';
    this.errorMessage = null;
    this.successMessage = 'Elevator edited successfully!';
  }

}
