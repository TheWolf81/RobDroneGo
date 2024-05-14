import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { Description } from "../Description";

interface ElevatorProps {
    building_id: string;
    floors_servedId: string[];
    description: Description;
}

export class Elevator extends AggregateRoot<ElevatorProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get building_id(): string {
        return this.props.building_id;
    }
    get floors_servedId(): string[] {
        return this.props.floors_servedId;
    }

    get description(): Description {
        return this.props.description;
    }

    set building_id(value: string) {
        this.props.building_id = value;
    }
    set floors_servedId(value: string[]) {
        this.props.floors_servedId = value;
    }

    set description(value: Description) {
        this.props.description = value;
    }

    private constructor(props: ElevatorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {
        const guardedProps = [
            { argument: props.building_id, argumentName: 'building_id' },
            { argument: props.floors_servedId, argumentName: 'floors_servedId' },
            { argument: props.description, argumentName: 'description' },
        ];
        if(props.building_id == null || props.building_id == undefined || props.building_id == "")
            return Result.fail<Elevator>("Building id is required");
        if(props.floors_servedId == null || props.floors_servedId == undefined || props.floors_servedId.length == 0)
            return Result.fail<Elevator>("Floors served is required");

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if(!guardResult.succeeded) {
            return Result.fail<Elevator>(guardResult.message);
        } else {
            const floor = new Elevator({
                ...props
            }, id);

            return Result.ok<Elevator>(floor);
        }

    }


}
