
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { RobotId } from "../../domain/RobotId";
import { IRobotDTO } from "../../dto/IRobotDTO";

export default interface IRobotService  {
  createDevice(deviceDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  updateDevice(deviceDTO: IRobotDTO): Promise<Result<IRobotDTO>>;

  getDevice (deviceId: string): Promise<Result<IRobotDTO>>;
  inibirRobot (deviceId: string): Promise<Result<IRobotDTO>>;
}
