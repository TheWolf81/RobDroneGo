import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface AreaProps {
  value: number;
}

export class Area extends ValueObject<AreaProps> {
  private constructor(props: AreaProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  

  public static create(area: number): Result<Area> {
    if (area <= 0) {
      return Result.fail<Area>("Area cannot be negative or zero");
    }
    if (area == null || area == undefined) {
      return Result.fail<Area>("Area cannot be null or undefined");
    }
    return Result.ok<Area>(new Area({value: area}));
  }
}
