import { expect } from 'chai';
import { RobotMapper } from '../../../src/mappers/RobotMap'; 
import { Robot } from '../../../src/domain/robot';
import { Container } from 'typedi';
import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';

describe('Robot creation test', () => {


    //this.timeout(5000);
    it('should create a valid robot', () => {
        const robotDto = {
            nickname: 'robot1',
            typeOfRobotId: '1',
            StateOfRobot: true,
        };
        const robot = RobotMapper.toDomain(robotDto);
        expect(robot).not.to.be.null;
    });

    it('should not create a robot with missing nickname', async () => {
        const robotDto = {
            typeOfRobotId: '1',
            StateOfRobot: true,
        };
        const robot = await RobotMapper.toDomain(robotDto);  
        expect(robot).to.be.null;
    });

    it('should not create a robot with missing typeOfRobotId', async () => {
        const robotDto = {
            nickname: 'robot1',
            StateOfRobot: true,
        };
        const robot = await RobotMapper.toDomain(robotDto);
        expect(robot).to.be.null;
    });

    it('should not create a robot with missing StateOfRobot', async () => {
        const robotDto = {
            nickname: 'robot1',
            typeOfRobotId: '1',
        };
        const robot = await RobotMapper.toDomain(robotDto);

        expect(robot).to.be.null;
    });

});



