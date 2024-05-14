import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { IFloorDTO } from "../../dto/IFloorDTO";
import { IMapDTO } from "../../dto/IMapDTO";

export default interface IFloorService  {
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  updateFloor(id: string, floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  getFloorsByBuildingId(buildingId: string): Promise<Result<IFloorDTO[]>>;
  //getFloor (floorId: string): Promise<Result<IFloorDTO>>;
  loadMap(id: string, mapDTO: IMapDTO): Promise<Result<IFloorDTO>>;
  getFloors(): Promise<Result<Array<IFloorDTO>>>;
  getFloorMap(floorDomainId:string): Promise<any>
}