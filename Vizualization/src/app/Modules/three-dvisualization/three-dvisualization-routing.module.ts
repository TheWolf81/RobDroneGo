import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreeDVisualizationComponent } from './three-dvisualization.component';
import { ViewFloorComponent } from './Components/view-floor/view-floor.component';

const routes: Routes = [
  { path: 'viewFloor', component: ViewFloorComponent },
  { path: '', component: ThreeDVisualizationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeDVisualizationRoutingModule { }
