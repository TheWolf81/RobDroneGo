import { Component, OnInit } from '@angular/core';
import { FloorService } from '../../floor.service';
import { BuildingService } from 'src/app/Modules/building/building.service';
import { CreateFloorResponse } from '../../floor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.css']
})
export class CreateFloorComponent {
  buildingId: string = '';
  floorNumber: number = 0;
  description: string = '';
  area: number = 0;
  name: string = '';
  floorMap: JSON[] = [];

  buildings!: any[];

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private floorService: FloorService, private router: Router, private buildingService: BuildingService) {}

    ngOnInit() {
      this.buildingService.listBuildings().subscribe(buildings => {
        console.log(buildings)
        this.buildings = buildings;
      });
    }

  createNewFloor(): void {
    const floorData = {
      building_id: this.buildingId,
      floorNumber: this.floorNumber,
      description: this.description,
      area: this.area,
      name: this.name,
      floorMap: this.floorMap
    };



    this.floorService.createFloor(floorData).subscribe(
      (response: CreateFloorResponse) => {
        // Handle successful response
        console.log('New floor created:', response); // log the entire response object
        // Reset form fields
        this.resetForm();
      },
      (error) => {
        // Handle error
        console.error('Error creating floor:', error);
        this.errorMessage = 'Failed to create floor. Please try again later.';
      }
    );
  }

  resetForm(): void {
    this.buildingId = '';
    this.floorNumber = 0;
    this.description = '';
    this.area = 0;
    this.name = '';
    this.floorMap = [];
    this.errorMessage = null;
    this.successMessage = 'Floor created successfully!';
  }

}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

