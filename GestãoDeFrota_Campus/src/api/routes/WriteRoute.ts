import { NextFunction, Request, Response, Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import ITypeOfRobotController from "../../controllers/IControllers/ITypeOfRobotController";
import { Joi, celebrate } from "celebrate";
import winston from 'winston';
import IWriteController from "../../controllers/IControllers/IWriteController";
import WriteService from "../../services/writeService";


const route = Router();

export default (app: Router) => {
    app.use('/write', route);

    const ctrl = Container.get(config.controllers.write.name) as IWriteController;
    route.patch('/write',
        celebrate({
            body: Joi.object({
                data: Joi.string().required(),
                filePath: Joi.string().required(),

            })

        }), async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger') as winston.Logger;
            logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
            try {
                const writeService = Container.get(WriteService);
                const write = writeService.setData(req.body.data, req.body.filePath);

            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        });


}