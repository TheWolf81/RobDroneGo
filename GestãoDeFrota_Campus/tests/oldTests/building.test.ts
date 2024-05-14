/*import { expect } from 'chai';
import { Building } from '../src/domain/Building';

describe('Building creation test', () => {
    it('create a valid building: ', () => {
        let building = Building.create({
            code: 'B',
            description: 'Building 1',
            max_length: 1,
            max_width: 1
        });
        expect(building.isSuccess).to.equal(true);
    });
    it('create a building with spaces and numbers in the code: ', () => {
        let building = Building.create({
            code: 'B2 C',
            description: 'Building 2',
            max_length: 1,
            max_width: 1
        });
        expect(building.isSuccess).to.equal(true);
    });
    it('create a building with code length > 5: ', () => {
        let building = Building.create({
            code: '123456',
            description: 'Building 3',
            max_length: 1,
            max_width: 1
        });
        expect(building.isFailure).to.equal(true);
    });
    it('create a building with no description: ', () => {
        let building = Building.create({
            code: 'B3',
            description: '',
            max_length: 1,
            max_width: 1
        });
        expect(building.isSuccess).to.equal(true);
    });
    it('create a building with negative max_length: ', () => {
        let building = Building.create({
            code: 'B4',
            description: 'Building 4',
            max_length: -1,
            max_width: 1
        });
        expect(building.isFailure).to.equal(true);
    });
    it('create a building with negative max_width: ', () => {
        let building = Building.create({
            code: 'B5',
            description: 'Building 5',
            max_length: 1,
            max_width: -1
        });
        expect(building.isFailure).to.equal(true);
    });
    it('create a building with negative max_length and max_width: ', () => {
        let building = Building.create({
            code: 'B6',
            description: 'Building 6',
            max_length: -1,
            max_width: -1
        });
        expect(building.isFailure).to.equal(true);
    });
    it('create a building with max_length = 0: ', () => {
        let building = Building.create({
            code: 'B7',
            description: 'Building 7',
            max_length: 0,
            max_width: 1
        });
        expect(building.isFailure).to.equal(true);
    });
    it('create a building with max_width = 0: ', () => {
        let building = Building.create({
            code: 'B8',
            description: 'Building 8',
            max_length: 1,
            max_width: 0
        });
        expect(building.isFailure).to.equal(true);
    });
    it('create a building with max_length = 0 and max_width = 0: ', () => {
        let building = Building.create({
            code: 'B9',
            description: 'Building 9',
            max_length: 0,
            max_width: 0
        });
        expect(building.isFailure).to.equal(true);
    });
    });*/