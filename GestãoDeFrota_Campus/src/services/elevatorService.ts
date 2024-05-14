import { Inject, Service } from "typedi";
import config from "../../config";
import IElevatorService from "./IServices/IElevatorService";
import IElevatorRepo from "./IRepos/IElevatorRepo";
import { IElevatorDTO } from "../dto/IElevatorDTO";
import { Result } from "../core/logic/Result";
import { Elevator } from "../domain/Elevator/Elevator";
import { ElevatorMapper } from "../mappers/ElevatorMap";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import IFloorRepo from "./IRepos/IFloorRepo";
import { FloorMapper } from "../mappers/FloorMap";
import { Description } from "../domain/Description";

@Service()
export default class ElevatorService implements IElevatorService {
  constructor(
    @Inject('logger') private logger,
    @Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo
  ) { }

  async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      this.logger.silly('Creating elevator db record');
      if(await this.buildingRepo.findByDomainId(elevatorDTO.building_id.toString()) === null) {
        console.log("Provided Building does not exist");
        return Result.fail<IElevatorDTO>("Provided Building does not exist");
      }
      //make sure all floors exist and are in the same building
      for (let i = 0; i < elevatorDTO.floors_servedId.length; i++) {
        if(await this.floorRepo.findByDomainId(elevatorDTO.floors_servedId[i]) === null) {
          console.log("Provided Floor does not exist")
          return Result.fail<IElevatorDTO>("Provided Floor does not exist");
        }
        if((await this.floorRepo.findByDomainId(elevatorDTO.floors_servedId[i])).building_id !== elevatorDTO.building_id) {
          console.log("Provided Floors are not in the same building")
          return Result.fail<IElevatorDTO>("Provided Floors are not in the same building");
        }
      }    
      const elevator = await ElevatorMapper.toDomain(elevatorDTO);
      this.logger.silly('Creating elevator db record');

      await this.elevatorRepo.save(elevator);
      const ElevatorDTOResult = ElevatorMapper.toDTO(elevator) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(ElevatorDTOResult)
    } catch (e) {
      throw e;
    }
      
  }

  async editElevator(id: string, ElevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByDomainId(id.toString().substring(1));

      if (elevator == null) {
        return Result.fail<IElevatorDTO>("Elevator not found");
      }
      for (let i = 0; i < ElevatorDTO.floors_servedId.length; i++) {
        if(await this.floorRepo.findByDomainId(ElevatorDTO.floors_servedId[i]) === null) {
          console.log("Provided Floor does not exist")
          return Result.fail<IElevatorDTO>("Provided Floor does not exist");
        }
        if((await this.floorRepo.findByDomainId(ElevatorDTO.floors_servedId[i])).building_id !== elevator.building_id) {
          console.log("Provided Floors are not in the same building")
          return Result.fail<IElevatorDTO>("Provided Floors are not in the same building");
        }
      }
      elevator.floors_servedId = ElevatorDTO.floors_servedId;
      const desc = Description.create(ElevatorDTO.description);
      elevator.description = desc.getValue();
      await this.elevatorRepo.save(elevator);
      const ElevatorDTOResult = ElevatorMapper.toDTO(elevator) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(ElevatorDTOResult);
    } catch (e) {
      throw e;
    }
      
  }

  async getElevatorsInBuilding(buildingId: string): Promise<Result<IElevatorDTO[]>> {
    try {
      
      const elevators = await this.elevatorRepo.findByBuildingId(buildingId.toString().substring(1));
      if (elevators == null) {
        return Result.fail<IElevatorDTO[]>("Elevators not found");
      }
      return Result.ok<IElevatorDTO[]>(elevators);
    } catch (e) {
      throw e;
    }
      
  }

}