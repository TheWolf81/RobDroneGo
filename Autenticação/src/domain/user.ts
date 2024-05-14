import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { Role } from "../domain/role";
import { UserPassword } from "./userPassword";
import { Guard } from "../core/logic/Guard";
import { PhoneNumber } from "./phoneNumber";
import { Nif } from "./nif";
import { Status } from "./status";


interface UserProps {
  firstName: string;
  lastName: string;
  username: string;
  email: UserEmail;
  password: UserPassword;
  role: Role;
  phoneNumber: PhoneNumber;
  nif: Nif;
  status: Status;
}

export class User extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): UserId {
    return UserId.caller(this.id)
  }

  get email (): UserEmail {
    return this.props.email;
  }

  set email (value: UserEmail) {
    this.props.email = value;
  }

  get firstName (): string {
    return this.props.firstName
  }

  set firstName (value: string) {
    this.props.firstName = value;
  }

  get lastName (): string {
    return this.props.lastName;
  }

  set lastName (value: string) {
    this.props.lastName = value;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  get role (): Role {
    return this.props.role;
  }
  
  set role (value: Role) {
      this.props.role = value;
  }

  get phoneNumber (): PhoneNumber {
    return this.props.phoneNumber;
  }

  set phoneNumber (value: PhoneNumber) {
    this.props.phoneNumber = value;
  }

  get nif (): Nif {
    return this.props.nif;
  }

  set nif (value: Nif) {
    this.props.nif = value;
  }

  get status (): Status {
    return this.props.status;
  }

  set status (value: Status) {
    this.props.status = value;
  }

  get username (): string {
    return this.props.username;
  }

  set username (value: string) {
    this.props.username = value;
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {

    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.username, argumentName: 'username' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.role, argumentName: 'role' },
      { argument: props.status, argumentName: 'status'}
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    }     
    else {
      const user = new User({
        ...props
      }, id);

      return Result.ok<User>(user);
    }
  }
}