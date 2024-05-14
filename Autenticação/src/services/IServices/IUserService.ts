import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  SignUpClient(userDTO: IUserDTO ): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  SignUpAdmin(userDTO: IUserDTO, reqUser: IUserDTO ): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
  getPendingResgistrationUsers(req: any): Promise<Result<IUserDTO[]>>;
  approveUserRegistration(req: any): Promise<Result<IUserDTO>>;
  requestDataCopy(reqUser: any): Promise<Result<IUserDTO>>;
  editAccount(userDTO: IUserDTO, reqUser: any): Promise<Result<IUserDTO>>;
  deleteAccount(reqUser: any): any;
}
