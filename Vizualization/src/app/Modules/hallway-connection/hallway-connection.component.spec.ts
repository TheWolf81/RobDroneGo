import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallwayConnectionComponent } from './hallway-connection.component';

describe('HallwayConnectionComponent', () => {
  let component: HallwayConnectionComponent;
  let fixture: ComponentFixture<HallwayConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HallwayConnectionComponent]
    });
    fixture = TestBed.createComponent(HallwayConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
