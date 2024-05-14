// edit-floor.component.ts

import { Component } from '@angular/core';
import { FloorService, EditFloorResponse } from '../../floor.service';
import { BuildingService } from 'src/app/Modules/building/building.service';

@Component({
  selector: 'app-edit-floor',
  templateUrl: './edit-floor.component.html',
  styleUrls: ['./edit-floor.component.css']
})
export class EditFloorComponent {
  floorId: string = '';
  floorName: string = '';
  floorDescription: string = '';
  buildingId: string = '';  // Initialize with a default value if applicable
  buildings!: any[];
  floors!: any[];

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private floorService: FloorService, private buildingService: BuildingService) { }

  ngOnInit() {
    this.buildingService.listBuildings().subscribe(
      (buildings) => {
        console.log(buildings);
        this.buildings = buildings;
      },
      (error) => {
        console.error('Error fetching buildings:', error);
        this.errorMessage = 'Failed to fetch buildings. Please try again later.';
      }
    );
  }

  onBuildingChange(): void {
    if(this.buildingId != '') {
    console.log('Building selection changed, loading floors...');
    this.loadFloorsByBuilding();
  }
  else {
    console.log('Building selection cleared, resetting data...');
    }
  }

  loadFloorsByBuilding() {
    this.floorService.listFloorsByBuilding(this.buildingId).subscribe(
      (floors: any) => {
        console.log(floors);
        this.floors = floors.floorDTO;
      },
      (error) => {
        console.error('Error fetching floors:', error);
        this.errorMessage = 'Failed to fetch floors. Please try again later.';
      }
    );
  }

  editFloor(): void {
    const floorData: EditFloorResponse = {
      domain_id: this.floorId,
      name: this.floorName,
      description: this.floorDescription,
    };

    this.floorService.editFloor(floorData).subscribe(
      (response: EditFloorResponse) => {
        // Handle successful response
        console.log('Floor edited:', response); // log the entire response object
        // Reset form fields
        this.resetForm();
      },
      (error) => {
        // Handle error
        console.error('Error editing floor:', error);
        this.errorMessage = 'Failed to edit floor. Please try again later.';
      }
    );
    
  }

  resetForm(): void {
    this.floorId = '';
    this.floorName = '';
    this.floorDescription = '';
    this.errorMessage = null;
    this.buildingId = '';
    this.floors = [];
    this.successMessage = 'Floor edited successfully!';
  }
}
