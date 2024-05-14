import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeDVisualizationRoutingModule } from './three-dvisualization-routing.module';
import { ThreeDVisualizationComponent } from './three-dvisualization.component';
import { ViewFloorComponent } from './Components/view-floor/view-floor.component';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    ThreeDVisualizationComponent,
    ViewFloorComponent
  ],
  imports: [
    CommonModule,
    ThreeDVisualizationRoutingModule
  ]
})
export class ThreeDVisualizationModule { }
