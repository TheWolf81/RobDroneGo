import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HallwayConnectionRoutingModule } from './hallway-connection-routing.module';
import { HallwayConnectionComponent } from './hallway-connection.component';
import { CreateHallwayConnectionComponent } from './Components/create-hallway-connection/create-hallway-connection.component';
import { EditHallwayConnectionComponent } from './Components/edit-hallway-connection/edit-hallway-connection.component';
import { ListHallwayConnectionsComponent } from './Components/list-hallway-connections/list-hallway-connections.component';
import { FormsModule } from '@angular/forms';
import { HallwayConnectionService } from 'src/app/Modules/hallway-connection/HallwayConnection.service';
import { ListFloorsWithHallwayConnectionsComponent } from './Components/list-floors-with-hallway-connections/list-floors-with-hallway-connections.component';


@NgModule({
  declarations: [
    HallwayConnectionComponent,
    CreateHallwayConnectionComponent,
    EditHallwayConnectionComponent,
    ListHallwayConnectionsComponent,
    ListFloorsWithHallwayConnectionsComponent

  ],
  imports: [
    CommonModule,
    HallwayConnectionRoutingModule,
    FormsModule
  ],
  providers:[
    HallwayConnectionService
  ]
})
export class HallwayConnectionModule { }
