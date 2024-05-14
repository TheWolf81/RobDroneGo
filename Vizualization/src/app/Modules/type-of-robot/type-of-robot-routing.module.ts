import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeOfRobotComponent } from './type-of-robot.component';
import { CreateTypeOfRobotComponent } from './Components/create-type-of-robot/create-type-of-robot.component';

const routes: Routes = [
  { path: 'create', component: CreateTypeOfRobotComponent},
  { path: '', component: TypeOfRobotComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeOfRobotRoutingModule { }
