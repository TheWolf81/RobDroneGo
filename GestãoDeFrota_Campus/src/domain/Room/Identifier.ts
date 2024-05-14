import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface IdentifierProps {
    value: string;
}
export class Identifier extends ValueObject<IdentifierProps>
{
    private constructor(props: IdentifierProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(identifier : string): Result<Identifier> {
        if(!identifier || identifier.length === 0) {
            return Result.fail<Identifier>('Must provide a identifier');
        }
        else if (!/^[A-Z]\d{3}$/.test(identifier)) {
            return Result.fail<Identifier>('Invalid identifier format. It must be one uppercase letter followed by three digits.');
       }
        
        return Result.ok<Identifier>(new Identifier({ value: identifier }));
    }
}