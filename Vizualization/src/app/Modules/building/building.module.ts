import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingRoutingModule } from './building-routing.module';
import { BuildingComponent } from './building.component';
import { ListBuildingsComponent } from './Components/list-buildings/list-buildings.component';
//import { BuildingService } from 'src/app/Modules/building/building.service';
import { CreateBuildingComponent } from './Components/create-building/create-building.component';
import { EditBuildingComponent } from './Components/edit-building/edit-building.component';
import { ListBuildingsMaxMinFloorsComponent } from './Components/list-buildings-max-min-floors/list-buildings-max-min-floors.component';
import { FormsModule } from '@angular/forms';
import { BuildingService } from './building.service';

@NgModule({
  declarations: [
    BuildingComponent,
    ListBuildingsComponent,
    CreateBuildingComponent,
    EditBuildingComponent,
    ListBuildingsMaxMinFloorsComponent
  ],
  imports: [
    CommonModule,
    BuildingRoutingModule,
    FormsModule
  ],
  providers: [
    BuildingService
  ]
})
export class BuildingModule { }
