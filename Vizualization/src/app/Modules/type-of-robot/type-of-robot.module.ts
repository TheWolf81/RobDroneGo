import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeOfRobotRoutingModule } from './type-of-robot-routing.module';
import { TypeOfRobotComponent } from './type-of-robot.component';
import { CreateTypeOfRobotComponent } from './Components/create-type-of-robot/create-type-of-robot.component';
import { FormsModule } from '@angular/forms';

import { TypeOfRobotService } from './typeOfRobotService';


@NgModule({
  declarations: [
    TypeOfRobotComponent,
    CreateTypeOfRobotComponent
  ],
  imports: [
    CommonModule,
    TypeOfRobotRoutingModule,
    FormsModule
  ],
  providers: [
    TypeOfRobotService
  ]
})
export class TypeOfRobotModule { }
