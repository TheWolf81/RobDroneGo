import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { Description } from "../Description";
import { Measurement } from "../Measurement";
import { BuildingCode } from "./BuildingCode";

interface BuildingProps {
    code: BuildingCode;
    description: Description;
    max_length: Measurement;
    max_width: Measurement;
}

export class Building extends AggregateRoot<BuildingProps>{
    get id(): UniqueEntityID {
        return this._id;
    }
    get code(): BuildingCode {
        return this.props.code;
    }
    get description(): Description {
        return this.props.description;
    }
    get max_length(): Measurement {
        return this.props.max_length;
    }
    get max_width(): Measurement {
        return this.props.max_width;
    }

    set code(value: BuildingCode) {
        this.props.code = value;
    }
    set description(value: Description) {
        this.props.description = value;
    }
    set max_length(value: Measurement) {
        this.props.max_length = value;
    }
    set max_width(value: Measurement) {
        this.props.max_width = value;
    }

    private constructor(props: BuildingProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props:BuildingProps, id?: UniqueEntityID): Result<Building> {
        const guardedProps = [
        { argument: props.code, argumentName: 'code' },
        { argument: props.description, argumentName: 'description' },
        { argument: props.max_length, argumentName: 'max_length' },
        { argument: props.max_width, argumentName: 'max_width' },
        ];
       
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
          return Result.fail<Building>(guardResult.message)
        }  
        else {
            //place for business logic
          const building = new Building({
            ...props
          }, id);
    
          return Result.ok<Building>(building);
        }
    }
}