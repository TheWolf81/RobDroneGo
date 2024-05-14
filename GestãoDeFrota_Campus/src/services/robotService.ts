import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import { IRobotDTO } from '../dto/IRobotDTO';
import IRobotService from './IServices/IRobotService';
import { RobotMapper } from '../mappers/RobotMap';
import IRobotRepo from './IRepos/IRobotRepo';

import { TypeOfRobot } from '../domain/TypeOfRobot/TypeOfRobot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Robot } from '../domain/robot';
import { RobotId } from '../domain/RobotId';
import { ITypeOfRobotDTO } from '../dto/ITypeOfRobotDTO';
import ITypeOfRobotRepo from './IRepos/ITypeOfRobotRepo';

@Service()
export default class RobotService implements IRobotService {
  constructor(
    @Inject(config.repos.robot.name) private robotRepo : IRobotRepo,
    @Inject(config.repos.typeOfRobot.name) private typeOfRobotRepo :ITypeOfRobotRepo,
    @Inject('logger') private logger

  ) {}

  public async getDevice( robotId: string): Promise<Result<IRobotDTO>> {
    try {
      const robot = await this.robotRepo.findByDomainId(robotId);

      if (robot === null) {
        return Result.fail<IRobotDTO>("Device not found");
      }
      else {
        const RobotDTOResult = RobotMapper.toDTO( robot ) as IRobotDTO;
        return Result.ok<IRobotDTO>( RobotDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createDevice(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      //this.logger.silly('Creating user db record');
  const typeOferror1=this.typeOfRobotRepo.exists(robotDTO.typeOfRobotId.toString())
  
  if(await typeOferror1==false){
    return Result.fail<IRobotDTO>("typeOfRobot not found");
  }
      
    //mudar no futro 
    const deviceOrError  =await Robot.create(
        {
          nickname: robotDTO.nickname,
          StateOfRobot: robotDTO.StateOfRobot,
          typeOfRobotId : robotDTO.typeOfRobotId,
        }
      );
      
      if (deviceOrError.isFailure) {
        return Result.fail<IRobotDTO>(deviceOrError.errorValue());
      }

      const deviceResult = deviceOrError.getValue();

      await this.robotRepo.save(deviceResult);

      const RobotDTOResult = RobotMapper.toDTO( deviceResult ) as IRobotDTO;
      return Result.ok<IRobotDTO>( RobotDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateDevice(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      const robot = await this.robotRepo.findByDomainId(robotDTO.DomainId);

      if (robot === null) {
        return Result.fail<IRobotDTO>("Device not found");
      }
      else {
        robot.typeOfRobotId = robotDTO.typeOfRobotId;
        robot.StateOfRobot = robotDTO.StateOfRobot;
        await this.robotRepo.save(robot);

        const RobotDTOResult = RobotMapper.toDTO( robot ) as IRobotDTO;
        return Result.ok<IRobotDTO>( RobotDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getAllRobots(): Promise<Result<Array<IRobotDTO>>> {
    try {
      const robots = await this.robotRepo.findAll();
      
      if (robots === null) {
        return Result.fail<Array<IRobotDTO>>("There are no robots!");
      }
      else {
        
        const RobotDTOResult = robots.map( robots => RobotMapper.toDTO( robots ) as IRobotDTO);
        return Result.ok<Array<IRobotDTO>>( RobotDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }
  public async inibirRobot(DomainId: string|RobotId): Promise<Result<IRobotDTO>> {
    try {
      const robot = this.robotRepo.findByDomainId(DomainId);
      if (robot === null) {
        return Result.fail<IRobotDTO>("Device not found");
      }
      else {
        console.log((await robot).StateOfRobot);
        (await robot).StateOfRobot  = false;
        await this.robotRepo.save(await robot);

        const RobotDTOResult = RobotMapper.toDTO( await robot ) as IRobotDTO;
        return Result.ok<IRobotDTO>( RobotDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}




