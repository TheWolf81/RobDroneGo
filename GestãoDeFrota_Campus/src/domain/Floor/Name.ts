import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface NameProps {
  value: string;
}

export class Name extends ValueObject<NameProps> {

  get value(): string {
    return this.props.value;
  }

  private constructor(props: NameProps) {
    super(props);
  }

  public static create(name: string): Result<Name> {
    if (name == null || name == undefined) {
      return Result.fail<Name>("Name cannot be null or undefined");
    }
    if (name.length > 255 && name.length != null) {
      return Result.fail<Name>("Name cannot be longer than 256 characters");
    }
    
    return Result.ok<Name>(new Name({value: name}));
  }
}