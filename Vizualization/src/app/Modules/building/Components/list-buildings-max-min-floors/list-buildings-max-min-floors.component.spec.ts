import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildingsMaxMinFloorsComponent } from './list-buildings-max-min-floors.component';

describe('ListBuildingsMaxMinFloorsComponent', () => {
  let component: ListBuildingsMaxMinFloorsComponent;
  let fixture: ComponentFixture<ListBuildingsMaxMinFloorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBuildingsMaxMinFloorsComponent]
    });
    fixture = TestBed.createComponent(ListBuildingsMaxMinFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
