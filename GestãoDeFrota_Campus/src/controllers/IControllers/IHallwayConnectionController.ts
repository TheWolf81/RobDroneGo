import { Request, Response, NextFunction } from 'express';

export default interface IHallwayConnectionController {
  createHallwayConnection(req: Request, res: Response, next: NextFunction);
  editHallwayConnection(req: Request, res: Response, next: NextFunction);
  allHallwayConnectionBetwentwoBuildings(req: Request, res: Response, next: NextFunction);
  ListarEdificiosPassagens(req: Request, res: Response, next: NextFunction);
  getAllHallways(req: Request, res: Response, next: NextFunction);
  getBuildingsFloorsName(req: Request, res: Response, next: NextFunction)
}