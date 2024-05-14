import { Request, Response, NextFunction } from 'express';

export default interface IFloorController  {
    createFloor(req: Request, res: Response, next: NextFunction);
    updateFloor(req: Request, res: Response, next: NextFunction);
    getFloorsByBuildingId(req: Request, res: Response, next: NextFunction);
    //uploadJsonFloorMap(req: Request, res: Response, next: NextFunction);
    loadMap(req: Request, res: Response, next: NextFunction);
    getFloors(req: Request, res: Response, next: NextFunction);
    getFloorMap(req: Request, res: Response, next: NextFunction);
}