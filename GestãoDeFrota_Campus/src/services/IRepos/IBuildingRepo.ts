import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/Building/Building";
import { BuildingId } from "../../domain/Building/BuildingId";

export default interface IBuildingRepo extends Repo<Building> {
  save(building: Building): Promise<Building>;
  findByDomainId(buildingId: BuildingId | string): Promise<Building>;
  findAll(): Promise<Building[]>;
  exists(buildingId: BuildingId | string): Promise<boolean>;
    
  // findByIds (buildingIds: BuildingId[]): Promise<Building[]>;
  // saveCollection (buildings: Building[]): Promise<Building[]>;
  // removeByBuildingIds (buildings: BuildingId[]): Promise<any>
}