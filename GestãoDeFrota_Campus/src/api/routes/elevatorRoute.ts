import { NextFunction, Request, Response, Router } from "express";
import {Container} from "typedi";
import config from "../../../config";
import { Joi, celebrate } from "celebrate";
import winston from 'winston';
import IElevatorController from "../../controllers/IControllers/IElevatorController";
import axios from 'axios';

const route = Router();
export default (app: Router) => {
    app.use('/elevator', route);
    const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;

    route.post('/create',
        celebrate({
            body: Joi.object({
                building_id: Joi.string().required(),
                floors_servedId: Joi.array().items(Joi.string()).required(),
                description: Joi.string()
                
            })
        }),    async (req: Request, res: Response, next: NextFunction) => {
            try{
            const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator'){
          return res.status(401).send('You are not Authorized');
        }
            console.log("pedido recebido!");
            ctrl.createElevator(req, res, next);
        }catch(e){
            console.log(e);
        }
    },
    )

    route.patch('/edit/:domainId',
        celebrate({
            body: Joi.object({
                floors_servedId: Joi.array().items(Joi.string()),
                description: Joi.string()
            }),
            params: Joi.object({
                domainId: Joi.string().required() 
            })
        }),
        async (req: Request, res: Response, next: NextFunction) => {
        try{
            const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
            if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator'){
                return res.status(401).send('You are not Authorized');
            }
                ctrl.editElevator(req, res, next);
        }catch(e){
            console.log(e);
        }
    }
    )

    route.get('/get/:buildingId',
        celebrate({
            params: Joi.object({
                buildingId: Joi.string().required()
            })
        }),
        async (req: Request, res: Response, next: NextFunction) => {
        try{
            const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator' && result.data.role !== 'Client'){
          return res.status(401).send('You are not Authorized');
        }
            ctrl.getElevatorsInBuiling(req, res, next);
        }catch(e){
            console.log(e);
        }
    }
    )

}
