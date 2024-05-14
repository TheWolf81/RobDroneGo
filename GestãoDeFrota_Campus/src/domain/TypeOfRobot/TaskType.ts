import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface TaskTypeProps {
  value: string;
}

export class TaskType extends ValueObject<TaskTypeProps> {
    private constructor(props: TaskTypeProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(taskType: string): Result<TaskType> {
        if (taskType == null || taskType == undefined) {
            return Result.fail<TaskType>("TaskType cannot be null or undefined");
        }
    
        const allowedTaskTypes = ["pickup&delivery", "surveillance"];

        if (!allowedTaskTypes.includes(taskType)) {
            return Result.fail<TaskType>("TaskType must be either pickup&delivery or surveillance");
        }

        return Result.ok<TaskType>(new TaskType({ value: taskType }));
    }

}
