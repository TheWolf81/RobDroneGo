import { Request, Response, NextFunction } from 'express';


export default interface IWriteController  {
    setData(req: Request, res: Response, next: NextFunction);
}