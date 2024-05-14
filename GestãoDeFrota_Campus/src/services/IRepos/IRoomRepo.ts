import { Repo } from "../../core/infra/Repo";
import { Room } from "../../domain/Room/Room";

export default interface IRoomRepo extends Repo<Room> {
  save(room: Room): Promise<Room>;
  findByFloorId(floorId:string): Promise<Room[]>;
  getAll(): Promise<Room[]>;

    
  // findByIds (roomIds: RoomId[]): Promise<Room[]>;
  // saveCollection (rooms: Room[]): Promise<Room[]>;
  // removeByRoomIds (rooms: RoomId[]): Promise<any>;
}