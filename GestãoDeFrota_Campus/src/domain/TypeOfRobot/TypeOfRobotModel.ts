import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface ModelProps {
    value: string;
}

export class TypeOfRobotModel extends ValueObject<ModelProps> {
    private constructor(props: ModelProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(model: string): Result<TypeOfRobotModel> {

        if (model == null || model == undefined || model.length == 0) {
            return Result.fail<TypeOfRobotModel>("Model is required.");
        }

        if (model.length < 2 || model.length > 50) {
            return Result.fail<TypeOfRobotModel>("Model must be between 2 and 50 characters");
        }

        return Result.ok<TypeOfRobotModel>(new TypeOfRobotModel({ value: model }));
    }
}
