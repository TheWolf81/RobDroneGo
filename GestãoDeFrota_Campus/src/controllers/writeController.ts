import { Inject, Service } from "typedi";
import IWriteController from "./IControllers/IWriteController";
import IwriteService from "../services/IServices/IwriteService";
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { Result } from "../core/logic/Result";

@Service()
export default class writeController implements IWriteController{
    constructor(
        @Inject(config.services.write.name) private writeServiceInstance : IwriteService,
        @Inject('logger') private logger,
    ) {}

    public async setData(req: Request, res: Response, next: NextFunction) {
        this.logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
        try {
          this.writeServiceInstance.setData(req.body.data, req.body.filePath) ;
            
          
        }
        catch (e) {
            this.logger.error('🔥 error: %o', e);
            return next(e);
        }
    };
}