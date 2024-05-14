import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorComponent } from './floor.component';
import { CreateFloorComponent } from './Components/create-floor/create-floor.component';
import { EditFloorComponent } from './Components/edit-floor/edit-floor.component';
import { ListFloorByBuildingComponent } from './Components/list-floor-by-building/list-floor-by-building.component';
import { UploadFloorMapComponent } from './Components/upload-floor-map/upload-floor-map.component';

const routes: Routes = [
  { path: 'create', component: CreateFloorComponent },
  { path: 'edit', component: EditFloorComponent },
  { path: 'listByBuilding', component: ListFloorByBuildingComponent },
  { path: 'uploadFloorMap', component: UploadFloorMapComponent },
  { path: '', component: FloorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorRoutingModule { }
