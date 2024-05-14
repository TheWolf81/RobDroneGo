import { NextFunction, Request, Response, Router } from "express";
import {Container} from "typedi";
import config from "../../../config";
import ITypeOfRobotController from "../../controllers/IControllers/ITypeOfRobotController";
import { Joi, celebrate } from "celebrate";
import winston from 'winston';
import axios from 'axios';

const route = Router();
export default (app: Router) => {
    app.use('/typeOfRobot', route);
  
    const ctrl = Container.get(config.controllers.typeOfRobot.name) as ITypeOfRobotController;
  
    route.post('/create',
  
      celebrate({
        body: Joi.object({
           brand: Joi.string().required(),
              model: Joi.string().required(),
                taskType: Joi.array().required()
        })
        }),    async (req: Request, res: Response, next: NextFunction) => {
        const logger = Container.get('logger') as winston.Logger;
        logger.debug('Calling Create endpoint with body: %o', req.body )
        try {
          const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
          if(result.data.role !== 'FleetManager' && result.data.role !== 'SystemAdministrator'){
              return res.status(401).send('You are not Authorized');
          }
          const typeOfRobotOrError = await ctrl.createTypeOfRobot(req, res, next);
          
          if (typeOfRobotOrError.isFailure) {
            logger.debug(typeOfRobotOrError.errorValue())
            return res.status(401).send(typeOfRobotOrError.errorValue());
          }
  
          const typeOfRobotDTO = typeOfRobotOrError.getValue();
  
          return res.status(201).json({ typeOfRobotDTO });
        } catch (e) {
          logger.error('🔥 error: %o',  e );
          return next(e);
        }
        },
        )

        route.get('/all', async (req, res, next) => ctrl.getAll(req, res, next) );

    }