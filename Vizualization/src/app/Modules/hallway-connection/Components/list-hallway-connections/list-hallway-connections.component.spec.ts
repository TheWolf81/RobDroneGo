import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHallwayConnectionsComponent } from './list-hallway-connections.component';

describe('ListHallwayConnectionsComponent', () => {
  let component: ListHallwayConnectionsComponent;
  let fixture: ComponentFixture<ListHallwayConnectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHallwayConnectionsComponent]
    });
    fixture = TestBed.createComponent(ListHallwayConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
