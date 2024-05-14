import { NextFunction, Request, Response, Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import IFloorController from "../../controllers/IControllers/IFloorController";
import { Joi, celebrate } from "celebrate";
import winston from 'winston';
import { IFloorDTO } from "../../dto/IFloorDTO";
import FloorService from "../../services/FloorService";
import axios from 'axios';
const route = Router();
export default (app: Router) => {
  app.use('/floor', route);

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  route.post('/create',

    celebrate({
      body: Joi.object({
        building_id: Joi.string().required(),
        floorNumber: Joi.number().required(),
        description: Joi.string().required(),
        area: Joi.number().required(),
        name: Joi.string().required(),
        floorMap: Joi.array().required()
      })
    }), async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Create endpoint with body: %o', req.body)
      try {
        const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator'){
          return res.status(401).send('You are not Authorized');
        }
        const floorOrError = await ctrl.createFloor(req, res, next);
        if (floorOrError.isFailure) {
          logger.debug(floorOrError.errorValue())
          return res.status(401).send(floorOrError.errorValue());
        }

        const floorDTO = floorOrError.getValue();

        return res.status(201).json({ floorDTO });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  )

  route.put('/update/:domainId',
    celebrate({
      body: Joi.object({
        description: Joi.string().required(),
        name: Joi.string().required()
        //floorMap: Joi.array().required()
      }),
      params: Joi.object({
        domainId: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Update endpoint with body: %o', req.body)
      try {
        const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator'){
          return res.status(401).send('You are not Authorized');
        }
        const floorOrError = await ctrl.updateFloor(req, res, next);

        if (floorOrError.isFailure) {
          logger.debug(floorOrError.errorValue())
          return res.status(401).send(floorOrError.errorValue());
        }

        const floorDTO = floorOrError.getValue();

        return res.status(200).json({ floorDTO });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  )

  route.get('/getFloorsByBuildingId/:building_id',
    celebrate({
      params: Joi.object({
        building_id: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Get-Floors-By-Building-Id endpoint with body: %o', req.body)
      try {
        const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator'){
          return res.status(401).send('You are not Authorized');
        }
        const floorOrError = await ctrl.getFloorsByBuildingId(req, res, next);

        if (floorOrError.isFailure) {
          logger.debug(floorOrError.errorValue())
          return res.status(401).send(floorOrError.errorValue());
        }

        const floorDTO = floorOrError.getValue();

        return res.status(200).json({ floorDTO });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  )

  route.get('/getFloorsByBuildingId2/:building_id',
    celebrate({
      params: Joi.object({
        building_id: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Get-Floors-By-Building-Id endpoint with body: %o', req.body)
      try {

        const floorOrError = await ctrl.getFloorsByBuildingId(req, res, next);

        if (floorOrError.isFailure) {
          logger.debug(floorOrError.errorValue())
          return res.status(401).send(floorOrError.errorValue());
        }

        const floorDTO = floorOrError.getValue();

        return res.status(200).json({ floorDTO });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  )

  route.patch('/loadMap/:domainId', // domainId do piso a carregar o mapa
    celebrate({
      body: Joi.object({

        maze: Joi.object({
          size: Joi.object({ width: Joi.number().required(), depth: Joi.number().required() }).required(),
          map: Joi.array().required(),
          exits: Joi.array().required(),
          elevators: Joi.array().required(),
          exitLocation: Joi.array().required()
        }).required(),
      }).unknown(true),
      params: Joi.object({
        domainId: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Load-Map endpoint with body: %o', req.body)
      try {
        const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator'){
          return res.status(401).send('You are not Authorized');
        }
        const floorOrError = await ctrl.loadMap(req, res, next);
        if (floorOrError == null) {
          // logger.debug(floorOrError.errorValue())
          //return res.status(401).send(floorOrError.errorValue());
        }

        const floorDTO = floorOrError;

        return res.status(201).json({ floorDTO });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  )
  route.get('/Listarfloors', async (req, res, next) => {
    try{
     ctrl.getFloors(req, res, next);
    }catch(e){
      console.log(e);
    }
  });


  route.get('/getFloorMap/:domainId',
    celebrate({
      params: Joi.object({
        domainId: Joi.string().required()
      })
    }),
    async (req, res, next) => {
      try{
      ctrl.getFloorMap(req, res, next)
    }catch(e){
      console.log(e);
    }
    })
      


};