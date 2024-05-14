/*import { expect } from 'chai';
import { Elevator } from '../src/domain/Elevator';

describe('Elevator creation test', () => {
    it('create a valid elevator: ', () => {
        let elevator = Elevator.create({
            building_id: '1',
            floors_servedId: ['1','2'],
            description: 'Elevator 1'
        });
        expect(elevator.isSuccess).to.equal(true);
    });
    it('create a elevator with no building_id: ', () => {
        let elevator = Elevator.create({
            building_id: '',
            floors_servedId: ['1','2'],
            description: 'Elevator 2'
        });
        expect(elevator.isFailure).to.equal(true);
    });
    it('create a elevator with no floors_servedId: ', () => {
        let elevator = Elevator.create({
            building_id: '1',
            floors_servedId: [],
            description: 'Elevator 3'
        });
        expect(elevator.isFailure).to.equal(true);
    });
    it('create a elevator with no description: ', () => {
        let elevator = Elevator.create({
            building_id: '1',
            floors_servedId: ['1','2'],
            description: ''
        });
        expect(elevator.isSuccess).to.equal(true);
    });
});*/