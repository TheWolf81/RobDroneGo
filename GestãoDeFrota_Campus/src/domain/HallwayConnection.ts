import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";

import { Guard } from "../core/logic/Guard";


interface HallwayConnectionProps {
    BuildingId1: string;
    BuildingId2: string;
    FloorId1: string;
    FloorId2: string;
    x1:number;
    y1:number;
    x2:number;
    y2:number;
  }

  export class HallwayConnection extends AggregateRoot<HallwayConnectionProps>{

    get id(): UniqueEntityID {
        return this._id;
      }
      get BuildingId1(): string{
        return this.props.BuildingId1;
      }
        get BuildingId2(): string{
            return this.props.BuildingId2;
        }
        get FloorId1(): string{
            return this.props.FloorId1;
        }
        get FloorId2(): string{
            return this.props.FloorId2;
        }
        set BuildingId1(value:string){
             this.props.BuildingId1=value;
        }
        set BuildingId2(value:string){
            this.props.BuildingId2=value;
        }
        set FloorId1(value:string){
            this.props.FloorId1=value;
        }
        set FloorId2(value:string){
            this.props.FloorId2=value;
        }
        get x1(): number{
            return this.props.x1;
        }
        get y1(): number{
            return this.props.y1;
        }
        get x2(): number{
            return this.props.x2;
        }
        get y2(): number{
            return this.props.y2;
        }
        set x1(value:number){
            this.props.x1=value;
        }
        set y1(value:number){
            this.props.y1=value;
        }
        set x2(value:number){
            this.props.x2=value;
        }
        set y2(value:number){
            this.props.y2=value;
        }

    private constructor (props: HallwayConnectionProps, id?: UniqueEntityID) {
        super(props, id);

    }

    public static create (props: HallwayConnectionProps, id?: UniqueEntityID): Result<HallwayConnection> {
        const guardedProps = [
            { argument: props.BuildingId1, argumentName: 'BuildingId1' },
            { argument: props.BuildingId2, argumentName: 'BuildingId2' },
            { argument: props.FloorId1, argumentName: 'FloorId1' },
            { argument: props.FloorId2, argumentName: 'FloorId2' },
            { argument: props.x1, argumentName: 'x1' },
            { argument: props.y1, argumentName: 'y1' },
            { argument: props.x2, argumentName: 'x2' },
            { argument: props.y2, argumentName: 'y2' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result.fail<HallwayConnection>(guardResult.message);
        }

        const hallwayConnection = new HallwayConnection({
            ...props
        }, id);
        return Result.ok<HallwayConnection>(hallwayConnection);
    }

        
  }