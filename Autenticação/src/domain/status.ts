import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface StatusProps {
    value: string;
}

export class Status extends ValueObject<StatusProps> {
    get value (): string {
      return this.props.value;
    }
  
    private constructor (props: StatusProps) {
        super(props);
    }

    public static create (status: string): Result<Status> {
        const statusIsNotEmpty = Guard.againstNullOrUndefined(status, 'status');
        if (!statusIsNotEmpty.succeeded) {
            return Result.fail<Status>("Status should not be empty.");
        }
        else if (!["Approved", "Denied", "Requested"].includes(status)) {
            return Result.fail<Status>('Must provide a valid status');
            }
        return Result.ok<Status>(new Status({value: status }));
    }
  }