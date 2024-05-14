import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFloorMapComponent } from './upload-floor-map.component';

describe('UploadFloorMapComponent', () => {
  let component: UploadFloorMapComponent;
  let fixture: ComponentFixture<UploadFloorMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadFloorMapComponent]
    });
    fixture = TestBed.createComponent(UploadFloorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
