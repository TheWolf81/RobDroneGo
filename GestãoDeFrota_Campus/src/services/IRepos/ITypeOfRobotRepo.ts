import { Repo } from "../../core/infra/Repo";
import { TypeOfRobot } from "../../domain/TypeOfRobot/TypeOfRobot";
import { TypeOfRobotId } from "../../domain/TypeOfRobotId";
import { ITypeOfRobotDTO } from "../../dto/ITypeOfRobotDTO";

export default interface ITypeOfRobotRepo extends Repo<TypeOfRobot> {
    save(typeOfRobot: TypeOfRobot): Promise<TypeOfRobot>;
    findByDomainId (id: string): Promise<TypeOfRobot>;
    exists(typeOfRobotId: TypeOfRobotId | string): Promise<boolean>;
    findAll(): Promise<TypeOfRobot[]>;
    findAllType(): Promise<ITypeOfRobotDTO[]>;
}