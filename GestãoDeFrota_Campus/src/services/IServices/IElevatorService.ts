import {Result} from "../../core/logic/Result";
import {IElevatorDTO} from "../../dto/IElevatorDTO";

export default interface IElevatorService  {
  createElevator(deviceDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  editElevator(id: string, ElevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>
  getElevatorsInBuilding(buildingId: string): Promise<Result<IElevatorDTO[]>>;

}