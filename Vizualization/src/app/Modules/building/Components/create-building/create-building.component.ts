import { Component, OnInit } from '@angular/core';
import { BuildingService, CreateBuildingResponse } from '../../building.service';

@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.css']
})
export class CreateBuildingComponent implements OnInit {

  code: string = '';
  description: string = '';
  max_length: number = 1;
  max_width: number = 1;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private buildingService: BuildingService) { }

  ngOnInit() {
  }

  createBuilding(): void {
    const buildingData = {
      code: this.code,
      description: this.description,
      max_length: this.max_length,
      max_width: this.max_width
    };

    this.buildingService.createBuilding(buildingData).subscribe(
      (response: CreateBuildingResponse) => {
        // Handle successful response
        this.resetForm();
        
      },
      (error) => {
        // Handle error
        this.errorMessage = "Failure in Building Creation"
        this.successMessage = null;
      }
    );
  }
  resetForm(): void {
    this.code = '';
    this.description = '';
    this.max_length = 0;
    this.max_width = 0;
    this.errorMessage = null;
    this.successMessage = 'Building created successfully!';
  }
  

}
