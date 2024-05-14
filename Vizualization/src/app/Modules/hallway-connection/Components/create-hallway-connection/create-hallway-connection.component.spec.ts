import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHallwayConnectionComponent } from './create-hallway-connection.component';

describe('CreateHallwayConnectionComponent', () => {
  let component: CreateHallwayConnectionComponent;
  let fixture: ComponentFixture<CreateHallwayConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHallwayConnectionComponent]
    });
    fixture = TestBed.createComponent(CreateHallwayConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
