import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildingsComponent } from './list-buildings.component';

describe('ListBuildingsComponent', () => {
  let component: ListBuildingsComponent;
  let fixture: ComponentFixture<ListBuildingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBuildingsComponent]
    });
    fixture = TestBed.createComponent(ListBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
