import { Inject, Service } from "typedi";
import IHallwayConnectionController from "./IControllers/IHallwayConnectionController";
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import config from "../../config";
import IHallwayConnectionService from "../services/IServices/IHallwayConnectionService";
import { IHallwayConnectionDTO } from "../dto/IHallwayConnectionDTO";
import { Result } from "../core/logic/Result";
import winston from "winston";
import logger from "../loaders/logger";


@Service()
export default class HallwayConnectionController implements IHallwayConnectionController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.hallwayConnection.name) private HallwayConnectionServiceInstance: IHallwayConnectionService,
        @Inject('logger') private logger,

    ) { }
    public async getAllHallways(req: Request, res: Response, next: NextFunction) {
        try{
            const HallwaysOrError = await this.HallwayConnectionServiceInstance.getAllHallways();
            if (HallwaysOrError === null) {
                return res.status(402).send();
            }
            
            res.json(HallwaysOrError);
            
            return res.status(201);
        } catch (e) {
            this.logger.error(e);
            return next(e);
        }
    }

    public async createHallwayConnection(req: Request, res: Response, next: NextFunction) {
        // const logger = Container.get('logger') as winston.Logger;
        logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
        try {

            const HallwayConnectionOrError = await this.HallwayConnectionServiceInstance.createHallwayConnection(req.body as IHallwayConnectionDTO) as Result<IHallwayConnectionDTO>;
            if (HallwayConnectionOrError.isFailure) {
                return res.status(402).send(HallwayConnectionOrError.errorValue());
            }
            const HallwayConnectionDTO = HallwayConnectionOrError.getValue();
            res.json(HallwayConnectionDTO);
            return res.status(201);
        } catch (e) {
            this.logger.error(e);
            return next(e);
        }
    }


   

    public async editHallwayConnection(req: Request, res: Response, next: NextFunction) {

        try {
            const HallwayConnectionOrError = await this.HallwayConnectionServiceInstance.editHallwayConnection(req.body.FloorId1 as string, req.body.FloorId2 as string, req.body.DomainId as string) as Result<IHallwayConnectionDTO>;
            if (HallwayConnectionOrError.isFailure) {
                return res.status(402).send(HallwayConnectionOrError.errorValue());
            }
            const HallwayConnectionDTO = HallwayConnectionOrError.getValue();
            res.json(HallwayConnectionDTO);
            return res.status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    public async getBuildingsFloorsName(req: Request, res: Response, next: NextFunction){
        try {
            const BuildingsFloorsNameOrError = await this.HallwayConnectionServiceInstance.getBuildingsFloorsName(req.params.domainId);
            if (BuildingsFloorsNameOrError === null) {
                return res.status(402).send();
            }
            
            res.json(BuildingsFloorsNameOrError);
            
            return res.status(201);
        } catch (e) {
            this.logger.error(e);
            return next(e);
        }
    }
    public async allHallwayConnectionBetwentwoBuildings(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response, next: NextFunction) {
        try {
            const HallwayConnectionOrError = await this.HallwayConnectionServiceInstance.allHallwayConnectionBetwentwoBuildings(req.params.buildingId1, req.params.buildingId2) as Result<IHallwayConnectionDTO[]>;
            if (HallwayConnectionOrError.isFailure) {
                return res.status(402).send(HallwayConnectionOrError.errorValue());
            }
            const HallwayConnectionDTO = HallwayConnectionOrError.getValue();
            res.json(HallwayConnectionDTO);
            return res.status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    public async ListarEdificiosPassagens(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const HallwayConnectionOrError = await this.HallwayConnectionServiceInstance.ListarEdificiosPassagens() ;
            if (HallwayConnectionOrError==null) {
                return res.status(402).send();
            }
            res.json(HallwayConnectionOrError);
            return res.status(201);
        }
        catch (e) {
            return next(e);
        }
    }
}
