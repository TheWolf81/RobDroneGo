import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HallwayConnectionComponent } from './hallway-connection.component';
import { CreateHallwayConnectionComponent } from './Components/create-hallway-connection/create-hallway-connection.component';
import { EditHallwayConnectionComponent } from './Components/edit-hallway-connection/edit-hallway-connection.component';
import { ListHallwayConnectionsComponent } from './Components/list-hallway-connections/list-hallway-connections.component';
import { ListFloorsWithHallwayConnectionsComponent } from './Components/list-floors-with-hallway-connections/list-floors-with-hallway-connections.component';

const routes: Routes = [
  { path: 'create', component: CreateHallwayConnectionComponent},
  { path: 'edit', component: EditHallwayConnectionComponent},
  { path: 'listFloorsWithHallwayConnections', component: ListFloorsWithHallwayConnectionsComponent },
  { path: 'list', component: ListHallwayConnectionsComponent},
  { path: '', component: HallwayConnectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HallwayConnectionRoutingModule { }
