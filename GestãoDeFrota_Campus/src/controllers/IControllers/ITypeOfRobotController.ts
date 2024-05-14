import { Request, Response, NextFunction } from 'express';

export default interface IFloorController  {
    createTypeOfRobot(req: Request, res: Response, next: NextFunction);
    getAll(req: Request, res: Response, next: NextFunction);
}