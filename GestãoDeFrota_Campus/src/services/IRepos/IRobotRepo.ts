import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Repo } from "../../core/infra/Repo";
import { RobotId } from "../../domain/RobotId";
import { Robot } from "../../domain/robot"

export default interface IDeviceRepo extends Repo<Robot> {
  save(device: Robot): Promise<Robot>;
  findByDomainId (id: RobotId|string): Promise<Robot>;
  findAll(): Promise<Robot[]>;
  exists(robotId: RobotId | string): Promise<boolean>;
  // findByIds (deviceIds: DeviceId[]): Promise<Device[]>;
  // saveCollection (devices: Device[]): Promise<Device[]>;
  // removeByDeviceIds (devices: DeviceId[]): Promise<any>
}
