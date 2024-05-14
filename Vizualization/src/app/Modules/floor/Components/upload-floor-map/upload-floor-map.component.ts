import { Component } from '@angular/core';
import { FloorService, UploadFloorMapResponse} from '../../floor.service';
import { BuildingService } from 'src/app/Modules/building/building.service';

@Component({
  selector: 'app-upload-floor-map',
  templateUrl: './upload-floor-map.component.html',
  styleUrls: ['./upload-floor-map.component.css']
})

export class UploadFloorMapComponent {
  floorMazeData: string = '';
  floorId: string = '';
  buildingId: string = '';  // Initialize with a default value if applicable
  buildings!: any[];
  floors!: any[];
  errorMessage: string | null = null;


  constructor(private floorService: FloorService, private buildingService: BuildingService) { }

  //loadFloorMap()

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
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error fetching floors:', error);
        this.errorMessage = 'Failed to fetch floors. Please try again later.';
      }
    );
  }

  uploadFloorMap(): void {
    const floorData: UploadFloorMapResponse = {
      domain_id: this.floorId,
      floorMazeInfo: JSON.parse(this.floorMazeData)
    };

    console.log(floorData);
    console.log (floorData.domain_id);
    console.log (floorData.floorMazeInfo);

    this.floorService.uploadFloorMap(floorData).subscribe((response: UploadFloorMapResponse) => {
      console.log('Upload floor map response:', response);
      this.resetForm();
    },
    (error) => {
      console.error('Error in uploadFloorMap:', error);
      this.errorMessage = 'Failed to upload floor map. Please try again later.';
      }
    );
  } 


  resetForm(): void {
    this.floorId = '';
    this.floorMazeData = '';
    this.errorMessage = null;
  }
  
  



  

}
