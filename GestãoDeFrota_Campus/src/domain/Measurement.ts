import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";

interface MeasurementProps {
    value: number;
}


export class Measurement extends ValueObject<MeasurementProps>{
    private constructor(props: MeasurementProps) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(measurement: number): Result<Measurement> {
        if(!measurement || measurement <= 0) {
            return Result.fail<Measurement>("Measurement cannot be empty");
        }
        if(measurement <= 0){
            return Result.fail<Measurement>("Measurement can't be negative or 0");
        }
        return Result.ok<Measurement>(new Measurement({value: measurement}));
    }
}