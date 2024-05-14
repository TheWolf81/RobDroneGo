import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { ViewPathComponent } from './Components/view-path/view-path.component';
import { RequestTaskComponent } from './Components/request-task/request-task.component';
import { ApproveDenyTaskRequestComponent } from './Components/approve-deny-task-request/approve-deny-task-request.component';
import { ListRequestedTasksComponent } from './Components/list-requested-tasks/list-requested-tasks.component';
import { ListTasksFilteredComponent } from './Components/list-tasks-filtered/list-tasks-filtered.component';
import { MelhorSequenciaComponent } from './Components/melhor-sequencia/melhor-sequencia.component';
import { GeneticoComponent } from './Components/genetico/genetico.component';

const routes: Routes = [
  { path: 'listTasksFiltered', component: ListTasksFilteredComponent },
  { path: 'showRequestedTasks', component: ListRequestedTasksComponent },
  { path: 'viewPath', component: ViewPathComponent },
  { path: 'requestTask', component: RequestTaskComponent },
  { path: 'approveDenyTasks', component: ApproveDenyTaskRequestComponent },
  { path: 'melhorSequencia',  component: MelhorSequenciaComponent},
  { path: 'genetico',  component: GeneticoComponent},
  { path: '', component: TaskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
