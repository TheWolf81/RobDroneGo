import { Inject, Service } from "typedi";
import ITypeOfRobotService from "./IServices/ITypeOfRobotService";
import { Result } from "../core/logic/Result";
import { ITypeOfRobotDTO } from "../dto/ITypeOfRobotDTO";
import config from "../../config";
import { TypeOfRobot } from "../domain/TypeOfRobot/TypeOfRobot";
import { TypeOfRobotMap } from "../mappers/TypeOfRobotMap";
import ITypeOfRobotRepo from "./IRepos/ITypeOfRobotRepo";

@Service()
export default class TypeOfRobotService implements ITypeOfRobotService {

    constructor(
        @Inject('logger') private logger,
        @Inject(config.repos.typeOfRobot.name) private typeOfRobotRepo: ITypeOfRobotRepo
    ) { }

    async getAll(): Promise<ITypeOfRobotDTO[]> {
        const all = this.typeOfRobotRepo.findAllType();
        if (all === null) {
            return null;
        }
        return all;
    }

    async createTypeOfRobot(typeOfRobotDTO: ITypeOfRobotDTO): Promise<Result<ITypeOfRobotDTO>> {
        try {
            const typeOfRobot = TypeOfRobotMap.toDomain(typeOfRobotDTO);

            if (typeOfRobot == null) {
                return Result.fail<ITypeOfRobotDTO>("Invalid State");
            }

            this.logger.silly('Creating typeOfRobot db record');
            await this.typeOfRobotRepo.save(typeOfRobot);

            const typeOfRobotDTOResult = TypeOfRobotMap.toDTO(typeOfRobot) as ITypeOfRobotDTO;

            return Result.ok<ITypeOfRobotDTO>(typeOfRobotDTOResult);
        } catch (e) {
            throw e;
        }
    }

}


