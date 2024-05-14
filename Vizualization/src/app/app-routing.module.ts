import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { PrivacyPolicyComponent } from './Modules/privacy-policy/privacy-policy.component';
import { VerifyAuthService } from './authentication_guard';
import { AuthenticationComponent } from './Components/authentication/authentication.component';
import { UnauthorizedComponent } from './Components/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'building', loadChildren: () => import('./Modules/building/building.module').then(m => m.BuildingModule), canActivate: [VerifyAuthService], data: {roles: ['CampusManager', 'SystemAdministrator']} },
  { path: 'task', loadChildren: () => import('./Modules/task/task.module').then(m => m.TaskModule), canActivate: [VerifyAuthService], data: {roles: ['TaskManager', 'SystemAdministrator', 'Client']} },
  { path: 'floor', loadChildren: () => import('./Modules/floor/floor.module').then(m => m.FloorModule), canActivate: [VerifyAuthService], data: {roles: ['CampusManager', 'SystemAdministrator']} },
  { path: 'room', loadChildren: () => import('./Modules/room/room.module').then(m => m.RoomModule), canActivate: [VerifyAuthService], data: {roles: ['CampusManager', 'SystemAdministrator']} },
  { path: 'elevator', loadChildren: () => import('./Modules/elevator/elevator.module').then(m => m.ElevatorModule), canActivate: [VerifyAuthService], data: {roles: ['CampusManager', 'SystemAdministrator']} },
  { path: 'robot', loadChildren: () => import('./Modules/robot/robot.module').then(m => m.RobotModule), canActivate: [VerifyAuthService], data: {roles: ['FleetManager', 'SystemAdministrator']} },
  { path: 'typeOfRobot', loadChildren: () => import('./Modules/type-of-robot/type-of-robot.module').then(m => m.TypeOfRobotModule), canActivate: [VerifyAuthService], data: {roles: ['FleetManager', 'SystemAdministrator']} },
  { path: 'hallwayConnection', loadChildren: () => import('./Modules/hallway-connection/hallway-connection.module').then(m => m.HallwayConnectionModule), canActivate: [VerifyAuthService], data: {roles: ['CampusManager', 'SystemAdministrator']} },
  { path: '3DVisualization', loadChildren: () => import('./Modules/three-dvisualization/three-dvisualization.module').then(m => m.ThreeDVisualizationModule), canActivate: [VerifyAuthService], data: {roles: ['CampusManager', 'SystemAdministrator']} },
  { path: 'auth', loadChildren: () => import('./Modules/auth/auth.module').then(m => m.AuthModule)},
  { path: 'privacyPolicyAndTermsOfUse', component: PrivacyPolicyComponent },
  { path: 'login', component: AuthenticationComponent},
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', component: HomeComponent, canActivate: [VerifyAuthService]  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
