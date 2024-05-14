import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingComponent } from './building.component';
import { ListBuildingsComponent } from './Components/list-buildings/list-buildings.component';
import { CreateBuildingComponent } from './Components/create-building/create-building.component';
import { EditBuildingComponent } from './Components/edit-building/edit-building.component';
import { ListBuildingsMaxMinFloorsComponent } from './Components/list-buildings-max-min-floors/list-buildings-max-min-floors.component';

const routes: Routes = [
  { path: 'create', component: CreateBuildingComponent },
  { path: 'edit', component: EditBuildingComponent },
  { path: 'list', component: ListBuildingsComponent },
  { path: 'listMaxMinFloors', component: ListBuildingsMaxMinFloorsComponent },
  { path: '', component: BuildingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingRoutingModule { }
