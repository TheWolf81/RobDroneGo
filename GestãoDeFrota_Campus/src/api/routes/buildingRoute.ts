import { NextFunction, Request, Response, Router } from "express";
import {Container} from "typedi";
import config from "../../../config";
import IBuildingController from "../../controllers/IControllers/IBuildingController";
import { Joi, celebrate } from "celebrate";
import winston from 'winston';
import axios from 'axios';


const route = Router();
export default (app: Router) => {
    app.use('/building', route);
    
    const ctrl = Container.get(config.controllers.building.name) as IBuildingController;
  
    route.post('/create',
  
      celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            description: Joi.string().optional(),
            max_length: Joi.number().optional(),
            max_width: Joi.number().optional()
        })
      }),    async (req: Request, res: Response, next: NextFunction) => {
        try{
        const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator' ){
          return res.status(401).send('You are not Authorized');
        }
        else{
          ctrl.createBuilding(req, res, next);
        }
      }catch(e){
        console.log(e);
      }  
      },)


      route.put('/edit/:domainId',
      celebrate({
        body: Joi.object({
            domainId: Joi.string().optional(),
            code: Joi.string().required(),
            description: Joi.string().optional(),
            max_length: Joi.number().optional(),
            max_width: Joi.number().optional()
        }),
        params: Joi.object({
            domainId: Joi.string().required() 
        })
      }),    
      async (req: Request, res: Response, next: NextFunction) => {
        const logger = Container.get('logger') as winston.Logger;
        logger.debug('Calling Edit-Building endpoint with body: %o', req.body )
        try {
          const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator'){
          return res.status(401).send('You are not Authorized');
        }
          const editedBuilding = await ctrl.editBuilding(req, res, next);
          return editedBuilding;
        } catch (e) {
          logger.error('🔥 error: %o',  e );
          return next(e);
        }
      },
    );


    route.get('/getAll', async (req: Request, res: Response, next: NextFunction) => {
        const logger = Container.get('logger') as winston.Logger;
        logger.debug('Calling Get-All-Buildings endpoint');
        try {
            const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
          if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator' && result.data.role !== 'Client'){
            return res.status(401).send('You are not Authorized');
          }
            const buildingsOrError = await ctrl.getAllBuildings(req, res, next);    
            return buildingsOrError;
        } catch (e) {
            logger.error('🔥 error: %o',  e );
            return next(e);
        }
      });

      route.get('/getAll2', async (req: Request, res: Response, next: NextFunction) => {
        const logger = Container.get('logger') as winston.Logger;
        logger.debug('Calling Get-All-Buildings endpoint');
        try {
            const buildingsOrError = await ctrl.getAllBuildings(req, res, next);    
            return buildingsOrError;
        } catch (e) {
            logger.error('🔥 error: %o',  e );
            return next(e);
        }
      });

      route.get('/getBuildingsByMaxAndMinFloors/:min/:max', 
      celebrate({
        params: Joi.object({
            min: Joi.number().required(),
            max: Joi.number().required()
        })
      }),
      async (req: Request, res: Response, next: NextFunction) => {
        const logger = Container.get('logger') as winston.Logger;
        logger.debug('Calling Get-Buildings-By-Max-And-Min-Floors endpoint');
        try {
          const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator'){
          return res.status(401).send('You are not Authorized');
        }
            const buildingsOrError = await ctrl.getBuildingsByMaxAndMinFloors(req, res, next);
    
            if (buildingsOrError.isFailure) {
                logger.debug(buildingsOrError.errorValue())
                return res.status(401).send(buildingsOrError.errorValue());
            }
    
            const buildingDTOs = buildingsOrError.getValue();
    
            return res.status(200).json({ buildingDTOs });
        } catch (e) {
            logger.error('🔥 error: %o',  e );
            return next(e);
        }
      });

      route.get("/buildingById/:id",
      celebrate({
        params: Joi.object({
          id: Joi.string().required(),
        }),
      }),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const buildingOrError = await ctrl.getBuildingById(req, res, next);
          if (buildingOrError.isFailure) {
            console.log(buildingOrError.errorValue());
            return res.status(401).send(buildingOrError.errorValue());
          }
          const building = buildingOrError.getValue();
          return res.status(200).json({ building });
        } catch (e) {
            console.log(e);
          return next(e);
        }
      });
    }
