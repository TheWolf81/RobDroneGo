import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IFloorController from './IControllers/IFloorController';
import { IFloorDTO } from '../dto/IFloorDTO';
import IFloorService from '../services/IServices/IFloorService';
import { IMapDTO } from '../dto/IMapDTO';
import { floor } from 'lodash';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class FloorController implements IFloorController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.floor.name) private floorServiceInstance: IFloorService,
        @Inject('logger') private logger,

    ) { }
    
    public async getFloors(req: Request, res: Response, next: NextFunction) {
        try{
        const floorOrError = await this.floorServiceInstance.getFloors();
        const floorDTO=floorOrError.getValue();
        res.json(floorDTO);
        
        return res.status(201);
    } catch (e) {
        this.logger.error(e);
        return next(e);
    }
    };

    public async getFloorMap(req: Request, res: Response, next: NextFunction) {
        try{
            const floorOrError = await this.floorServiceInstance.getFloorMap(req.params.domainId);
            const floorDTO=floorOrError;
            res.json(floorDTO);
            
            return res.status(201);
        } catch (e) {
            this.logger.error(e);
            return next(e);
        }   
    }

    public async createFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const floorOrError = await this.floorServiceInstance.createFloor(req.body as IFloorDTO) as Result<IFloorDTO>;

            /* (floorOrError.isFailure) {
                return res.status(402).send(floorOrError.errorValue());
            }

            const floorDTO = floorOrError.getValue();
            res.json(floorDTO);
            return res.status(201);*/
            return floorOrError;
        }
        catch (e) {
            this.logger.error(e);
            return next(e);
        }
    };

    public async updateFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const floorOrError = await this.floorServiceInstance.updateFloor(req.params.domainId, req.body as IFloorDTO) as Result<IFloorDTO>;

            /*if (floorOrError.isFailure) {
                return res.status(404).send(floorOrError.errorValue());
            }

            const floorDTO = floorOrError.getValue();
            return res.status(201).json( floorDTO ); */
            return floorOrError;
        }
        catch (e) {
            return next(e);
        }
    };

    public async getFloorsByBuildingId(req: Request, res: Response, next: NextFunction) {
        try {
            const floorOrError = await this.floorServiceInstance.getFloorsByBuildingId(req.params.building_id) as Result<IFloorDTO[]>;

            /*if (floorOrError.isFailure) {
                return res.status(404).send(floorOrError.errorValue());
            }

            const floorDTO = floorOrError.getValue();
            return res.status(201).json( floorDTO );*/
            return floorOrError;
        }
        catch (e) {
            return next(e);
        }
    };

    public async loadMap(req: Request, res: Response, next: NextFunction) {
        try {
            const floorOrError = await this.floorServiceInstance.loadMap(req.params.domainId, req.body as IMapDTO) as Result<IFloorDTO>;

            /* if (floorOrError.isFailure) {
               return res.status(404).send(floorOrError.errorValue());
             }
         
             const floorDTO = floorOrError.getValue();
   
             return res.status(201).json(floorDTO);*/
            return floorOrError;
        } catch (e) {
            return next(e);
        }
    }


}
