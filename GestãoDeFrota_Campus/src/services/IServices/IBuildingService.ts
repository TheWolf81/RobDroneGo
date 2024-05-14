import {Result} from "../../core/logic/Result";
import {IBuildingDTO} from "../../dto/IBuildingDTO";

export default interface IBuildingService  {
  createBuilding(deviceDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  editBuilding(id: string, buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>
  getAllBuildings(): Promise<Result<IBuildingDTO[]>>;
  getBuildingsByMaxAndMinFloors(min: number, max: number): Promise<Result<IBuildingDTO[]>>;
  getBuildingById(id: string): Promise<Result<IBuildingDTO>>;
}