import 'reflect-metadata';
import * as sinon from 'sinon';
import { Container } from 'typedi';
import BuildingService from '../../../src/services/BuildingService';

import IBuildingRepo from '../../../src/services/IRepos/IBuildingRepo';
import { expect } from 'chai';
import IBuildingService from '../../../src/services/IServices/IBuildingService';
import { Result } from '../../../src/core/logic/Result';
import { IBuildingDTO } from '../../../src/dto/IBuildingDTO';
import { Building } from '../../../src/domain/Building/Building';
import { BuildingMapper } from '../../../src/mappers/BuildingMap';
import { describe } from 'node:test';
import { floor } from 'lodash';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import { Floor } from '../../../src/domain/Floor/Floor';

describe('Building Service Test', function () {
    
        const sandbox = sinon.createSandbox();
    
        beforeEach(() => {
    
            Container.reset();
            //this.timeout(6000);
    
            const logger = {
                log: sinon.stub(),
                error: sinon.stub(),
                silly: sinon.stub()
            };
            Container.set('logger', logger);

            let buildingSchemaInstance = require("../../../src/persistence/schemas/buildingSchema").default;
            Container.set("buildingSchema", buildingSchemaInstance);

            let floorSchemaInstance = require("../../../src/persistence/schemas/floorSchema").default;
            Container.set("floorSchema", floorSchemaInstance);

            let buildingMapper = require("../../../src/mappers/BuildingMap").default;
            Container.set("BuildingMapper", buildingMapper);

            let buildingRepoClass = require("../../../src/repos/BuildingRepo").default;
            let buildingRepoInstance = Container.get(buildingRepoClass);
            Container.set("BuildingRepo", buildingRepoInstance);

            let floorRepoClass = require("../../../src/repos/FloorRepo").default;
            let floorRepoInstance = Container.get(floorRepoClass);
            Container.set("FloorRepo", floorRepoInstance);

            let buildingServiceClass = require("../../../src/services/BuildingService").default;
            let buildingServiceInstance = Container.get(buildingServiceClass);
            Container.set("BuildingService", buildingServiceInstance);

        });

        afterEach(() => {
            sandbox.restore();
        });

        it('getBuildingsByMaxAndMinFloors(): should return a list of buildings', async function () {
            const buildingDTO = {
                id: '1',
                code: "ED.1",
                description: "Edificio 1",
                max_width: 10,
                max_length: 10,
            };

            const mockFloorDTO = {
                DomainId: '1',
                building_id: '1',
                floorNumber: 1,
                description: 'description',
                area: 100,
                name: 'name',
                floorMap: []
            };
            
            const logger = {
                log: sinon.stub(),
                error: sinon.stub(),
                silly: sinon.stub()
            };
            Container.set('logger', logger);

            let buildingServiceInstance = Container.get<IBuildingService>("BuildingService");
            let buildingRepoInstance = Container.get<IBuildingRepo>("BuildingRepo");
            let floorRepoInstance = Container.get<IFloorRepo>("FloorRepo");

            sinon.stub(buildingRepoInstance, 'findAll').resolves([buildingDTO as unknown as Building]);
            sinon.stub(floorRepoInstance, 'findByBuildingId').resolves([mockFloorDTO as unknown as Floor]);
            sinon.stub(BuildingMapper, 'toDTO').returns(buildingDTO as unknown as IBuildingDTO);

            const actual = await buildingServiceInstance.getBuildingsByMaxAndMinFloors(0, 1);
            expect(actual.isFailure).to.be.false;
            expect(actual.getValue()).to.be.deep.equal([buildingDTO]);
        });

        it('getBuildingsByMaxAndMinFloors(): should return a failure', async function () {
            const logger = {
                log: sinon.stub(),
                error: sinon.stub(),
                silly: sinon.stub()
            };
    
            Container.set('logger', logger);

            let buildingServiceInstance = Container.get<IBuildingService>("BuildingService");
            let buildingRepoInstance = Container.get<IBuildingRepo>("BuildingRepo");
            let floorRepoInstance = Container.get<IFloorRepo>("FloorRepo");

            sinon.stub(buildingRepoInstance, 'findAll').resolves([]);

            const actual = await buildingServiceInstance.getBuildingsByMaxAndMinFloors(0, 1);
            expect(actual.isFailure).to.be.true;
            expect(actual.error).to.be.equal("No buildings found for this range");
        });

    });