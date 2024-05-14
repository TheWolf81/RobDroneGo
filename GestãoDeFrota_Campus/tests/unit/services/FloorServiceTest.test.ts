import 'reflect-metadata';
import * as sinon from 'sinon';
import { Container } from 'typedi';
import FloorService from '../../../src/services/FloorService';

import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import { expect } from 'chai';
import IBuildingRepo from '../../../src/services/IRepos/IBuildingRepo';
import IRoomRepo from '../../../src/services/IRepos/IRoomRepo';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import IFloorService from '../../../src/services/IServices/IFloorService';
import FloorController from '../../../src/controllers/floorController';
import { Result } from '../../../src/core/logic/Result';
import { IFloorDTO } from '../../../src/dto/IFloorDTO';
import { Floor } from '../../../src/domain/Floor/Floor';
import { FloorMapper } from '../../../src/mappers/FloorMap';



describe('Floor Service Test', function () {

    let floorService: FloorService;
    let buildingRepo: IBuildingRepo;
    let floorRepo: IFloorRepo;  

    const sandbox = sinon.createSandbox();

    beforeEach(() => {

        Container.reset();
        this.timeout(6000);

        const logger = {
            log: sinon.stub(),
            error: sinon.stub(),
            silly: sinon.stub()
        };
        Container.set('logger', logger);


        let floorSchemaInstance = require("../../../src/persistence/schemas/floorSchema").default;
        Container.set("floorSchema", floorSchemaInstance);

        let floorMapper = require("../../../src/mappers/FloorMap").default;
        Container.set("FloorMapper", floorMapper);

        let floorRepoClass = require("../../../src/repos/FloorRepo").default;
        let floorRepoInstance = Container.get(floorRepoClass);
        Container.set("FloorRepo", floorRepoInstance);

        let buildingSchemaInstance = require("../../../src/persistence/schemas/buildingSchema").default;
        Container.set("buildingSchema", buildingSchemaInstance);

        let buildingRepoClass = require("../../../src/repos/BuildingRepo").default;
        let buildingRepoInstance = Container.get(buildingRepoClass);
        Container.set("BuildingRepo", buildingRepoInstance);

        let floorServiceClass = require("../../../src/services/FloorService").default;
        let floorServiceInstance = Container.get(floorServiceClass);
        Container.set("FloorService", floorServiceInstance);

        let roomSchemaInstance = require("../../../src/persistence/schemas/roomSchema").default;
        Container.set("roomSchema", roomSchemaInstance);

        let roomMapper = require("../../../src/mappers/RoomMap").default;
        Container.set("RoomMapper", roomMapper);

        let roomRepoClass = require("../../../src/repos/RoomRepo").default;
        let roomRepoInstance = Container.get(roomRepoClass);
        Container.set("RoomRepo", roomRepoInstance);
    });

    afterEach(() => {
        sandbox.restore();
    });


    it('createFloor(): should return a floor on success (using mockito)', async () => {
        let logger1 = mock<any>();
        buildingRepo = mock<IBuildingRepo>();
        floorRepo = mock<IFloorRepo>();
        let roomRepo = mock<IRoomRepo>();

        floorService = new FloorService(instance(logger1), instance(floorRepo), instance(buildingRepo), instance(roomRepo));

        const mockFloorDTO = {
            DomainId: '1',
            building_id: '1',
            floorNumber: 1,
            description: 'description',
            area: 100,
            name: 'name',
            floorMap: []
        };

        when(buildingRepo.exists(anything())).thenResolve(true);
        when(floorRepo.existsInBuilding(anything(), anything())).thenResolve(false);

        // Act
        const result = await floorService.createFloor(mockFloorDTO);
        mockFloorDTO.DomainId = (result as any).getValue().DomainId;

        // Assert
        expect(result.isSuccess).to.be.true;
        expect(result.getValue()).to.deep.equal(mockFloorDTO);

        // Ensure the repository methods were called with the expected arguments
        verify(buildingRepo.exists('1')).once();
        verify(floorRepo.existsInBuilding('1', 1)).once();


    });

    it('createFloor(): should return a floor on success (using stubs)', async function () {

        const logger = {
            log: sinon.stub(),
            error: sinon.stub(),
            silly: sinon.stub()
        };

        Container.set('logger', logger);

        let floorServiceInstance = Container.get<IFloorService>("FloorService");
        let floorRepoInstance = Container.get<IFloorRepo>("FloorRepo");
        let buildingRepoInstance = Container.get<IBuildingRepo>("BuildingRepo");

        sinon.stub(buildingRepoInstance, "exists").resolves(true);
        sinon.stub(floorRepoInstance, "existsInBuilding").resolves(false);
        sinon.stub(floorRepoInstance, "save").resolves({} as Floor);

        const mockFloorDTO = {
            DomainId: '1',
            building_id: '1',
            floorNumber: 1,
            description: 'description',
            area: 100,
            name: 'name',
            floorMap: []
        };

        const actual = await floorServiceInstance.createFloor(mockFloorDTO);
        mockFloorDTO.DomainId = (actual as any).getValue().DomainId;
        expect(actual.isSuccess).to.be.true;
        expect(actual.getValue()).to.deep.equal(mockFloorDTO);

    });

    it('updateFloor(): should return a floor on success (using stubs)', async () => {
        const logger = {
            log: sinon.stub(),
            error: sinon.stub(),
            silly: sinon.stub()
        };

        Container.set('logger', logger);

        let floorServiceInstance = Container.get<IFloorService>("FloorService");
        let floorRepoInstance = Container.get<IFloorRepo>("FloorRepo");
        const mockFloorDTO = {
            DomainId: '1',
            building_id: '1',
            floorNumber: 1,
            description: 'description',
            area: 100,
            name: 'name',
            floorMap: []
        };
        
        sinon.stub(floorRepoInstance, "findByDomainId").resolves(mockFloorDTO as unknown as Floor);       
        sinon.stub(floorRepoInstance, "save").resolves(mockFloorDTO as unknown as Floor);
        sinon.stub(floorRepoInstance, "update").resolves(mockFloorDTO as unknown as Floor);
        sinon.stub(FloorMapper, "toDomain").returns(mockFloorDTO as unknown as Floor);
        sinon.stub(FloorMapper, "toDTO").returns(mockFloorDTO as unknown as IFloorDTO);

        const actual = await floorServiceInstance.updateFloor("1", mockFloorDTO);
        expect(actual.isSuccess).to.be.true;
        expect(actual.getValue()).to.deep.equal(mockFloorDTO);
        
    });

    it('getFloorsByBuildingId(): should return a floor on success (using stubs)', async () => {
        const logger = {
            log: sinon.stub(),
            error: sinon.stub(),
            silly: sinon.stub()
        };

        Container.set('logger', logger);

        let floorServiceInstance = Container.get<IFloorService>("FloorService");
        let floorRepoInstance = Container.get<IFloorRepo>("FloorRepo");
        const mockFloorDTO = {
            DomainId: '1',
            building_id: '1',
            floorNumber: 1,
            description: 'description',
            area: 100,
            name: 'name',
            floorMap: []
        };
        
        sinon.stub(floorRepoInstance, "findByBuildingId").resolves([mockFloorDTO as unknown as Floor]);       
        sinon.stub(FloorMapper, "toDTO").returns(mockFloorDTO as unknown as IFloorDTO);

        const actual = await floorServiceInstance.getFloorsByBuildingId("1");
        expect(actual.isSuccess).to.be.true;
        expect(actual.getValue()).to.deep.equal([mockFloorDTO]);
        
    });

    it('getFloorsByBuildingId(): should return failure (using stubs)', async () => {
        const logger = {
            log: sinon.stub(),
            error: sinon.stub(),
            silly: sinon.stub()
        };

        Container.set('logger', logger);

        let floorServiceInstance = Container.get<IFloorService>("FloorService");
        let floorRepoInstance = Container.get<IFloorRepo>("FloorRepo");
        
        sinon.stub(floorRepoInstance, "findByBuildingId").resolves([]);       

        const actual = await floorServiceInstance.getFloorsByBuildingId("1");
        expect(actual.isSuccess).to.be.false;
        expect(actual.errorValue()).to.equal("No floors found for this building");
        
    });

});
