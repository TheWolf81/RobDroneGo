import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import config from "../../../config";
import winston from 'winston';
import IHallwayConnectionController from '../../controllers/IControllers/IHallwayConnectionController';
import axios from 'axios';


const route = Router();
export default (app: Router) => {
    app.use('/HallwayConnectionRoute', route);
    const ctrl = Container.get(config.controllers.hallwayConnection.name) as IHallwayConnectionController;

    route.post('/create',
        celebrate({
            body: Joi.object({
                FloorId1:  Joi.string().required(),
                FloorId2:  Joi.string().required(),
                x1:  Joi.number().required(),
                y1:  Joi.number().required(),
                x2:  Joi.number().required(),
                y2:  Joi.number().required(),
            })
        }),
        async (req, res, next) =>  {
            const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator'){
          return res.status(401).send('You are not Authorized');
        }
        ctrl.createHallwayConnection(req, res, next)
    });
            
         
    route.get('/ListarPassagens/:buildingId1/:buildingId2', 
    celebrate({
        params: Joi.object({
            buildingId1:  Joi.string().required(),
            buildingId2:  Joi.string().required(),
           
        })
    }),
    async (req, res, next) => {
        const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator'){
          return res.status(401).send('You are not Authorized');
        }
        ctrl.allHallwayConnectionBetwentwoBuildings(req, res, next) 
    });

    route.get('/ListarEdificiosPassagens', async (req, res, next) => ctrl.ListarEdificiosPassagens(req, res, next) );

    route.get('/all', async (req, res, next) => ctrl.getAllHallways(req, res, next) );

    route.put('/edit' ,
    celebrate({
        body: Joi.object({
            FloorId1:  Joi.string().required(),
            FloorId2:  Joi.string().required(),
            DomainId:Joi.string().required()
        })
    }),
    async (req, res, next) => ctrl.editHallwayConnection(req, res, next));
    
    route.get('/names/:domainId',
    celebrate({
        params: Joi.object({
            domainId: Joi.string().required()
        })
    }),
    async (req, res, next) => ctrl.getBuildingsFloorsName(req, res, next) );
}
