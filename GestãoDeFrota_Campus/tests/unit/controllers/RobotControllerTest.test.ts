import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import { assert } from 'console';
import { expect } from 'chai';
import { mock, instance, when } from 'ts-mockito';
import { describe } from 'node:test';
import RobotController from '../../../src/controllers/robotContrller';

import IRobotService from '../../../src/services/IServices/IRobotService';
import { IRobotDTO } from '../../../src/dto/IRobotDTO';
describe('RobotController', () => {
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

        let robotSchemaInstance = require("../../../src/persistence/schemas/robotSchema").default;
        Container.set("robotSchema", robotSchemaInstance);

        let typeOfRobotSchemaInstance = require("../../../src/persistence/schemas/typeOfRobotSchema").default;
        Container.set("typeOfRobotSchema", typeOfRobotSchemaInstance);

        let robotRepoClass = require("../../../src/repos/RobotRepo").default;
        let robotRepoInstance = Container.get(robotRepoClass);
        Container.set("RobotRepo", robotRepoInstance);

        let typeOfRobotRepoClass = require("../../../src/repos/TypeOfRobotRepo").default;
        let typeOfRobotRepoInstance = Container.get(typeOfRobotRepoClass);
        Container.set("TypeOfRobotRepo", typeOfRobotRepoInstance);

        let robotServiceClass = require("../../../src/services/robotService").default;
        let robotServiceInstance = Container.get(robotServiceClass);
        Container.set("RobotService", robotServiceInstance);

    })
    afterEach(function () {
        sandbox.restore();
    });

    it('creatRobot(): should return a robot on sucess (using mockito)', async () => {
        const body = { nickname: 'test', typeOfRobotId: '1', StateOfRobot: true, DomainId: '1' }
        let req: Partial<Request> = { body };
        let res: Partial<Response> = {};
        let next: Partial<NextFunction> = {};

        const robotService = mock<IRobotService>();
        when(robotService.createDevice(body)).thenResolve(Result.ok<IRobotDTO>({
            typeOfRobotId: "1",
            DomainId: "1",
            nickname: "test",
            StateOfRobot: true
        })
        )
        const robotController = new RobotController(instance(robotService), console);
        const actualResult = await robotController.createDevice(req as Request, res as Response, next as NextFunction) as unknown as Result<IRobotDTO>;
        expect(actualResult.isSuccess).to.be.true;
        expect(actualResult.getValue()).to.deep.equal({
            typeOfRobotId: "1",
            DomainId: "1",
            nickname: "test",
            StateOfRobot: true
        });
    })
    it('creatRobot(): should return a failure on error (using mockito)', async () => {
        const body = { nickname: 'test', typeOfRobotId: '1', StateOfRobot: true, DomainId: '1' }
        let req: Partial<Request> = { body };
        let res: Partial<Response> = {};
        let next: Partial<NextFunction> = {};

        let robotServiceInstance = Container.get<IRobotService>("RobotService");
        sinon.stub(robotServiceInstance, "createDevice").resolves(Result.fail<IRobotDTO>({}));


        const robotController = new RobotController(robotServiceInstance, console);
        const actualResult = await robotController.createDevice(req as Request, res as Response, next as NextFunction) as unknown as Result<IRobotDTO>;
        expect(actualResult).to.deep.equal("Error on robot");


    })

    it('updateRobot(): should return a robot on sucess (using mockito)', async () => {
        const body = { nickname: 'test', typeOfRobotId: '1', StateOfRobot: true, DomainId: '1' }
        let req: Partial<Request> = { body };
        let res: Partial<Response> = {};
        let next: Partial<NextFunction> = {};

        const robotService = mock<IRobotService>();
        when(robotService.updateDevice(body)).thenResolve(Result.ok<IRobotDTO>({
            typeOfRobotId: "1",
            DomainId: "1",
            nickname: "test",
            StateOfRobot: true
        })
        )
        const robotController = new RobotController(instance(robotService), console);
        const actualResult = await robotController.updateDevice(req as Request, res as Response, next as NextFunction) as unknown as Result<IRobotDTO>;
        expect(actualResult.isSuccess).to.be.true;
        expect(actualResult.getValue()).to.deep.equal({
            typeOfRobotId: "1",
            DomainId: "1",
            nickname: "test",
            StateOfRobot: true
        });
    });
    it('updateRobot(): should return a failure on error (using mockito)', async () => {
        const body = { nickname: 'test', typeOfRobotId: '1', StateOfRobot: true, DomainId: '1' }
        let req: Partial<Request> = { body };
        let res: Partial<Response> = {};
        let next: Partial<NextFunction> = {};

        let robotServiceInstance = Container.get<IRobotService>("RobotService");
        sinon.stub(robotServiceInstance, "updateDevice").resolves(Result.fail<IRobotDTO>({}));


        const robotController = new RobotController(robotServiceInstance, console);
        const actualResult = await robotController.updateDevice(req as Request, res as Response, next as NextFunction) as unknown as Result<IRobotDTO>;
        expect(actualResult).to.deep.equal("Error on robot");
    })
    it('inibirRobot(): should return a success on sucess (using mockito)', async () => {
        const body = { DomainId: '1' }
        let req: Partial<Request> = { body };
        let res: Partial<Response> = {};
        let next: Partial<NextFunction> = {};

        let robotServiceInstance = Container.get<IRobotService>("RobotService");
        sinon.stub(robotServiceInstance, "inibirRobot").resolves(Result.ok<IRobotDTO>({
            typeOfRobotId: "1",
            DomainId: "1",
            nickname: "test",
            StateOfRobot: false
        }));
        
        const robotController = new RobotController(robotServiceInstance, console);
        const actualResult = await robotController.inibirRobot(req as Request, res as Response, next as NextFunction) as unknown as Result<IRobotDTO>;
        expect(actualResult.isSuccess).to.be.true;
        expect(actualResult.getValue()).to.deep.equal({
            typeOfRobotId: "1",
            DomainId: "1",
            nickname: "test",
            StateOfRobot: false
        });
    });
    it('inibirRobot(): should return a failure on error (using mockito)', async () => {
        const body = { DomainId: '1' }
        let req: Partial<Request> = { body };
        let res: Partial<Response> = {};
        let next: Partial<NextFunction> = {};

        let robotServiceInstance = Container.get<IRobotService>("RobotService");
        sinon.stub(robotServiceInstance, "inibirRobot").resolves(Result.fail<IRobotDTO>({}));
        const robotController = new RobotController(robotServiceInstance, console);
        const actualResult = await robotController.inibirRobot(req as Request, res as Response, next as NextFunction) as unknown as Result<IRobotDTO>;
        expect(actualResult).to.deep.equal("Error on robot");
    }
    );


})





