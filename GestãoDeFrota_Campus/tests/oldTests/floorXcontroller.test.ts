/*import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../src/core/logic/Result';
import IFloorService from "../../src/services/IServices/IFloorService";
import FloorController from "../../src/controllers/FloorController";
import { IFloorDTO } from '../../src/dto/IFloorDTO';
import {Floor} from '../src/domain/Floor';
import IBuildingService from "../../src/services/IServices/IBuildingService";
import BuildingController from "../../src/controllers/BuildingController";
import { IBuildingDTO } from '../../src/dto/IBuildingDTO';
import {Building} from '../src/domain/Building';


describe('floor controller', function () {
    const sandbox = sinon.createSandbox();
    beforeEach(function(){
        Container.reset();
        this.timeout(5000000); // Increase timeout to 5000ms

        
        let floorSchemaInstance = require("../src/persistence/schemas/floorSchema").default;
        Container.set("floorSchema", floorSchemaInstance);

        let buildingSchemaInstance = require("../src/persistence/schemas/buildingSchema").default;
        Container.set("buildingSchema", buildingSchemaInstance);

        let floorRepoClass = require("../src/repos/FloorRepo").default;
        let floorRepoInstance = Container.get(floorRepoClass);
        Container.set("FloorRepo", floorRepoInstance);

        let buildingRepoClass = require("../src/repos/BuildingRepo").default;
        let buildingRepoInstance = Container.get(buildingRepoClass);
        Container.set("BuildingRepo", buildingRepoInstance);
        const logger = {
            log: sinon.stub(),
            error: sinon.stub()
        };
        Container.set('logger', logger);
        
        let floorServiceClass = require("../src/services/floorService").default;
        let floorServiceInstance = Container.get(floorServiceClass);
        Container.set("FloorService", floorServiceInstance);

    });
    afterEach(function() {
        sandbox.restore();
        sinon.restore();
    });

    it('floorController unit test using floorService stub', async function () {
        const logger = {
            log: sinon.stub(),
        };
        
        Container.set('logger', logger);

        // building
        let body = { code: "B", description: "Building B", max_length: 10, max_width: 10 };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };
        let buildingServiceInstance = Container.get("BuildingService");
        sinon.stub(buildingServiceInstance, "createBuilding").returns(Result.ok<IBuildingDTO>({ "domain_id": "1001", "code": req.body.code, "description": req.body.description, "max_length": req.body.max_length, "max_width": req.body.max_width }));
        const ctrl = new BuildingController(buildingServiceInstance as IBuildingService, console);
        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        // floor
        let body2 = { domain_id: "1001", building_id: "1001", floorNumber: 1, description: "Floor 1", area: 100, name: "Floor 1", floorMap: [] };
        let req2: Partial<Request> = {};
        req2.body = body2;
        let res2: Partial<Response> = {
            json: sinon.spy()
        };
        let next2: Partial<NextFunction> = () => { };
        let floorServiceInstance = Container.get("FloorService");
        sinon.stub(floorServiceInstance, "createFloor").returns(Result.ok<IFloorDTO>({ "building_id": req2.body.building_id, "floorNumber": req2.body.floorNumber, "description": req2.body.description, "area": req2.body.area, "name": req2.body.name, "floorMap": req2.body.floorMap }));
        const ctrl2 = new FloorController(floorServiceInstance as IFloorService, console);
        await ctrl2.createFloor(<Request>req2, <Response>res2, <NextFunction>next2);
        sinon.assert.calledOnce(res2.json);
        sinon.assert.calledWith(res2.json, sinon.match({"building_id": req2.body.building_id, "floorNumber": req2.body.floorNumber, "description": req2.body.description, "area": req2.body.area, "name": req2.body.name, "floorMap": req2.body.floorMap }));
    });

    it('floorController unit test using floorService stub', async function () {

        const logger = {
            log: sinon.stub(),
        };
        
        Container.set('logger', logger);

        // building
        let body = { code: "B", description: "Building B", max_length: 10, max_width: 10 };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };
        let buildingServiceInstance = Container.get("BuildingService");
        sinon.stub(buildingServiceInstance, "createBuilding").returns(Result.ok<IBuildingDTO>({ "domain_id": "1001", "code": req.body.code, "description": req.body.description, "max_length": req.body.max_length, "max_width": req.body.max_width }));
        const ctrl = new BuildingController(buildingServiceInstance as IBuildingService, console);
        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        // floor
        let body2 = { building_id: "1001", floorNumber: 1, description: "Floor 1", area: 100, name: "Floor 1", floorMap: [] };
        let req2: Partial<Request> = {};
        req2.body = body2;
        let res2: Partial<Response> = {
            json: sinon.spy()
        };
        let next2: Partial<NextFunction> = () => { };
        let floorServiceInstance = Container.get("FloorService");
        sinon.stub(floorServiceInstance, "createFloor").returns(Result.ok<IFloorDTO>({ "building_id": req2.body.building_id, "floorNumber": req2.body.floorNumber, "description": req2.body.description, "area": req2.body.area, "name": req2.body.name, "floorMap": req2.body.floorMap }));
        const ctrl2 = new FloorController(floorServiceInstance as IFloorService, console);
        const floor = await ctrl2.createFloor(<Request>req2, <Response>res2, <NextFunction>next2);

        // get floor by id
        let req3: Partial<Request> = {};
        req3.params = { id: "1001" };
        let res3: Partial<Response> = {
            json: sinon.spy()
        };
        let next3: Partial<NextFunction> = () => { };
        sinon.stub(floorServiceInstance, "getFloorByFloorId").returns(Result.ok<IFloorDTO[]>([{ "building_id": req2.body.building_id, "floorNumber": req2.body.floorNumber, "description": req2.body.description, "area": req2.body.area, "name": req2.body.name, "floorMap": req2.body.floorMap }]));

        await ctrl2.getFloorsByBuildingId(<Request>req2, <Response>res2, <NextFunction>next2);
        sinon.assert.calledOnce(res2.json);
        sinon.assert.calledWith(res2.json, sinon.match([{ "building_id": req2.body.building_id, "floorNumber": req2.body.floorNumber, "description": req2.body.description, "area": req2.body.area, "name": req2.body.name, "floorMap": req2.body.floorMap }]));

    });

})*/