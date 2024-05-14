import {expect} from 'chai';
import {ElevatorMapper} from '../../../src/mappers/ElevatorMap';
import { describe } from 'node:test';

describe('Elevator creation test', () => {
    it('should create a valid elevator', () => {
        const elevatorDTO = {
            building_id: '1',
            floors_servedId: ["1"],
            description: "description"
        };
        const elevator = ElevatorMapper.toDomain(elevatorDTO);
        expect(elevator).to.not.be.null;
    });
    it('should create a valid elevator 2', () => {
        const elevatorDTO = {
            building_id: '1',
            floors_servedId: ["1","2"],
            description: "description"
        };
        const elevator = ElevatorMapper.toDomain(elevatorDTO);
        expect(elevator).to.not.be.null;
    });
    it('should not create a elevator with no building_id', () => {
        const elevatorDTO = {
            floors_servedId: ["1"],
            description: "description"
        };
        const elevator = ElevatorMapper.toDomain(elevatorDTO);
        expect(elevator).to.be.null;
    });
    it('should not create a elevator with no floors_servedId', () => {
        const elevatorDTO = {
            building_id: "1",
            description: "description"
        };
        const elevator = ElevatorMapper.toDomain(elevatorDTO);
        expect(elevator).to.be.null;
    });
});