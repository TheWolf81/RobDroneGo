import { Service, Inject } from "typedi";
import { Document, FilterQuery, Model } from 'mongoose';
import IRoomRepo from '../services/IRepos/IRoomRepo';
import { Room } from '../domain/Room/Room';
import { RoomMapper } from '../mappers/RoomMap';
import { IRoomPersistence } from "../dataschema/IRoomPersistence";
import { RoomId } from "../domain/Room/RoomId";

@Service()
export default class RoomRepo implements IRoomRepo {
    private models: any;

    constructor(
        @Inject('roomSchema') private roomSchema: Model<IRoomPersistence & Document>,
        @Inject('logger') private logger

    ) { }

    public async findByFloorId(floorId: string): Promise<Room[]> {
        try {
            const query = { domainId: floorId };
            const roomRecord = await this.roomSchema.find(query as FilterQuery<IRoomPersistence & Document>);

            return roomRecord.map(roomRecord => RoomMapper.toDomain(roomRecord));
        } catch (err) {
            throw err;
        }

    }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(roomId: RoomId | string): Promise<boolean> {
        const idX = roomId instanceof RoomId ? (<RoomId>roomId).id.toValue() : roomId;
        const query = { domainId: idX };
        const roomDocument = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);
        return !!roomDocument === true;
    }

    public async save(room: Room): Promise<Room> {

        const query = { domainId: room.id.toString() };

        const roomDocument = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);

        try {
            if (roomDocument === null) {
                const rawRoom: any = RoomMapper.toPersistence(room);
                const roomCreated = await this.roomSchema.create(rawRoom);

                return RoomMapper.toDomain(roomCreated);
            } else {
                //update
                roomDocument.domainId = room.id.toString();
                roomDocument.floorID = room.floorID;
                roomDocument.category = room.category.value;
                roomDocument.identifier = room.identifier.value;
                roomDocument.description = room.description.value;
                await roomDocument.save();

                return RoomMapper.toDomain(roomDocument);
            }
        } catch (err) {
            throw err;
        }
    }

    public async getAll(): Promise<Room[]> {
        try {
            const roomRecord = await this.roomSchema.find();

            return roomRecord.map(roomRecord => RoomMapper.toDomain(roomRecord));
        } catch (err) {
            throw err;
        }
    }
}