import { Result } from "../../core/logic/Result";
import { TypeOfRobot } from "../../domain/TypeOfRobot/TypeOfRobot";
import { ITypeOfRobotDTO } from "../../dto/ITypeOfRobotDTO";

export default interface ITypeOfRobotService  {
    createTypeOfRobot(typeOfRobotDTO: ITypeOfRobotDTO): Promise<Result<ITypeOfRobotDTO>>;
    getAll(): Promise<ITypeOfRobotDTO[]>;
}