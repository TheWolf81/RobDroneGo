import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IElevatorService from '../services/IServices/IElevatorService';
import IElevatorController from './IControllers/IElevatorController';
import { IElevatorDTO } from '../dto/IElevatorDTO';

@Service()
export default class ElevatorController implements IElevatorController {
    constructor(
        @Inject(config.services.elevator.name) private elevatorServiceInstance : IElevatorService,
        @Inject('logger') private logger,

    ) {}
    public async createElevator(req: Request, res: Response, next: NextFunction) {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.createElevator(req.body) as Result<any>;
            if (elevatorOrError.isFailure) {
                return res.status(402).send(elevatorOrError.errorValue());
            }

            const elevatorDTO = elevatorOrError.getValue();
            res.json(elevatorDTO);
            return res.status(201);
        }
        catch (e) {
            this.logger.error(e);
            return next(e);
        }
    };

    public async editElevator(req: Request, res: Response, next: NextFunction) {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.editElevator(req.params.domainId, req.body as IElevatorDTO) as Result<any>;
            if (elevatorOrError.isFailure) {
                return res.status(402).send(elevatorOrError.errorValue());
            }

            const newElevator = elevatorOrError.getValue();
            res.json(newElevator);
            return res.status(201);
        }
        catch (e) {
            this.logger.error(e);
            return next(e);
        }
    }

    public async getElevatorsInBuiling(req: Request, res: Response, next: NextFunction) {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.getElevatorsInBuilding(req.params.buildingId) as Result<any>;
            if (elevatorOrError.isFailure) {
                return res.status(402).send(elevatorOrError.errorValue());
            }

            const elevatorDTO = elevatorOrError.getValue();
            res.json(elevatorDTO);
            return res.status(201);
        }
        catch (e) {
            this.logger.error(e);
            return next(e);
        }
    }
}