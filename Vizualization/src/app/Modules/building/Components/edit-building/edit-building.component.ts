import { Component } from '@angular/core';
import { BuildingService, EditBuildingResponse } from '../../building.service';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css']
})

export class EditBuildingComponent {
  buildingDomainID: string = '';
  buildingCode: string = '';
  buildingDescription: string = '';
  buildingMaxLength: number = 0;
  buildingMaxWidth: number = 0;

  errorMessage: string | null = null;

  buildings!: any[];

  constructor(private buildingService: BuildingService) { }

  ngOnInit() {
    this.buildingService.listBuildings().subscribe(
      (buildings) => {
        console.log(buildings);
        this.buildings = buildings;
        this.buildingDomainID = this.buildings[0].domain_id;
        console.log("OLA",this.buildingDomainID);
      },
      (error) => {
        console.error('Error fetching buildings:', error);
        this.errorMessage = 'Failed to fetch buildings. Please try again later.';
      }
    );
  }

  
  onBuildingChange(event: any): void {
    const buildingCode = event.target.value;
    if (buildingCode) {
      console.log('Building selection changed, loading data...');
      this.buildingDomainID = buildingCode; // Atualize o ID do edifício selecionado
  
      // Agora, você pode carregar os dados diretamente do objeto do edifício selecionado
      console.log("ORecebido do change",buildingCode);
      this.loadBuildingData(buildingCode);
    } else {
      console.log('Building selection cleared, resetting data...');
    }
  }
  
  loadBuildingData(buildingCode: string): void {
    //search for the building with the id
    let foundBuilding = this.buildings.find(building => building.code === buildingCode); //
    //update form data
    this.buildingDomainID = foundBuilding.domain_id;
    this.buildingCode = foundBuilding.code;
    this.buildingDescription = foundBuilding.description;
    this.buildingMaxLength = foundBuilding.max_length;
    this.buildingMaxWidth = foundBuilding.max_width;
  }

  editBuilding(): void {
    const buildingData: EditBuildingResponse = {
      domainId: this.buildingDomainID,
      code: this.buildingCode,
      description: this.buildingDescription,
      max_length: this.buildingMaxLength,
      max_width: this.buildingMaxWidth
    };

    // print the data
    console.log("OLA",buildingData);

    this.buildingService.editBuilding(buildingData).subscribe((response: EditBuildingResponse) => {
      console.log('Edit building response:', response);
      this.resetForm();
    },
    (error) => {
      console.error('Error in editBuilding:', error);
      this.errorMessage = 'Failed to edit building. Please try again later.';
      }
    );
    
  }

  resetForm(): void {
    this.buildingDomainID = '';
    this.buildingCode = '';
    this.buildingDescription = '';
    this.buildingMaxLength = 0;
    this.buildingMaxWidth = 0;
    this.errorMessage = null;

    // also reload the page
    window.location.reload();
  }



}
