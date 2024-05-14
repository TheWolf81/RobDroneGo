import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { ITypeOfRobotPersistence } from "../dataschema/ITypeOfRobotPersistence";
import { TypeOfRobot } from "../domain/TypeOfRobot/TypeOfRobot";
import { ITypeOfRobotDTO } from "../dto/ITypeOfRobotDTO";
import { Document, Model } from "mongoose";
import { Brand } from "../domain/TypeOfRobot/Brand";
import { TypeOfRobotModel } from "../domain/TypeOfRobot/TypeOfRobotModel";
import { TaskType } from "../domain/TypeOfRobot/TaskType";

export class TypeOfRobotMap extends Mapper<TypeOfRobot> {

    public static toDTO(typeOfRobot: TypeOfRobot): ITypeOfRobotDTO {

        const taskType: string[] = [];
        for (let i = 0; i < typeOfRobot.props.taskType.length; i++) {
            taskType.push(typeOfRobot.props.taskType[i].props.value);
        }

        return {
            domain_id: typeOfRobot.id.toString(),
            brand: typeOfRobot.brand.value,
            model: typeOfRobot.model.value,
            taskType: taskType
        }
    }

    public static toDomain(typeOfRobot: any | Model<ITypeOfRobotPersistence & Document>): TypeOfRobot {
        const brandOrError = Brand.create(typeOfRobot.brand);
        const modelOrError = TypeOfRobotModel.create(typeOfRobot.model);
        
        const taskType: TaskType[] = [];
        for (let i = 0; i < typeOfRobot.taskType.length; i++) {
            const taskTypeOrError = TaskType.create(typeOfRobot.taskType[i]);
            if (taskTypeOrError.isFailure) {
                console.log(taskTypeOrError.error);
                return null;
            }
            taskType.push(taskTypeOrError.getValue());
        }

        if (brandOrError.isFailure) {
            console.log(brandOrError.error);
            return null;
        }

        if (modelOrError.isFailure) {
            console.log(modelOrError.error);
            return null;
        }

        const typeOfRobotOrError = TypeOfRobot.create(
            {
                brand: brandOrError.getValue(),
                model: modelOrError.getValue(),
                taskType: taskType
            },
            new UniqueEntityID(typeOfRobot.domain_id)
        );

        typeOfRobotOrError.isFailure ? console.log(typeOfRobotOrError.error) : '';
        return typeOfRobotOrError.isSuccess ? typeOfRobotOrError.getValue() : null;

    }

    public static toPersistence(typeOfRobot: TypeOfRobot): ITypeOfRobotPersistence {
        const taskType: string[] = [];

        for (let i = 0; i < typeOfRobot.props.taskType.length; i++) {
            taskType.push(typeOfRobot.props.taskType[i].props.value);
        }
        return {
            domainId: typeOfRobot.id.toString(),
            brand: typeOfRobot.brand.value,
            model: typeOfRobot.model.value,
            taskType: taskType
        }
    }

}
