import {expect} from 'chai';
import {FloorMapper} from '../../../src/mappers/FloorMap';


describe('Floor creation test', () => {
    it('should create a valid floor', () => {
        const floorDTO = {
            building_id: '1',
            floorNumber: 1,
            description: 'Floor 1',
            area: 1,
            name: 'Floor 1',
            floorMap: [[]],
        };

        const floor = FloorMapper.toDomain(floorDTO);
        expect(floor).not.to.be.null;
    });

    it('should not create a floor with invalid floor number', () => {
        const floorDTO = {
            building_id: '2',
            floorNumber: -1,
            description: 'Floor 1',
            area: 1,
            name: 'Floor 1',
            floorMap: [[]],
        };

        const floor = FloorMapper.toDomain(floorDTO);
        expect(floor).to.be.null;
    });

    it('should not create a floor with invalid area', () => {
        const floorDTO = {
            building_id: '2',
            floorNumber: 1,
            description: 'Floor 1',
            area: -1,
            name: 'Floor 1',
            floorMap: [[]],
        };

        const floor = FloorMapper.toDomain(floorDTO);
        expect(floor).to.be.null;
    });

    it('should not create a floor with missing building id', () => {
        const floorDTO = {
            floorNumber: 1,
            description: 'Floor 1',
            area: 1,
            name: 'Floor 1',
            floorMap: [[]],
        };

        const floor = FloorMapper.toDomain(floorDTO);
        expect(floor).to.be.null;
    });

    it('should not create a floor with missing floor number', () => {
        const floorDTO = {
            building_id: '2',
            description: 'Floor 1',
            area: 1,
            name: 'Floor 1',
            floorMap: [[]],
        };

        const floor = FloorMapper.toDomain(floorDTO);
        expect(floor).to.be.null;
    });

    it('should not create a floor with missing description', () => {
        const floorDTO = {
            building_id: '2',
            floorNumber: 1,
            area: 1,
            name: 'Floor 1',
            floorMap: [[]],
        };

        const floor = FloorMapper.toDomain(floorDTO);
        expect(floor).to.be.null;
    });

    it('should not create a floor with missing area', () => {
        const floorDTO = {
            building_id: '2',
            floorNumber: 1,
            description: 'Floor 1',
            name: 'Floor 1',
            floorMap: [[]],
        };

        const floor = FloorMapper.toDomain(floorDTO);
        expect(floor).to.be.null;
    });

    it('should not create a floor with missing name', () => {
        const floorDTO = {
            building_id: '2',
            floorNumber: 1,
            description: 'Floor 1',
            area: 1,
            floorMap: [[]],
        };

        const floor = FloorMapper.toDomain(floorDTO);
        expect(floor).to.be.null;
    });

    it('should not create a floor with invalid building id', () => {
        const floorDTO = {
            building_id: '   ',
            floorNumber: 1,
            description: 'Floor 1',
            area: 1,
            name: 'Floor 1',
            floorMap: [[]],
        };

        const floor = FloorMapper.toDomain(floorDTO);
        expect(floor).to.be.null;
    });

    it('should not create a floor description over 255 chars', () => {
        const floorDTO = {
            building_id: '2',
            floorNumber: 1,
            description: 'a'.repeat(256),
            area: 1,
            name: 'Floor 1',
            floorMap: [[]],
        };

        const floor = FloorMapper.toDomain(floorDTO);
        expect(floor).to.be.null;
    });

    it('should not create a floor name over 255 chars', () => {
        const floorDTO = {
            building_id: '2',
            floorNumber: 1,
            description: 'Floor 1',
            area: 1,
            name: 'a'.repeat(256),
            floorMap: [[]],
        };

        const floor = FloorMapper.toDomain(floorDTO);
        expect(floor).to.be.null;
    });
});

