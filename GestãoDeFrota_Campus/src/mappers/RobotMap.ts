import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Robot } from "../domain/robot";
import { IRobotDTO } from "../dto/IRobotDTO";


export class RobotMapper {
  public static toDTO(Robot: Robot): IRobotDTO {
    return {
      DomainId: Robot.id.toString(),
      nickname:Robot.nickname,
      typeOfRobotId: Robot.typeOfRobotId,
      StateOfRobot: Robot.StateOfRobot
    }as IRobotDTO;
  }

  public static async toDomain(_raw: any): Promise<Robot> {
    
    if(_raw.nickname==null){
      console.log("nickname is null");
      return null;
    }
    
    if(_raw.typeOfRobotId==null){
      console.log("typeOfRobotId is null");
      return null;
    }
    if(_raw.StateOfRobot==null){
      console.log("StateOfRobot is null");
      return null;
    }
    
    const RobotOrError = Robot.create({
      nickname:_raw.nickname,
      StateOfRobot: _raw.StateOfRobot,
      typeOfRobotId: _raw.typeOfRobotId,
    }, new UniqueEntityID(_raw.domainId));
    
    if (RobotOrError.isFailure) {
      console.log(RobotOrError.error);
      return Promise.reject(RobotOrError.error);
    }
    
    return Promise.resolve(RobotOrError.getValue());
  }
  public static toPersistence (Robot: Robot): any {
    const a = {
      domainId: Robot.id.toString(),
      nickname:Robot.nickname,
      typeOfRobotId: Robot.typeOfRobotId,
      StateOfRobot: Robot.StateOfRobot
    }
    return a;
  }
}
