/*import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Result } from '../../src/core/logic/Result';
import { Container } from 'typedi';
import { Floor } from '../../../src/domain/Floor';
import { Building } from '../../../src/domain/Building';
import FloorService from '../../src/services/floorService';
import BuildingService from '../../src/services/buildingService';
import IFloorService from "../../src/services/IServices/IFloorService";
import IBuildingService from "../../src/services/IServices/IBuildingService";
import IFloorRepo from '../../src/services/IRepos/IFloorRepo';
import IBuildingRepo from '../../src/services/IRepos/IBuildingRepo';
import { IFloorDTO } from '../../src/dto/IFloorDTO';
import FloorRepo from '../../src/repos/FloorRepo';
import mongoose from 'mongoose';
import config from '../../config';
import assert from 'assert';
import { IBuildingDTO } from '../../src/dto/IBuildingDTO';

describe('Floor Service Test', function () {

    const sandbox = sinon.createSandbox();
    this.timeout(100000);
    let floorService: FloorService;
    let buildingService: BuildingService;
  

    beforeEach(() => {
        sandbox.restore();
        Container.reset();
        floorService = Container.get<FloorService>("FloorService");
        buildingService = Container.get<BuildingService>("BuildingService");
    });

    afterEach(function () {
        sandbox.restore();
    });

    it ("FloorServiceTest : createFloor() ", async function () {

        const body = { "building_id": "123", "floorNumber": 123, "description": '123', "area": 123, "name": "floor", "floorMap": [] };
    
        const floorDTO: IFloorDTO = {
            building_id: body.building_id,
            floorNumber: Number(body.floorNumber),
            description: body.description,
            area: Number(body.area),
            name: body.name,
            floorMap: body.floorMap
        };
    
        sinon.stub(floorService, "createFloor").resolves(Result.ok<IFloorDTO>(floorDTO));
    
        const result = await floorService.createFloor(floorDTO);
    
        assert.equal(result.isSuccess, true);
    });

    it ("FloorServiceTest : getFloorsByBuildingId() ", async function () {

        const body = { "building_id": "123", "floorNumber": 123, "description": '123', "area": 123, "name": "floor", "floorMap": [] };
    
        const floorDTO: IFloorDTO = {
            building_id: body.building_id,
            floorNumber: Number(body.floorNumber),
            description: body.description,
            area: Number(body.area),
            name: body.name,
            floorMap: body.floorMap
        };
    
        const floor = await floorService.createFloor(floorDTO);

        sinon.stub(floorService, "getFloorsByBuildingId").resolves(Result.ok<IFloorDTO[]>([floorDTO]));

        const result = await floorService.getFloorsByBuildingId(floorDTO.building_id);

        assert.equal(result.isSuccess, true);

    });
});
*/