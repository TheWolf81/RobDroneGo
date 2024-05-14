/*import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IBuildingService from "../src/services/IServices/IBuildingService";
import BuildingController from "../src/controllers/BuildingController";
import { IBuildingDTO } from '../src/dto/IBuildingDTO';
import {Building} from '../src/domain/Building';

describe('building controller', function () {
    const sandbox = sinon.createSandbox();
    beforeEach(function () {
        Container.reset();
        this.timeout(0); // Increase timeout to 5000ms

        let buildingSchemaInstance = require("../src/persistence/schemas/buildingSchema").default;
        Container.set("buildingSchema", buildingSchemaInstance);

        let floorSchemaInstance = require("../src/persistence/schemas/floorSchema").default;
        Container.set("floorSchema", floorSchemaInstance);

        let buildingRepoClass = require("../src/repos/BuildingRepo").default;
        let buildingRepoInstance = Container.get(buildingRepoClass);
        Container.set("BuildingRepo", buildingRepoInstance);

        let floorRepoClass = require("../src/repos/FloorRepo").default;
        let floorRepoInstance = Container.get(floorRepoClass);
        Container.set("FloorRepo", floorRepoInstance);
        const logger = {
            log: sinon.stub(),
            error: sinon.stub()
        };
        Container.set('logger', logger);

        let buildingServiceClass = require("../src/services/buildingService").default;
        let buildingServiceInstance = Container.get(buildingServiceClass);
        Container.set("BuildingService", buildingServiceInstance);
    }
    );
    afterEach(function () {
        sandbox.restore();
    });

    it('buildingController unit test using buildingService stub', async function () {

        const logger = {
            log: sinon.stub(),
        };

        Container.set('logger', logger);
        let body = { code: "teste1", description: "testeDesc1", max_length: 1, max_width: 1 };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };
        let buildingServiceInstance = Container.get<IBuildingService>("BuildingService");
        sinon.stub(buildingServiceInstance, "createBuilding").returns(Result.ok<IBuildingDTO>({ "domain_id": "123", "code": req.body.code, "description": req.body.description, "max_length": req.body.max_length, "max_width": req.body.max_width }));
        const ctrl = new BuildingController(buildingServiceInstance, console);
        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "domain_id": "123", "code": req.body.code, "description": req.body.description, "max_length": req.body.max_length, "max_width": req.body.max_width }));

    });

    it('buildingController + buildingService integration test using buildingRepoistory and Building stubs', async function () {
        let body = { code: "teste2", description: "testeDesc2", max_length: 2, max_width: 2 };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(Building, "create").returns(Result.ok({ "id": "123", "code": req.body.code, "description": req.body.description, "max_length": req.body.max_length, "max_width": req.body.max_width }));

        let buildingRepoInstance = Container.get("BuildingRepo");
        sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
            resolve(Building.create({ "code": req.body.code, "description": req.body.description, "max_length": req.body.max_length, "max_width": req.body.max_width }).getValue())
        }));

        let buildingServiceInstance = Container.get("BuildingService");

        const ctrl = new BuildingController(buildingServiceInstance as IBuildingService, console);

        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "code": req.body.code, "description": req.body.description, "max_length": req.body.max_length, "max_width": req.body.max_width }));

    });


    it('buildingController + buildingService integration test using spy on buildingService', async function () {
        let body = { code: "teste3", description: "testeDesc3", max_length: 3, max_width: 3 };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            //json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };


        let buildingRepoInstance = Container.get("BuildingRepo");
        sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
            resolve(Building.create({ "code": req.body.code, "description": req.body.description, "max_length": req.body.max_length, "max_width": req.body.max_width }).getValue())
        }));

        let buildingServiceInstance = Container.get("BuildingService");
        const buildingServiceSpy = sinon.spy(buildingServiceInstance, "createBuilding");

        const ctrl = new BuildingController(buildingServiceInstance as IBuildingService, console);

        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        //sinon.assert.calledOnce(res.json);
        //sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "code": req.body.code, "description": req.body.description, "max_length": req.body.max_length, "max_width": req.body.max_width }));
        sinon.assert.calledOnce(buildingServiceSpy);
        sinon.assert.calledWith(buildingServiceSpy, sinon.match({ "code": req.body.code, "description": req.body.description, "max_length": req.body.max_length, "max_width": req.body.max_width }));


    });
    
    it('buildingController unit test using buildingService mock', async function () {
        let body = { code: "teste4", description: "testeDesc4", max_length: 4, max_width: 4 };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };
        let buildingServiceInstance = Container.get("BuildingService");
        const buildingServiceMock= sinon.mock(buildingServiceInstance, "createBuilding");
        buildingServiceMock.expects("createBuilding")
        .once()
        .returns(Result.ok<IBuildingDTO>({ "domain_id": "123", "code": req.body.code, "description": req.body.description, "max_length": req.body.max_length, "max_width": req.body.max_width }));
        
        const ctrl = new BuildingController(buildingServiceInstance as IBuildingService, console);
        
        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);
        buildingServiceMock.verify();
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "domain_id": "123", "code": req.body.code, "description": req.body.description, "max_length": req.body.max_length, "max_width": req.body.max_width }));

    })
    
});*/
