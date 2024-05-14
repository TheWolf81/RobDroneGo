import { Request, Response, NextFunction } from 'express';

export default interface IElevatorController  {
    createElevator(req: Request, res: Response, next: NextFunction);
    editElevator(req: Request, res: Response, next: NextFunction);
    getElevatorsInBuiling(req: Request, res: Response, next: NextFunction);

}