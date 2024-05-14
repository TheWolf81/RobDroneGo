import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IRobotController from './IControllers/IRobotController';
import { IRobotDTO } from '../dto/IRobotDTO';
import IRobotService from '../services/IServices/IRobotService';


@Service()
export default class RobotController implements IRobotController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.robot.name) private deviceServiceInstance : IRobotService,
      @Inject('logger') private logger,

  ) {}

  public async createDevice(req: Request, res: Response, next: NextFunction) {
    this.logger.debug('Calling Sign-Up endpoint with body: %o', req.body);

    try {
      const deviceOrError = await this.deviceServiceInstance.createDevice(req.body as IRobotDTO) as Result<IRobotDTO>;
        
      if (deviceOrError.isFailure) {
        return "Error on robot";
      }

      const deviceDTO = deviceOrError.getValue();
      //res.json(deviceDTO);
      //return res.status(201);
      return deviceOrError;
    }
    catch (e) {
      //this.logger.error(e);
      return next(e);
    }
  };

  public async updateDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceOrError = await this.deviceServiceInstance.updateDevice(req.body as IRobotDTO) as Result<IRobotDTO>;

      if (deviceOrError.isFailure) {
        return "Error on robot";
      }

      const deviceDTO = deviceOrError.getValue();
      return deviceOrError;
    }
    catch (e) {
      return next(e);
    }
  };
  
  public async inibirRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceOrError = await this.deviceServiceInstance.inibirRobot(req.body.domainId as string) ;

      if (deviceOrError.isFailure) {
        return "Error on robot";
      }

      const deviceDTO = deviceOrError.getValue();
     
      //res.json(deviceDTO);
      return deviceOrError;
    }
    catch (e) {
      return next(e);
    }
  }
  ;
  }
