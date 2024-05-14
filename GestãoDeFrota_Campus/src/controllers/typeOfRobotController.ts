import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import ITypeOfRobotController from './IControllers/ITypeOfRobotController';
import { ITypeOfRobotDTO } from '../dto/ITypeOfRobotDTO';
import ITypeOfRobotService from '../services/IServices/ITypeOfRobotService';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class TypeOfRobotController implements ITypeOfRobotController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.typeOfRobot.name) private typeOfRobotServiceInstance : ITypeOfRobotService,
        @Inject('logger') private logger,

    ) {}
    public async getAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try{
            const TypeOfRobotOrError = await this.typeOfRobotServiceInstance.getAll();
            if (TypeOfRobotOrError === null) {
                return res.status(402).send();
            }
            
            res.json(TypeOfRobotOrError);
            
            return res.status(201);
        } catch (e) {
            this.logger.error(e);
            return next(e);
        }
    }

    public async createTypeOfRobot(req: Request, res: Response, next: NextFunction) {
        try {
            const typeOfRobotOrError = await this.typeOfRobotServiceInstance.createTypeOfRobot(req.body as ITypeOfRobotDTO) as Result<ITypeOfRobotDTO>;
            
            return typeOfRobotOrError;
        }
        catch (e) {
            this.logger.error(e);
            return next(e);
        }
    };
}