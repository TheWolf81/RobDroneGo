import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface NifProps {
    value: string;
}

export class Nif extends ValueObject<NifProps> {
    get value (): string {
      return this.props.value;
    }
  
    private constructor (props: NifProps) {
        super(props);
    }

    public static create (nif: string): Result<Nif> {
        const nifIsNotEmpty = Guard.againstNullOrUndefined(nif, 'nif');
        if (!nifIsNotEmpty.succeeded) {
            return Result.fail<Nif>("Nif should not be empty.");
        }
            // use the porutguese nif regex
            if (!(nif.match(/^[0-9]{9}$/) != null)) {
                    return Result.fail<Nif>("Nif is not valid.");
            }
        return Result.ok<Nif>(new Nif({value: nif }));
    }
  }