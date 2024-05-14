/*import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import HallwayConnectionController from "../src/controllers/HallwayConnectionController";
import { IHallwayConnectionDTO } from '../src/dto/IHallwayConnectionDTO';
import IHallwayConnectionService from '../src/services/IServices/IHallwayConnectionService';

describe('hallway Connection controller', function () {
    
    const sandbox = sinon.createSandbox();
    beforeEach(function () {
        
        Container.reset();
        this.timeout(5000); // Increase timeout to 5000ms

        let hallwayConnectionSchemaInstance = require("../src/persistence/schemas/HallwayConnectionSchema").default;
        Container.set("hallwayConnectionSchema", hallwayConnectionSchemaInstance);

        let hallwayConnectionRepoClass = require("../src/repos/HallwayConnectionRepo").default;
        let hallwayConnectionRepoInstance = Container.get(hallwayConnectionRepoClass);
        Container.set("HallwayConnectionRepo", hallwayConnectionRepoInstance);
        
        let floorRepoClass = require("../src/repos/FloorRepo").default;
        let floorRepoInstance = Container.get(floorRepoClass);
        Container.set("FloorRepo", floorRepoInstance);

        const logger = {
            log: sinon.stub(),
            error: sinon.stub()

        };
        Container.set('logger', logger);

        let HallwayConnectionServiceClass = require("../src/services/HallwayConnectionService").default;
        let HallwayConnectionServicenstance = Container.get(HallwayConnectionServiceClass);
        Container.set("HallwayConnectionService", HallwayConnectionServicenstance);
    }
    );
    afterEach(function () {
        sandbox.restore();
    });

    it('HallwayConnectionController unit test using HallwayConnectionService stub', async function () {

        const logger = {
            log: sinon.stub(),
        };

        Container.set('logger', logger);
        let body = { FloorId2: "ddad6b74-5209-401d-8e07-82036d08c640", FloorId1: "5076b670-5777-444c-b967-eedd8601a20d"};
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };
        let HallwayConnectionServiceInstance = Container.get("HallwayConnectionService");
        sinon.stub(HallwayConnectionServiceInstance, "createHallwayConnectionTest").returns(Result.ok<IHallwayConnectionDTO>({ "DomainId": "123","BuildingId1": "eb5e9555-189c-41e4-b9fb-5b6e2ee2cd8c", "BuildingId2": "efe9de69-849b-4693-bddc-c874f9ac0528",  "FloorId1": req.body.FloorId1, "FloorId2": req.body.FloorId2 }));
        const ctrl = new HallwayConnectionController(HallwayConnectionServiceInstance as IHallwayConnectionService, console);
        await ctrl.createHallwayConnectionTeste(<Request>req, <Response>res, <NextFunction>next);
        sinon.assert.calledOnce(res.json);~
        sinon.assert.calledWith(res.json, sinon.match({ "DomainId": "123","BuildingId1": "eb5e9555-189c-41e4-b9fb-5b6e2ee2cd8c", "BuildingId2": "efe9de69-849b-4693-bddc-c874f9ac0528",  "FloorId1": req.body.FloorId1, "FloorId2": req.body.FloorId2 }));

    });

})*/
