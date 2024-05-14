import { Inject, Service } from "typedi";
import IBuildingService from "./IServices/IBuildingService";
import { Result } from "../core/logic/Result";
import IBuidingRepo from "./IRepos/IBuildingRepo";
import { IBuildingDTO } from "../dto/IBuildingDTO";
import config from "../../config";
import { BuildingMapper } from "../mappers/BuildingMap";

import IFloorRepo from "./IRepos/IFloorRepo";


@Service()
export default class BuildingService implements IBuildingService {
  constructor(
    @Inject('logger') private logger,
    @Inject(config.repos.building.name) private buildingRepo: IBuidingRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
  ) { }
  async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const building = BuildingMapper.toDomain(buildingDTO);

      if(building == null) {
        return Result.fail<IBuildingDTO>("Invalid State");
      }

      this.logger.silly('Creating building db record');

      await this.buildingRepo.save(building);

      const RobotDTOResult = BuildingMapper.toDTO(building) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(RobotDTOResult)
    } catch (e) {
      throw e;
    }
  }

  async editBuilding(id: string, buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByDomainId(id);  
      if (building == null) {
        return Result.fail<IBuildingDTO>("Building not found");
      }
      const dummyBuilding = BuildingMapper.toDomain(buildingDTO);

      if (dummyBuilding == null) {
        return Result.fail<IBuildingDTO>("Invalid State");
      }

      building.code = dummyBuilding.code;
      building.description = dummyBuilding.description;
      building.max_length = dummyBuilding.max_length;
      building.max_width = dummyBuilding.max_width;
      await this.buildingRepo.save(building);
      const BuildingDTOResult = BuildingMapper.toDTO(building) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(BuildingDTOResult)
    } catch (e) {
      throw e;
    }
  }

  async getAllBuildings(): Promise<Result<IBuildingDTO[]>> {
    try {
        const buildings = await this.buildingRepo.findAll();
        this.logger.silly('Getting all building db records');

        if (!buildings) {
            return Result.fail<IBuildingDTO[]>("No buildings found");
        }

        const buildingDTOs = buildings.map(building => BuildingMapper.toDTO(building)) as IBuildingDTO[];
        return Result.ok<IBuildingDTO[]>(buildingDTOs);
    } catch (e) {
        throw e;
    }
}

  async getBuildingsByMaxAndMinFloors(min: number, max: number): Promise<Result<IBuildingDTO[]>> {
    try {

      if (min > max || min < 0 || max < 0) return Result.fail<IBuildingDTO[]>("Invalid range");

      const allBuildings = await this.buildingRepo.findAll();
      const buildingDTOs: IBuildingDTO[] = [];

      if (!allBuildings) {
        return Result.fail<IBuildingDTO[]>("No buildings found");
      }
      
      for (const building of allBuildings) {
        const floors = await this.floorRepo.findByBuildingId(building.id.toString());
        if (floors.length >= min && floors.length <= max) {
          buildingDTOs.push(BuildingMapper.toDTO(building) as IBuildingDTO);
        }
      }

      if (buildingDTOs.length == 0) {
        return Result.fail<IBuildingDTO[]>("No buildings found for this range");
      }

      return Result.ok<IBuildingDTO[]>(buildingDTOs);
    } catch (e) {
      throw e;
    }
  }

  async getBuildingById(id: string): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByDomainId(id.substring(1));
      if (!building) {
        return Result.fail<IBuildingDTO>("Building not found");
      }
      const buildingDTO = BuildingMapper.toDTO(building) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTO);
    } catch (e) {
      throw e;
    }
  }

}
