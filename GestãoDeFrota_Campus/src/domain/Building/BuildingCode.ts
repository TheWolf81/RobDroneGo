import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface BuildingCodeProps {
    value: string;
}
export class BuildingCode extends ValueObject<BuildingCodeProps> {
    private constructor(props: BuildingCodeProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(code : string): Result<BuildingCode> {
        if(!code || code.length === 0) {
            return Result.fail<BuildingCode>("Building code cannot be empty");
        }
        if(!/^[a-zA-Z0-9\s]{1,5}$/.test(code)){
            return Result.fail<BuildingCode>("code must be alphanumeric and have 5 characters or less");
        }
        return Result.ok<BuildingCode>(new BuildingCode({value: code}));
    }
}