import { Request, Response, NextFunction } from 'express';

export default interface IUserController  {
    SignUpClient(req: Request, res: Response, next: NextFunction);
    SignUpAdmin(req: Request, res: Response, next: NextFunction);
    getMe(req: Request, res: Response);
    getPendingResgistrationUsers(req: Request, res: Response, next: NextFunction);
    approveUserRegistration(req: Request, res: Response, next: NextFunction);
    requestDataCopy(req: Request, res: Response, next: NextFunction);
    editAccount(req: Request, res: Response, next: NextFunction);
    deleteAccount(req: Request, res: Response, next: NextFunction);
}