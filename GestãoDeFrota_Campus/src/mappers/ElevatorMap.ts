import { Document, Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";

import { IElevatorPersistence } from "../dataschema/IElevatorPersistence";
import { Elevator } from "../domain/Elevator/Elevator";
import { IElevatorDTO } from "../dto/IElevatorDTO";
import { Description } from "../domain/Description";

export class ElevatorMapper extends Mapper<Elevator>{
    public static toDTO(elevator: Elevator): IElevatorDTO {
        return {
            id: elevator.id.toString(),
            building_id: elevator.building_id,
            floors_servedId: elevator.floors_servedId,
            description: elevator.description.value,
        } as IElevatorDTO;
    }

    public static toDomain(elevator: any | Model<IElevatorPersistence & Document>): Elevator {
        const descriptionOrError = Description.create(elevator.description);
        const elevatorOrError = Elevator.create(
            {
                building_id: elevator.building_id,
                floors_servedId: elevator.floors_servedId,
                description: descriptionOrError.getValue(),
            },
            new UniqueEntityID(elevator.domainId)
        );

        elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';

        return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
    }

    public static toPersistence(elevator: Elevator): any {
        return {
            domainId: elevator.id.toString(),
            building_id: elevator.building_id,
            floors_servedId: elevator.floors_servedId,
            description: elevator.description.value,
        }
    }
}