import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListElevatorByBuildingComponent } from './list-elevator-by-building.component';

describe('ListElevatorByBuildingComponent', () => {
  let component: ListElevatorByBuildingComponent;
  let fixture: ComponentFixture<ListElevatorByBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListElevatorByBuildingComponent]
    });
    fixture = TestBed.createComponent(ListElevatorByBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
