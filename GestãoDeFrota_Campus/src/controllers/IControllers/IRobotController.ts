import { Request, Response, NextFunction } from 'express';

export default interface IRobotController  {
  createDevice(req: Request, res: Response, next: NextFunction);
  updateDevice(req: Request, res: Response, next: NextFunction);
}