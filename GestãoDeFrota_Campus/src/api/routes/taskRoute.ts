import { NextFunction, Request, Response, Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import { Joi, celebrate } from "celebrate";
import winston from 'winston';
import axios from 'axios';

const route = Router();
export default (app: Router) => {
  app.use('/task', route);

  route.get('/path/:origem/:destino',
    celebrate({
        params: Joi.object({
            origem: Joi.string().required(),
            destino: Joi.string().required()
        })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await axios.get('http://localhost:3100/api/users/me',{ headers: { Authorization: req.headers.authorization } });
            if(result.data.role !== 'TaskManager' && result.data.role !== 'SystemAdministrator'){
                return res.status(401).send('You are not Authorized');
            }
            const response = await axios.get(`http://localhost:8080/lapr5`);
            return res.json(response.data);
        } catch (e) {
            winston.error('🔥 error: %o', e);
            return next(e);
        }

}
)
}
