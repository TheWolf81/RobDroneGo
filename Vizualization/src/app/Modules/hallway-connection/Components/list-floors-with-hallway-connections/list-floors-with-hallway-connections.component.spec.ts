import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFloorsWithHallwayConnectionsComponent } from './list-floors-with-hallway-connections.component';

describe('ListFloorsWithHallwayConnectionsComponent', () => {
  let component: ListFloorsWithHallwayConnectionsComponent;
  let fixture: ComponentFixture<ListFloorsWithHallwayConnectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFloorsWithHallwayConnectionsComponent]
    });
    fixture = TestBed.createComponent(ListFloorsWithHallwayConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
