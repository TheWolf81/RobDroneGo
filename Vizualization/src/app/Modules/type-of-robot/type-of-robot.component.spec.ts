import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfRobotComponent } from './type-of-robot.component';

describe('TypeOfRobotComponent', () => {
  let component: TypeOfRobotComponent;
  let fixture: ComponentFixture<TypeOfRobotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeOfRobotComponent]
    });
    fixture = TestBed.createComponent(TypeOfRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
