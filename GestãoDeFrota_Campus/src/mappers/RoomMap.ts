import { Document, Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { IRoomPersistence } from "../dataschema/IRoomPersistence";
import { Room } from "../domain/Room/Room";
import { IRoomDTO } from "../dto/IRoomDTO";
import { Category } from "../domain/Room/Category";
import { Identifier } from "../domain/Room/Identifier";
import { Description } from "../domain/Description";

export class RoomMapper extends Mapper<Room> {

    public static toDTO( room: Room): IRoomDTO {
        return {
            id: room.id.toString(),
            floorID: room.floorID,
            category: room.category.value,
            identifier: room.identifier.value,
            description: room.description.value,
            x: room.x,
            y: room.y
        } as IRoomDTO;
    }

    public static toDomain (room: any | Model<IRoomPersistence & Document> ): Room {
        const CategoryOrError = Category.create(room.category);
        const IdentifierOrError = Identifier.create(room.identifier);
        const DescriptionOrError = Description.create(room.description);

        const roomOrError = Room.create(
            {
                floorID: room.floorID,
                category: CategoryOrError.getValue(),
                identifier: IdentifierOrError.getValue(),
                description: DescriptionOrError.getValue(),
                x: room.x,
                y: room.y
            },
            new UniqueEntityID(room.domainId)
        );

        roomOrError.isFailure ? console.log(roomOrError.error) : '';

        return roomOrError.isSuccess ? roomOrError.getValue() : null;
    }

    public static toPersistence (room: Room): any {
        return {
            domainId: room.id.toString(),
            floorID: room.floorID,
            category: room.category.value,
            identifier: room.identifier.value,
            description: room.description.value,
            x: room.x,
            y: room.y
        }
    }

}