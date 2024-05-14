import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhibitRobotComponent } from './inhibit-robot.component';

describe('InhibitRobotComponent', () => {
  let component: InhibitRobotComponent;
  let fixture: ComponentFixture<InhibitRobotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InhibitRobotComponent]
    });
    fixture = TestBed.createComponent(InhibitRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
