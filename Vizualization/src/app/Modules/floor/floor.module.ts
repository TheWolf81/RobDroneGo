import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloorRoutingModule } from './floor-routing.module';
import { FloorComponent } from './floor.component';
import { CreateFloorComponent } from './Components/create-floor/create-floor.component';
import { EditFloorComponent } from './Components/edit-floor/edit-floor.component';
import { ListFloorByBuildingComponent } from './Components/list-floor-by-building/list-floor-by-building.component';
import { UploadFloorMapComponent } from './Components/upload-floor-map/upload-floor-map.component';

import { FloorService } from 'src/app/Modules/floor/floor.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FloorComponent,
    CreateFloorComponent,
    EditFloorComponent,
    ListFloorByBuildingComponent,
    UploadFloorMapComponent
  ],
  imports: [
    CommonModule,
    FloorRoutingModule,
    FormsModule
  ],
  providers: [
    FloorService
  ]
})
export class FloorModule { }
