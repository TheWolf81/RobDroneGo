import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RobotComponent } from './robot.component';
import { CreateRobotComponent } from './Components/create-robot/create-robot.component';
import { InhibitRobotComponent } from './Components/inhibit-robot/inhibit-robot.component';
import { ListRobotsComponent } from './Components/list-robots/list-robots.component';

const routes: Routes = [
  { path: 'create', component: CreateRobotComponent},
  { path: 'inhibit', component: InhibitRobotComponent},
  { path: 'list', component: ListRobotsComponent},
  { path: '', component: RobotComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RobotRoutingModule { }
