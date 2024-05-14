import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RobotRoutingModule } from './robot-routing.module';
import { RobotComponent } from './robot.component';
import { CreateRobotComponent } from './Components/create-robot/create-robot.component';
import { InhibitRobotComponent } from './Components/inhibit-robot/inhibit-robot.component';
import { ListRobotsComponent } from './Components/list-robots/list-robots.component';
import { RobotService } from './robot.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RobotComponent,
    CreateRobotComponent,
    InhibitRobotComponent,
    ListRobotsComponent
  ],
  imports: [
    CommonModule,
    RobotRoutingModule,
    FormsModule
  ],
  providers: [
    RobotService
  ]
  
})
export class RobotModule { }

