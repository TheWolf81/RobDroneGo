import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface PhoneNumberProps {
    value: string;
  }

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
    get value (): string {
      return this.props.value;
    }
  
    private constructor (props: PhoneNumberProps) {
      super(props);
    }
  
    public static create (phoneNumber: string): Result<PhoneNumber> {
      const phoneNumberIsNotEmpty = Guard.againstNullOrUndefined(phoneNumber, 'phoneNumber');
      if (!phoneNumberIsNotEmpty.succeeded) {
        return Result.fail<PhoneNumber>("Phone number should not be empty.");
      }
      // use the porutguese phone number regex
      if (!(phoneNumber.match(/^(?:\+351)?[6-9]\d{8}$/) != null)) {
        return Result.fail<PhoneNumber>("Phone number is not valid.");
      }
      return Result.ok<PhoneNumber>(new PhoneNumber({value: phoneNumber}));
    }
  }