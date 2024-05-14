import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import { Container} from 'typedi';

import config from '../../config';

import IUserRepo from '../services/IRepos/IUserRepo';

import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';
import IUserController from './IControllers/IUserController';
import IUserService from '../services/IServices/IUserService';
import { Result } from '../core/logic/Result';

@Service()
export default class UserController implements IUserController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.user.name) private userServiceInstance: IUserService,
        @Inject('logger') private logger,

    ) { }

public async getMe(req, res: Response) {
  
    // NB: a arquitetura ONION não está a ser seguida aqui

    const userRepo = Container.get(config.repos.user.name) as IUserRepo

    if( !req.token || req.token == undefined )
        return res.json( new Error("Token inexistente ou inválido")).status(401);

    const user = await userRepo.findById( req.token.id );
    if (!user)
        return res.json( new Error("Utilizador não registado")).status(401);

    const userDTO = UserMap.toDTO( user ) as IUserDTO;
    return res.json( userDTO ).status(200);
}

public async SignUpClient(req: Request, res: Response, next: NextFunction) {
    try {
        const userOrError = await this.userServiceInstance.SignUpClient(req.body as IUserDTO) as Result<{ userDTO: IUserDTO; token: string; }>;

        return userOrError;
    }
    catch (e) {
        this.logger.error(e);
        return next(e);
    }

}

public async SignUpAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const userOrError = await this.userServiceInstance.SignUpAdmin(req.body as IUserDTO, (req as any).user) as Result<{ userDTO: IUserDTO; token: string; }>;

        return userOrError;
    }
    catch (e) {
        this.logger.error(e);
        return next(e);
    }

}

public async getPendingResgistrationUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const usersOrError = await this.userServiceInstance.getPendingResgistrationUsers(req) as Result<IUserDTO[]>;

        return usersOrError;
    }
    catch (e) {
        this.logger.error(e);
        return next(e);
    }
}

public async approveUserRegistration(req: Request, res: Response, next: NextFunction) {
    try {
        const userOrError = await this.userServiceInstance.approveUserRegistration(req) as Result<IUserDTO>;

        return userOrError;
    }
    catch (e) {
        this.logger.error(e);
        return next(e);
    }

}

public async requestDataCopy(req: Request, res: Response, next: NextFunction) {
    try {
        const userOrError = await this.userServiceInstance.requestDataCopy(req) as Result<IUserDTO>;

        return userOrError;
    }
    catch (e) {
        this.logger.error(e);
        return next(e);
    }
}

public async editAccount(req: Request, res: Response, next: NextFunction) {
    try {
        const userOrError = await this.userServiceInstance.editAccount(req.body, (req as any).user) as Result<IUserDTO>;

        return userOrError;
    }
    catch (e) {
        this.logger.error(e);
        return next(e);
    }
}

public async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
        const userOrError = await this.userServiceInstance.deleteAccount(req) as any;

        return userOrError;
    }
    catch (e) {
        this.logger.error(e);
        return next(e);
    }
}
}
