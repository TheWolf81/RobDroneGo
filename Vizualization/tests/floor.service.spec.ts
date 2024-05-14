import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FloorService } from '../src/app/Modules/floor/floor.service';
import { HttpClientModule } from '@angular/common/http';
import { expect } from 'chai';

describe('FloorService', () => {

    let service: FloorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [FloorService]
        });
        service = TestBed.get(FloorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
