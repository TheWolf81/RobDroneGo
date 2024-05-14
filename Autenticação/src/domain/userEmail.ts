
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: UserEmailProps) {
    super(props);
  }

  public static create (email: string): Result<UserEmail> {
    const guardResult = Guard.againstNullOrUndefined(email, 'email');
    if (!guardResult.succeeded) {
      return Result.fail<UserEmail>(guardResult.message);
    } else {
      /*const emailFormat = /^[a-zA-Z0-9]+@isep.ipp.pt$/;
      if (!emailFormat.test(email)) {
        return Result.fail<UserEmail>('E-mail must follow this format: XXXXXXX@isep.ipp.pt');
      }*/
      const emailFormat = /^([^@]+@[^@]+\.[a-zA-Z]{2,})$/;

      if (!emailFormat.test(email)) {
        return Result.fail<UserEmail>('Email must contain only one @ and one . character');
      }      
      
      return Result.ok<UserEmail>(new UserEmail({ value: email }))
    }
  }

}