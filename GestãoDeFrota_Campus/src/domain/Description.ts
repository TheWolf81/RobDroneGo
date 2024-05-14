import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";


interface DescriptionProps {
    value: string;
}

export class Description extends ValueObject<DescriptionProps> {
    private constructor(props: DescriptionProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(description: string): Result<Description> {
        if(description == null || description == undefined){
            return Result.fail<Description>("Description cannot be null or undefined");
        }
        if(description.length > 255){
            return Result.fail<Description>("Description is too long");
        }
        return Result.ok<Description>(new Description({value: description}));
    }
}