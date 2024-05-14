import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { ViewPathComponent } from './Components/view-path/view-path.component';
import { FormsModule } from '@angular/forms';
import { RequestTaskComponent } from './Components/request-task/request-task.component';
import { ApproveDenyTaskRequestComponent } from './Components/approve-deny-task-request/approve-deny-task-request.component';
import { ListRequestedTasksComponent } from './Components/list-requested-tasks/list-requested-tasks.component';
import { ListTasksFilteredComponent } from './Components/list-tasks-filtered/list-tasks-filtered.component';
import { MelhorSequenciaComponent } from './Components/melhor-sequencia/melhor-sequencia.component';
import { GeneticoComponent } from './Components/genetico/genetico.component';


@NgModule({
  declarations: [
    TaskComponent,
    ViewPathComponent,
    RequestTaskComponent,
    ApproveDenyTaskRequestComponent,
    ListRequestedTasksComponent,
    ListTasksFilteredComponent,
    MelhorSequenciaComponent,
    GeneticoComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule
  ]
})
export class TaskModule { }
