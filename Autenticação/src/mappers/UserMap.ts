import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { User } from "../domain/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/userEmail";
import { UserPassword } from "../domain/userPassword";

import RoleRepo from "../repos/roleRepo";
import { PhoneNumber } from '../domain/phoneNumber';
import { Nif } from '../domain/nif';
import { Status } from '../domain/status';

export class UserMap extends Mapper<User> {

  public static toDTO( user: User): IUserDTO {
    return {
      //id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email.value,
      password: "",
      role: user.role.name,
      phoneNumber: user.phoneNumber.value,
      nif: user.nif.value,
      status: user.status.value

    } as IUserDTO;
  }

  public static async toDomain (raw: any): Promise<User> {
    const userEmailOrError = UserEmail.create(raw.email);

    if (userEmailOrError.isFailure) {
      console.log(userEmailOrError.error);
      return null;
    }

    const userPasswordOrError = UserPassword.create({value: raw.password, hashed: true});

    if(userPasswordOrError.isFailure) {
      console.log(userPasswordOrError.error);
      return null;
    }
    
    const repo = Container.get(RoleRepo);
    const role = await repo.findByDomainId(raw.role);

    if(role === null) {
      console.log("Role not found");
      return null;
    }

    const phoneNumber = PhoneNumber.create(raw.phoneNumber);

    if(phoneNumber.isFailure) {
      console.log(phoneNumber.error);
      return null;
    }

    const userNif = Nif.create(raw.nif);

    if(userNif.isFailure) {
      console.log(userNif.error);
      return null;
    }

    const userStatus = Status.create(raw.status);
    if(userStatus.isFailure) {
      console.log(userStatus.error);
      return null;
    }
    const userOrError = User.create({
      firstName: raw.firstName,
      lastName: raw.lastName,
      username: raw.username,
      email: userEmailOrError.getValue(),
      password: userPasswordOrError.getValue(),
      role: role,
      phoneNumber: phoneNumber.getValue(),
      nif: userNif.getValue(),
      status: userStatus.getValue()
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence (user: User): any {
    const a = {
      domainId: user.id.toString(),
      email: user.email.value,
      password: user.password.value,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role.id.toValue(),
      phoneNumber: user.phoneNumber.value,
      nif: user.nif.value,
      status: user.status.value
    }
    return a;
  }
}