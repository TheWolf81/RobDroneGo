import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IRoomService from './IServices/IRoomService';
import IRoomRepo from './IRepos/IRoomRepo';
import { IRoomDTO } from '../dto/IRoomDTO';
import { Room } from '../domain/Room/Room';
import { RoomMapper } from '../mappers/RoomMap';
import IFloorRepo from './IRepos/IFloorRepo';

@Service()
export default class RoomService implements IRoomService {
  constructor(
    @Inject(config.repos.room.name) private roomRepo: IRoomRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject('logger') private logger
  ) { }
  async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
    try {
      this.logger.silly('Creating room db record');
      const floor = await this.floorRepo.findByDomainId((roomDTO.floorID.toString()));
      if (!(floor === null)) {
        const room = RoomMapper.toDomain(roomDTO);

        if (!(floor.floorMap[room.props.x][room.props.y].tipo != '10' ||
          floor.floorMap[room.props.x][room.props.y].tipo != '11')) {
          return Result.fail<IRoomDTO>("Romm does not exist on map");
        }
        await this.roomRepo.save(room);

        const RobotDTOResult = RoomMapper.toDTO(room) as IRoomDTO;

        return Result.ok<IRoomDTO>(RobotDTOResult)
      }
      else {
        return Result.fail<IRoomDTO>("Floor does not exist");
      }
    } catch (e) {
      throw e;
    }
  }

  async listRooms(): Promise<Result<IRoomDTO[]>> {
    try {
      this.logger.silly('Listing rooms');
      const rooms = await this.roomRepo.getAll();
      const roomsDTO: IRoomDTO[] = [];
      rooms.forEach(room => {
        roomsDTO.push(RoomMapper.toDTO(room));
      });
      return Result.ok<IRoomDTO[]>(roomsDTO);
    } catch (e) {
      throw e;
    }
  }

}