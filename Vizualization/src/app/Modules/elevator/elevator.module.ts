import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElevatorRoutingModule } from './elevator-routing.module';
import { ElevatorComponent } from './elevator.component';
import { CreateElevatorComponent } from './Components/create-elevator/create-elevator.component';
import { EditElevatorComponent } from './Components/edit-elevator/edit-elevator.component';
import { ListElevatorByBuildingComponent } from './Components/list-elevator-by-building/list-elevator-by-building.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ElevatorComponent,
    CreateElevatorComponent,
    EditElevatorComponent,
    ListElevatorByBuildingComponent
  ],
  imports: [
    CommonModule,
    ElevatorRoutingModule,
    FormsModule
  ]
})
export class ElevatorModule { }
