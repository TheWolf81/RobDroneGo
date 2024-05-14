import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room.component';
import { CreateRoomComponent } from './Components/create-room/create-room.component';

const routes: Routes = [
  { path: 'create', component: CreateRoomComponent},
  { path: '', component: RoomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
