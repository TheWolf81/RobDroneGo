import { NextFunction, Request, Response, Router } from "express";
import {Container} from "typedi";
import config from "../../../config";
import IRoomController from "../../controllers/IControllers/IRoomController";
import { Joi, celebrate } from "celebrate";
import winston from 'winston';
import axios from 'axios';

const route = Router();

export default (app: Router) => {
  app.use('/room', route);

  const ctrl = Container.get(config.controllers.room.name) as IRoomController;
  route.post('/create',

    celebrate({
      body: Joi.object({
        floorID: Joi.string().required(),
        category: Joi.string().required(),
        identifier: Joi.string().required(),
        description: Joi.string(),
        x: Joi.number().required(),
        y: Joi.number().required()
      })
    }),    async (req: Request, res: Response, next: NextFunction) => {
      try{
        const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
        if(result.data.role !== 'CampusManager' && result.data.role !== 'SystemAdministrator'){
          return res.status(401).send('You are not Authorized');
        }
      console.log("create room route")
      ctrl.createRoom(req, res, next);
      }catch(e){
        console.log(e);
      }
    },
    )

    route.get('/getAll', async (req: Request, res: Response, next: NextFunction) => {
      try{
        console.log("get all rooms route")
        ctrl.getAllRooms(req, res, next);
      }catch(e){
        console.log(e);
      }
    })
}