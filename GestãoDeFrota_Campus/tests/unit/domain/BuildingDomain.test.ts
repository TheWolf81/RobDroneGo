import {expect} from 'chai';
import {BuildingMapper} from '../../../src/mappers/BuildingMap';
import { describe } from 'node:test';

describe('Building creation test', () => {
    it('should create a valid building', () => {
        const buildingDTO = {
            code: '1',
            description: "description",
            max_length: 1,
            max_width: 1,
        };
        const building = BuildingMapper.toDomain(buildingDTO);
        expect(building).to.not.be.null;
    });

    it('should not create a building with invalid code', () => {
    const buildingDTO = {
        code: "BED323",
        description: "description",
        max_length: 1,
        max_width: 1,
    };
    const building = BuildingMapper.toDomain(buildingDTO);
    expect(building).to.be.null;
    });
    it('should not create a building with invalid code 2', () => {
        const buildingDTO = {
            code: "#",
            description: "description",
            max_length: 1,
            max_width: 1,
        };
        const building = BuildingMapper.toDomain(buildingDTO);
        expect(building).to.be.null;
    });
    it('should not create a building with invalid description', () => {
        const buildingDTO = {
            code: "1",
            description: 'a'.repeat(256),
            max_length: 1,
            max_width: 1,
        };
        const building = BuildingMapper.toDomain(buildingDTO);
        expect(building).to.be.null;
    });
    it('should not create a building with invalid max_length', () => {
        const buildingDTO = {
            code: "1",
            description: "description",
            max_length: -1,
            max_width: 1,
        };
        const building = BuildingMapper.toDomain(buildingDTO);
        expect(building).to.be.null;
    });
    it('should not create a building with invalid max_width', () => {
        const buildingDTO = {
            code: "1",
            description: "description",
            max_length: 1,
            max_width: -1,
        };
        const building = BuildingMapper.toDomain(buildingDTO);
        expect(building).to.be.null;
    });
    it('should not create a building with missing code', () => {
        const buildingDTO = {
            description: "description",
            max_length: 1,
            max_width: 1,
        };
        const building = BuildingMapper.toDomain(buildingDTO);
        expect(building).to.be.null;
    });
    it('should not create a building with missing description', () => {
        const buildingDTO = {
            code: "1",
            max_length: 1,
            max_width: 1,
        };
        const building = BuildingMapper.toDomain(buildingDTO);
        expect(building).to.be.null;
    });
    it('should not create a building with missing max_length', () => {
        const buildingDTO = {
            code: "1",
            description: "description",
            max_width: 1,
        };
        const building = BuildingMapper.toDomain(buildingDTO);
        expect(building).to.be.null;
    });
    it('should not create a building with missing max_width', () => {
        const buildingDTO = {
            code: "1",
            description: "description",
            max_length: 1,
        };
        const building = BuildingMapper.toDomain(buildingDTO);
        expect(building).to.be.null;
    });
});