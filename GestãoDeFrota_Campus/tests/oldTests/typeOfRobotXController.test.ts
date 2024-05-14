/*import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../src/core/logic/Result';
import ITypeOfRobotService from "../../src/services/IServices/ITypeOfRobotService";
import TypeOfRobotController from "../../src/controllers/TypeOfRobotController";
import { ITypeOfRobotDTO } from '../../src/dto/ITypeOfRobotDTO';
import {TypeOfRobot} from '../src/domain/TypeOfRobot';


describe('typeOfRobot controller', function () {
    const sandbox = sinon.createSandbox();
    beforeEach(function(){
        Container.reset();
        this.timeout(5000000); // Increase timeout to 5000ms

        let typeOfRobotSchemaInstance = require("../src/persistence/schemas/typeOfRobotSchema").default;
        Container.set("typeOfRobotSchema", typeOfRobotSchemaInstance);

        let typeOfRobotRepoClass = require("../src/repos/TypeOfRobotRepo").default;
        let typeOfRobotRepoInstance = Container.get(typeOfRobotRepoClass);
        Container.set("TypeOfRobotRepo", typeOfRobotRepoInstance);

        const logger = {
            log: sinon.stub(),
            error: sinon.stub()
        };
        Container.set('logger', logger);

        let typeOfRobotServiceClass = require("../src/services/typeOfRobotService").default;
        let typeOfRobotServiceInstance = Container.get(typeOfRobotServiceClass);
        Container.set("TypeOfRobotService", typeOfRobotServiceInstance);
    });

    afterEach(function() {
        sandbox.restore();
        sinon.restore();
    });

    it('typeOfRobotController unit test using typeOfRobotService stub', async function () {
        const logger = {
            log: sinon.stub(),
        };
    
        Container.set('logger', logger);
    
        let body = { brand: "brand", model: "model", tasks: ["pickup&delivery"] };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = {};
        let typeOfRobotServiceInstance = Container.get("TypeOfRobotService");
        sinon.stub(typeOfRobotServiceInstance, "createTypeOfRobot").returns(Result.ok<ITypeOfRobotDTO>({ "domain_id": "1006", brand: req.body.brand, "model": req.body.model, "tasks": req.body.tasks }));
        const ctrl = new TypeOfRobotController(typeOfRobotServiceInstance as ITypeOfRobotService, console);
        await ctrl.createTypeOfRobot(req as Request, res as Response, next as NextFunction);
    
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 201);
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "domain_id": "1006", brand: req.body.brand, "model": req.body.model, "tasks": req.body.tasks }));
    });

    it('typeOfRobotController unit test using typeOfRobotService stub', async function () {
        const logger = {
            log: sinon.stub(),
        };
    
        Container.set('logger', logger);
    
        let body = { brand: "brand2", model: "model2", tasks: ["invalid task"] };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.spy()
        };
        let next: NextFunction = sinon.stub();
        let typeOfRobotServiceInstance = Container.get("TypeOfRobotService");
    
        sinon.stub(typeOfRobotServiceInstance, "createTypeOfRobot").returns(Result.fail<ITypeOfRobotDTO>("Error"));
    
        const ctrl = new TypeOfRobotController(typeOfRobotServiceInstance as ITypeOfRobotService, console);
    
        await ctrl.createTypeOfRobot(req as Request, res as Response, next);
    
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 402); 
        
        // when error, json is not called, enters catch block of the try catch present in typeOfRobotController class and returns next(e)
        sinon.assert.notCalled(res.json);
    });

    
});*/