import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import FloorController from '../../../src/controllers/floorController'
import IFloorService from '../../../src/services/IServices/IFloorService';
import { IFloorDTO } from '../../../src/dto/IFloorDTO';
import { assert } from 'console';
import { expect } from 'chai';
import { mock, instance, when } from 'ts-mockito';

describe('FloorController', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
        Container.reset();
        this.timeout(5000);

        // Re-register the necessary services here
        const logger = {
            log: sinon.stub(),
            error: sinon.stub()
        };
        Container.set('logger', logger);


        let floorSchemaInstance = require("../../../src/persistence/schemas/floorSchema").default;
        Container.set("floorSchema", floorSchemaInstance);

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

    });

    afterEach(function () {
        sandbox.restore();
    });

        it('createFloor(): should return a floor on success (using mockito)', async () => {
            const body = { building_id: '1', floorNumber: 1, description: 'description', area: 100, name: 'name', floorMap: [] };
            const req: Partial<Request> = { body };
            const res: Partial<Response> = {};
            const next: Partial<NextFunction> = () => {};

            const floorService = mock<IFloorService>();
            when(floorService.createFloor(body)).thenResolve(Result.ok<IFloorDTO>({
                building_id: '1',
                floorNumber: 1,
                description: 'description',
                area: 100,
                name: 'name',
                floorMap: [],
            }));

            const floorController = new FloorController(instance(floorService), console);
            const actualResult = await floorController.createFloor(req as Request, res as Response, next as NextFunction) as Result<IFloorDTO>;

            expect(actualResult.isSuccess).to.be.true;
            expect(actualResult.getValue()).to.deep.equal({
                building_id: '1',
                floorNumber: 1,
                description: 'description',
                area: 100,
                name: 'name',
                floorMap: [],
            });
        });

    it('createFloor(): should return a failure on error', async () => {
        const logger = {
            log: sinon.stub(),
        };

        Container.set('logger', logger);

        let body = { building_id: "1", floorNumber: 1, description: "description", area: -100, name: "name", floorMap: []};
        let req: Partial<Request> = {};

        req.body = body;
        let res: Partial<Response> = { };
        let next: Partial<NextFunction> = () => { };

        let floorServiceInstance = Container.get<IFloorService>("FloorService");
        sinon.stub(floorServiceInstance, "createFloor").resolves(Result.fail<IFloorDTO>({}));


        const ctrl = new FloorController(floorServiceInstance, console);
        const actualResult = await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next) as Result<IFloorDTO>;

        expect(actualResult.isFailure).to.be.true;
        expect(actualResult.errorValue()).to.be.deep.equal({});
    });

    it('updateFloor(): should return a floor on success', async () => {
        const logger = {
            log: sinon.stub(),
        };

        Container.set('logger', logger);

        let body = {  description: "description", name: "name" };
        let params = { domainId: "1" };
        let req: Partial<Request> = {};

        req.body = body;
        req.params = params;
        let res: Partial<Response> = { };
        let next: Partial<NextFunction> = () => { };

        let floorServiceInstance = Container.get<IFloorService>("FloorService");
        sinon.stub(floorServiceInstance, "updateFloor").resolves(Result.ok<IFloorDTO>({"building_id": "1", "floorNumber": 1, "description": "description", "area": 100, "name": "name", "floorMap": []}));

        const ctrl = new FloorController(floorServiceInstance, console);
        const actualResult = await ctrl.updateFloor(<Request>req, <Response>res, <NextFunction>next) as Result<IFloorDTO>;

        expect(actualResult.isFailure).to.be.false;
        expect(actualResult.getValue()).to.be.deep.equal({"building_id": "1", "floorNumber": 1, "description": "description", "area": 100, "name": "name", "floorMap": []});

    });

    it('updateFloor(): should return a failure on error', async () => {
        const logger = {
            log: sinon.stub(),
        };

        Container.set('logger', logger);

        let body = {  description: "description", name: "" };
        let params = { domainId: "1" };
        let req: Partial<Request> = {};

        req.body = body;
        req.params = params;
        let res: Partial<Response> = { };
        let next: Partial<NextFunction> = () => { };

        let floorServiceInstance = Container.get<IFloorService>("FloorService");
        sinon.stub(floorServiceInstance, "updateFloor").resolves(Result.fail<IFloorDTO>({}));

        const ctrl = new FloorController(floorServiceInstance, console);
        const actualResult = await ctrl.updateFloor(<Request>req, <Response>res, <NextFunction>next) as Result<IFloorDTO>;

        expect(actualResult.isFailure).to.be.true;
        expect(actualResult.errorValue()).to.be.deep.equal({});

    });

    it('getFloorsByBuildingId(): should return a list of floors on success', async () => {

        const logger = {
            log: sinon.stub(),
        };

        Container.set('logger', logger);

        let params = { building_id: "1" };
        let req: Partial<Request> = {};

        req.params = params;
        let res: Partial<Response> = { };
        let next: Partial<NextFunction> = () => { };

        let floorServiceInstance = Container.get<IFloorService>("FloorService");
        sinon.stub(floorServiceInstance, "getFloorsByBuildingId").resolves(Result.ok<IFloorDTO[]>([{"building_id": "1", "floorNumber": 1, "description": "description", "area": 100, "name": "name", "floorMap": []}]));

        const ctrl = new FloorController(floorServiceInstance, console);
        const actualResult = await ctrl.getFloorsByBuildingId(<Request>req, <Response>res, <NextFunction>next) as Result<IFloorDTO[]>;

        expect(actualResult.isFailure).to.be.false;
        expect(actualResult.getValue()).to.be.deep.equal([{"building_id": "1", "floorNumber": 1, "description": "description", "area": 100, "name": "name", "floorMap": []}]);

    });

    it('getFloorsByBuildingId(): should return a failure on error', async () => {
            
            const logger = {
                log: sinon.stub(),
            };
    
            Container.set('logger', logger);
    
            let params = { building_id: "2" };
            let req: Partial<Request> = {};
    
            req.params = params;
            let res: Partial<Response> = { };
            let next: Partial<NextFunction> = () => { };
    
            let floorServiceInstance = Container.get<IFloorService>("FloorService");
            sinon.stub(floorServiceInstance, "getFloorsByBuildingId").resolves(Result.fail<IFloorDTO[]>([]));
    
            const ctrl = new FloorController(floorServiceInstance, console);
            const actualResult = await ctrl.getFloorsByBuildingId(<Request>req, <Response>res, <NextFunction>next) as Result<IFloorDTO[]>;
    
            expect(actualResult.isFailure).to.be.true;
            expect(actualResult.errorValue()).to.be.deep.equal([]);
    
        });

        it('getFloorsByBuildingId(): should return a list of floors on success', async () => {

            const logger = {
                log: sinon.stub(),
            };
    
            Container.set('logger', logger);
    
            let params = { building_id: "1" };
            let req: Partial<Request> = {};
    
            req.params = params;
            let res: Partial<Response> = { };
            let next: Partial<NextFunction> = () => { };

            let floorServiceInstance = Container.get<IFloorService>("FloorService");
            sinon.stub(floorServiceInstance, "getFloorsByBuildingId").resolves(Result.ok<IFloorDTO[]>([{"building_id": "1", "floorNumber": 1, "description": "description", "area": 100, "name": "name", "floorMap": []}]));

            const ctrl = new FloorController(floorServiceInstance, console);
            const actualResult = await ctrl.getFloorsByBuildingId(<Request>req, <Response>res, <NextFunction>next) as Result<IFloorDTO[]>;

            expect(actualResult.isFailure).to.be.false;
            expect(actualResult.getValue()).to.be.deep.equal([{"building_id": "1", "floorNumber": 1, "description": "description", "area": 100, "name": "name", "floorMap": []}]);

        });

        it('getFloorsByBuildingId(): should return a failure on error', async () => {
            
            const logger = {
                log: sinon.stub(),
            };
    
            Container.set('logger', logger);
    
            let params = { building_id: "2" };
            let req: Partial<Request> = {};
    
            req.params = params;
            let res: Partial<Response> = { };
            let next: Partial<NextFunction> = () => { };
    
            let floorServiceInstance = Container.get<IFloorService>("FloorService");
            sinon.stub(floorServiceInstance, "getFloorsByBuildingId").resolves(Result.fail<IFloorDTO[]>([]));
    
            const ctrl = new FloorController(floorServiceInstance, console);
            const actualResult = await ctrl.getFloorsByBuildingId(<Request>req, <Response>res, <NextFunction>next) as Result<IFloorDTO[]>;
    
            expect(actualResult.isFailure).to.be.true;
            expect(actualResult.errorValue()).to.be.deep.equal([]);
    
        });

});
