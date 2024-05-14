import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface FloorNumberProps {
  value: number;
}

export class FloorNumber extends ValueObject<FloorNumberProps> {

  get value(): number {
    return this.props.value;
  }

  private constructor(props: FloorNumberProps) {
    super(props);
  }

  public static create(floorNumber: number): Result<FloorNumber> {
    if (floorNumber == null || floorNumber == undefined) {
      return Result.fail<FloorNumber>("Floor number cannot be null or undefined");
    }
    if (floorNumber < 0) {
      return Result.fail<FloorNumber>("Floor number cannot be negative");
    }
    
    return Result.ok<FloorNumber>(new FloorNumber({value: floorNumber}));
  }
}