import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFloorByBuildingComponent } from './list-floor-by-building.component';

describe('ListFloorByBuildingComponent', () => {
  let component: ListFloorByBuildingComponent;
  let fixture: ComponentFixture<ListFloorByBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFloorByBuildingComponent]
    });
    fixture = TestBed.createComponent(ListFloorByBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
