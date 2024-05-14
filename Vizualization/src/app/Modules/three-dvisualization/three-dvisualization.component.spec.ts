import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDVisualizationComponent } from './three-dvisualization.component';

describe('ThreeDVisualizationComponent', () => {
  let component: ThreeDVisualizationComponent;
  let fixture: ComponentFixture<ThreeDVisualizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreeDVisualizationComponent]
    });
    fixture = TestBed.createComponent(ThreeDVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
