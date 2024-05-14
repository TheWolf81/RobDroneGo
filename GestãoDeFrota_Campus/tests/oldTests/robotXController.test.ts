/*import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import RobotController from '../src/controllers/robotController';
import { IRobotService } from '../../../src/services/IServices/IRobotService';
import { Result } from '../../src/core/logic/Result';
import { IRobotDTO } from '../src/interfaces/IRobotDTO';
import Robot from '../src/domain/robot';



describe('robot controller', function () {
    const sandbox = sinon.createSandbox();
    beforeEach(function () {
        Container.reset();
        this.timeout(5000); // Increase timeout to 5000ms

        let robotSchemaInstance = require("../src/persistence/schemas/robotSchema").default;
        Container.set("robotSchema", robotSchemaInstance);
        let typeOfRobotSchemaInstance =require("../src/persistence/schemas/typeOfRobotSchema").default;
        Container.set("typeOfRobotSchema", typeOfRobotSchemaInstance);

        let robotRepoClass = require("../src/repos/RobotRepo").default;
        let robotRepoInstance = Container.get(robotRepoClass);
        Container.set("RobotRepo", robotRepoInstance);

        let typeOfRobotRepoClass = require("../src/repos/TypeOfRobotRepo").default;
        let typeOfRobotRepoInstance = Container.get(typeOfRobotRepoClass);
        Container.set("TypeOfRobotRepo", typeOfRobotRepoInstance);

        const logger = {
            log: sinon.stub(),
            error: sinon.stub()

        };
        Container.set('logger', logger);

        let robotServiceClass = require("../src/services/robotService").default;
        let robotServiceInstance = Container.get(robotServiceClass);
        Container.set("RobotService", robotServiceInstance);
    }
    );
    afterEach(function () {
        sandbox.restore();
    });

    it('robotController unit test using robotService stub', async function () {


        const logger = {
            log: sinon.stub(),
        };

        Container.set('logger', logger);
        let body = { nickname: "teste1", typeOfRobotId: "testeId1", StateOfRobot: true };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };
        let robotServiceInstance = Container.get<IRobotService>("RobotService");
        sinon.stub(robotServiceInstance, "createDevice").returns(Result.ok<IRobotDTO>({ "DomainId": "123", "nickname": req.body.nickname, "typeOfRobotId": req.body.typeOfRobotId, "StateOfRobot": req.body.StateOfRobot }));
        const ctrl = new RobotController(robotServiceInstance, console as Console); // Replace 'Console' with the appropriate type for the console object
        await ctrl.createDevice(req as Request, res as Response, next as NextFunction);
        sinon.assert.calledOnce(res.json!);
        sinon.assert.calledWith(res.json!, sinon.match({ "DomainId": "123", "nickname": req.body.nickname, "typeOfRobotId": req.body.typeOfRobotId, "StateOfRobot": req.body.StateOfRobot }));


    });

    it('robotController + robotService integration test using robotRepoistory and Robot stubs', async function () {
        let body = { "nickname": "teste2", "typeOfRobotId": "testeId2", "StateOfRobot": true };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        sinon.stub(Robot, "create").returns(Result.ok({ "id": "123", "nickname": req.body.nickname, "typeOfRobotId": req.body.typeOfRobotId, "StateOfRobot": req.body.StateOfRobot }));

        let robotRepoInstance = Container.get("RobotRepo");
        sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
            resolve(Robot.create({ "nickname": req.body.nickname, "StateOfRobot": req.body.StateOfRobot, "typeOfRobotId": req.body.typeOfRobotId }).getValue() as Robot);
        }));

        let robotServiceInstance = Container.get("RobotService");

        const ctrl = new RobotController(robotServiceInstance as IRobotService, console);

        await ctrl.createDevice(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "DomainId": "123", "nickname": req.body.nickname, "typeOfRobotId": req.body.typeOfRobotId, "StateOfRobot": req.body.StateOfRobot }));

    });


    it('robotController + robotService integration test using spy on robotService', async function () {
        let body = { "nickname": "teste2", "typeOfRobotId": "testeId2", "StateOfRobot": true };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };


        let robotRepoInstance = Container.get("RobotRepo");
        sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
            resolve(Robot.create({ "nickname": req.body.nickname, "StateOfRobot": req.body.StateOfRobot, "typeOfRobotId": req.body.typeOfRobotId }).getValue())
        }));

        let robotServiceInstance = Container.get("RobotService");
        const robotServiceSpy = sinon.spy(robotServiceInstance, "createDevice");

        const ctrl = new RobotController(robotServiceInstance as IRobotService, console);

        await ctrl.createDevice(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "nickname": req.body.nickname, "typeOfRobotId": req.body.typeOfRobotId, "StateOfRobot": req.body.StateOfRobot }));
        //sinon.assert.calledOnce(robotServiceSpy);
        sinon.assert.calledWith(robotServiceSpy, sinon.match({ "nickname": req.body.nickname, "typeOfRobotId": req.body.typeOfRobotId, "StateOfRobot": req.body.StateOfRobot }));


    });
    
    it('robotController unit test using robotService mock', async function () {
 let body = { "nickname": "teste3", "typeOfRobotId": "testeId2", "StateOfRobot": true };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };
        let robotServiceInstance = Container.get("RobotService");
        const robotServiceMock= sinon.mock(robotServiceInstance, "createDevice");
        robotServiceMock.expects("createDevice")
        .once()
        .returns(Result.ok<IRobotDTO>({ "DomainId": "123", "nickname": req.body.nickname, "typeOfRobotId": req.body.typeOfRobotId, "StateOfRobot": req.body.StateOfRobot }));
        
        const ctrl = new RobotController(robotServiceInstance as IRobotService, console);
        
        await ctrl.createDevice(<Request>req, <Response>res, <NextFunction>next);
        robotServiceMock.verify();
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "DomainId": "123", "nickname": req.body.nickname, "typeOfRobotId": req.body.typeOfRobotId, "StateOfRobot": req.body.StateOfRobot }));

    })
    






});*/