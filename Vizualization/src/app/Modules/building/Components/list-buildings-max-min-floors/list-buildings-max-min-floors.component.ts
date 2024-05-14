import { Component } from '@angular/core';
import { ListBuildingsWithMaxAndMinFloorsResponse, BuildingService } from '../../building.service';

@Component({
  selector: 'app-list-buildings-max-min-floors',
  templateUrl: './list-buildings-max-min-floors.component.html',
  styleUrls: ['./list-buildings-max-min-floors.component.css']
})
export class ListBuildingsMaxMinFloorsComponent {
  
  min: number = 0;
  max: number = 0;
  data: any[] = [];
  errorMessage: string | null = null;


  constructor(private buildingService: BuildingService) { }

  ngOnInit(): void {
  }

  listBuildingsWithMaxAndMinFloors(): void {
    if (this.max < this.min) {
      this.errorMessage = 'Max floors must be greater than min floors.';
      console.error(this.errorMessage);
      return;
    }

    const aux: ListBuildingsWithMaxAndMinFloorsResponse = {
      min: this.min,
      max: this.max
    }

    
    
    this.buildingService.listBuildingsWithMaxAndMinFloors(aux).subscribe(
      (response: any) => {
        if (response) {
          console.log(response);
          this.data = response.buildingDTOs;
        }
      },
      (error) => {
        console.error('Error fetching buildings:', error);
        this.errorMessage = error;
      }
    );
  }

}
