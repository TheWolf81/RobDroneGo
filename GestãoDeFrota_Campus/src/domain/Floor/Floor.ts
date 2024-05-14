import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

import { Area } from "./Area";
import { Description } from "../Description";
import { Name } from "./Name";
import { FloorNumber } from "./FloorNumber";

export interface FloorMap {
    obj_id: string;
    tipo: string;
    neighbours: string[];
}

interface FloorProps {
    building_id: string;
    floorNumber: FloorNumber;
    description: Description;
    area: Area;
    name: Name;
    floorMap: FloorMap[][];
}

export class Floor extends AggregateRoot<FloorProps>{
    get id(): UniqueEntityID {
        return this._id;
    }

    get building_id(): string {
        return this.props.building_id;
    }

    get floorNumber(): FloorNumber {
        return this.props.floorNumber;
    }

    get description(): Description {
        return this.props.description;
    }

    get area(): Area {
        return this.props.area;
    }

    get floorMap(): FloorMap[][] {
        return this.props.floorMap;
    }

    get name(): Name {
        return this.props.name;
    }

    set building_id(value: string) {
        this.props.building_id = value;
    }

    set floorNumber(value: FloorNumber) {
        this.props.floorNumber = value;
    }

    set description(value: Description) {
        this.props.description = value;
    }

    set area(value: Area) {
        this.props.area = value;
    }

    set floorMap(value: FloorMap[][]) {
        this.props.floorMap = value;
    }

    set name(value: Name) {
        this.props.name = value;
    }

    private constructor(props: FloorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: FloorProps, id?: UniqueEntityID): Result<Floor> { 

        const guardedProps = [
            { argument: props.building_id, argumentName: 'building_id' },
            { argument: props.floorNumber, argumentName: 'floorNumber' },
            { argument: props.description, argumentName: 'description' },
            { argument: props.area, argumentName: 'area' },
            { argument: props.name, argumentName: 'name'},
            { argument: props.floorMap, argumentName: 'floorMap' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        
        if(!guardResult.succeeded) {
            return Result.fail<Floor>(guardResult.message);
        }
        else if(props.building_id.trim().length === 0 || props.building_id.includes(" ")) {
            return Result.fail<Floor>("Building id can't be empty or contain spaces"); 
        }
        else {
            const floor = new Floor({
                ...props
            }, id);

            return Result.ok<Floor>(floor);
        }
    }
}

