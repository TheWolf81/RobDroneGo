import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElevatorComponent } from './elevator.component';
import { CreateElevatorComponent } from './Components/create-elevator/create-elevator.component';
import { EditElevatorComponent } from './Components/edit-elevator/edit-elevator.component';
import { ListElevatorByBuildingComponent } from './Components/list-elevator-by-building/list-elevator-by-building.component';

const routes: Routes = [
  { path: 'create', component: CreateElevatorComponent},
  { path: 'edit', component: EditElevatorComponent},
  { path: 'listInBuilding', component: ListElevatorByBuildingComponent},
  { path: '', component: ElevatorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElevatorRoutingModule { }
