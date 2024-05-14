import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IUserRepo from "../services/IRepos/IUserRepo";
import { User } from "../domain/user";
import { UserId } from "../domain/userId";
import { UserEmail } from "../domain/userEmail";
import { UserMap } from "../mappers/UserMap";

@Service()
export default class UserRepo implements IUserRepo {
  private models: any;

  constructor(
    @Inject('userSchema') private userSchema : Model<IUserPersistence & Document>,
    @Inject('logger') private logger
  ) { }
 

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (userId: UserId | string): Promise<boolean> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX}; 
    const userDocument = await this.userSchema.findOne( query );

    return !!userDocument === true;
  }

  public async save (user: User): Promise<User> {
    const query = { domainId: user.id.toString() }; 

    const userDocument = await this.userSchema.findOne( query );

    try {
      if (userDocument === null ) {
        const rawUser: any = UserMap.toPersistence(user);

        const userCreated = await this.userSchema.create(rawUser);

        return UserMap.toDomain(userCreated);
      } else {
        userDocument.firstName = user.firstName;
        userDocument.lastName = user.lastName;
        userDocument.username = user.username;
        userDocument.email = user.email.value;
        userDocument.phoneNumber = user.phoneNumber.value;
        userDocument.nif = user.nif.value;
        userDocument.status = user.status.value;
        await userDocument.save();

        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByEmail (email: UserEmail | string): Promise<User> {
    const query = { email: email.toString() };
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findById (userId: UserId | string): Promise<User> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX }; 
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findAll (): Promise<User[]> {
    const userRecord = await this.userSchema.find();
    if( userRecord != null) {
      const users: User[] = [];
      for(let user of userRecord) {
        users.push(await UserMap.toDomain(user));
      }
      return users;
    }
    else
      return null;
    
  }

  findByUsername(username: string): Promise<User> {
      const query = { username: username };
      return this.userSchema.findOne( query ).then((user) => {
        if (user != null) {
          return UserMap.toDomain(user);
        }
        else
          return null;
      });
  }

  findByNif(nif: string): Promise<User> {
    const query = { nif: nif };
    return this.userSchema.findOne( query ).then((user) => {
      if (user != null) {
        return UserMap.toDomain(user);
      }
      else
        return null;
    });
  }

  findByPhoneNumber(phoneNumber: string): Promise<User> {
    const query = { phoneNumber: phoneNumber };
    return this.userSchema.findOne( query ).then((user) => {
      if (user != null) {
        return UserMap.toDomain(user);
      }
      else
        return null;
    });
  }

  deleteById(id: string): Promise<void> {
    this.userSchema.deleteOne({ domainId: id }, function (err) {
      if (err) return err;
    }
    );
    return null;
  }
}