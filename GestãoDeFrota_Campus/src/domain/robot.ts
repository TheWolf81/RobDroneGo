import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RobotProps {
  nickname:string;
  typeOfRobotId: string;
  StateOfRobot: boolean;
}

export class Robot extends AggregateRoot<RobotProps>{
  get id(): UniqueEntityID {
    return this._id;
  }
  get nickname():string{
    return this.props.nickname;
  }
  get typeOfRobotId(): string {
    return this.props.typeOfRobotId;
  }

  set typeOfRobotId(value: string) {
    this.props.typeOfRobotId = value;
  }
  get StateOfRobot(): boolean {
    return this.props.StateOfRobot;
  }
  set StateOfRobot(value: boolean) {
    this.props.StateOfRobot = value;
  }
  set nickname(value:string){
    this.props.nickname=value;
  }
  private constructor(props: RobotProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create (props:RobotProps, id?: UniqueEntityID): Result<Robot> {
    const guardedProps = [
      { argument: props.nickname, argumentName: 'nickname' },
      { argument: props.StateOfRobot, argumentName: 'StateOfRobot' },
      { argument: props.typeOfRobotId, argumentName: 'typeOfRobotId' },
    ];
   
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      return Result.fail<Robot>(guardResult.message)
    }  else {
      const robot = new Robot({
        ...props
      }, id);

      return Result.ok<Robot>(robot);
    }
  }
}