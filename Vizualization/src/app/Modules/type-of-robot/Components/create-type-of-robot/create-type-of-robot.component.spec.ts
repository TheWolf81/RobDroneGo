import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTypeOfRobotComponent } from './create-type-of-robot.component';

describe('CreateTypeOfRobotComponent', () => {
  let component: CreateTypeOfRobotComponent;
  let fixture: ComponentFixture<CreateTypeOfRobotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTypeOfRobotComponent]
    });
    fixture = TestBed.createComponent(CreateTypeOfRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
