import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotController from '../../controllers/IControllers/IRobotController'; 

import config from "../../../config";
import winston from 'winston';
import RobotService from '../../services/robotService';
import { IRobotDTO } from '../../dto/IRobotDTO';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { RobotId } from '../../domain/RobotId';
import axios from 'axios';

const route = Router();

export default (app: Router) => {
  app.use('/robot', route);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  //route to create a new robot
  route.post('/create',

    celebrate({
      body: Joi.object({
        nickname:Joi.string().required(),
        typeOfRobotId: Joi.string().required(),
        StateOfRobot: Joi.boolean().required()
      })
    }),    async (req: Request, res: Response, next: NextFunction) => 
    {
      try{
        const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'FleetManager' && result.data.role !== 'SystemAdministrator'){
            return res.status(401).send('You are not Authorized');
        }
        ctrl.createDevice(req, res, next) 
      }catch(e){
        console.log(e);
      }
    });
      

       
    
  //route to get all robots
  route.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body )
    try {
      const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'FleetManager' && result.data.role !== 'SystemAdministrator'){
            return res.status(401).send('You are not Authorized');
        }
      const RobotServiceInstance = Container.get(RobotService);
      const robotOrError = await RobotServiceInstance.getAllRobots();

      if (robotOrError.isFailure) {
        logger.debug(robotOrError.errorValue())
        return res.status(401).send(robotOrError.errorValue());
      }

      const robots = robotOrError.getValue();

      return res.status(201).json({ robots });
    } catch (e) {
      logger.error('🔥 error: %o',  e );
      return next(e);
    }
  },);

  //route to update a robot
  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        type: Joi.string().required(),
        StateOfDevice: Joi.boolean().required()
      }),
    }),
    (req, res, next) => ctrl.updateDevice(req, res, next) );

  //route to inhibit a robot
  route.patch("/inibir",
  celebrate({
    body: Joi.object({
      domainId:Joi.string().required()
    }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )
      try {
        const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'FleetManager' && result.data.role !== 'SystemAdministrator'){
            return res.status(401).send('You are not Authorized');
        }
        const RobotServiceInstance = Container.get(RobotService);
        const robotOrError = await RobotServiceInstance.inibirRobot(req.body.domainId as RobotId);

        if (robotOrError.isFailure) {
          logger.debug(robotOrError.errorValue())
          return res.status(401).send(robotOrError.errorValue());
        }

        const IRobotDTO = robotOrError.getValue();

        return res.status(201).json({ IRobotDTO });
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );
};
