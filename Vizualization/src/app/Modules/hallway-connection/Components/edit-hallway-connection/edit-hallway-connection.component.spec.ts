import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHallwayConnectionComponent } from './edit-hallway-connection.component';

describe('EditHallwayConnectionComponent', () => {
  let component: EditHallwayConnectionComponent;
  let fixture: ComponentFixture<EditHallwayConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditHallwayConnectionComponent]
    });
    fixture = TestBed.createComponent(EditHallwayConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
