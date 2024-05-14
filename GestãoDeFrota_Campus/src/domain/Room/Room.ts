import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { Category } from "./Category";
import { Identifier } from "./Identifier";
import { Description } from "../Description";

interface RoomProps {
    floorID: string;
    category: Category;
    identifier: Identifier;
    description: Description;
    x: number;
    y: number;
}

export class Room extends AggregateRoot<any> {
  get id (): UniqueEntityID {
    return this._id;
  }
  get floorID (): string {
    return this.props.floorID;
  }

  get category (): Category {
    return this.props.category;
  }

  get identifier (): Identifier {
    return this.props.identifier;
  }

  get description (): Description {
    return this.props.description;
  }
  set floorID (floorID: string) {
    this.props.floorID = floorID;
  }

  set category (category: Category) {
    this.props.category = category;
  }

  set identifier (identifier: Identifier) {
    this.props.identifier = identifier;
  }

  set description (description: Description) {
    this.props.description = description;
  }
  get x (): number {
    return this.props.x;
  }
  get y (): number {
    return this.props.y;
  }
  set x (x: number) {
    this.props.x = x;
  }
  set y (y: number) {
    this.props.y = y;
  }


  private constructor (props: RoomProps,id?: UniqueEntityID) {
    super(props, id);
  }

    public static create (props: RoomProps, id?: UniqueEntityID): Result<Room> {
        const guardedProps = [
          { argument: props.floorID, argumentName: 'floorID' },
          { argument: props.category, argumentName: 'category' },
          { argument: props.description, argumentName: 'description' },
          { argument: props.identifier, argumentName: 'identifier' },
          { argument: props.x, argumentName: 'x' },
          { argument: props.y, argumentName: 'y' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
          
          return Result.fail<Room>(guardResult.message)
        }  
        else if (!props.floorID) {
            return Result.fail<Room>('Must provide a floorID');
        }      
        const room = new Room({ ... props }, id);
        return Result.ok<Room>(room);
      
    }


}