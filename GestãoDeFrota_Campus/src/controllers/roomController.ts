import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IRoomController from './IControllers/IRoomController';
import { IRoomDTO } from '../dto/IRoomDTO';
import IRoomService from '../services/IServices/IRoomService';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class RoomController implements IRoomController{
    constructor(
        @Inject(config.services.room.name) private roomServiceInstance : IRoomService,
        @Inject('logger') private logger,
    ) {}
    async createRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const roomOrError = await this.roomServiceInstance.createRoom(req.body as IRoomDTO) as Result<IRoomDTO>;
              
            if (roomOrError.isFailure) {
              return res.status(402).send(roomOrError.errorValue());
            }
      
            const roomDTO = roomOrError.getValue();
            res.json(roomDTO);
            return res.status(201);
          }
          catch (e) {
            this.logger.error(e);
            return next(e);
          }
    }
    
    async getAllRooms(req: Request, res: Response, next: NextFunction) {
      try {
        const roomOrError = await this.roomServiceInstance.listRooms() as Result<IRoomDTO[]>;
        if (roomOrError.isFailure) {
          return res.status(402).send(roomOrError.errorValue());
        }
        const roomDTO = roomOrError.getValue();
        res.json(roomDTO);
        return res.status(201);
      }
      catch (e) {
        this.logger.error(e);
        return next(e);
      }

    }

}