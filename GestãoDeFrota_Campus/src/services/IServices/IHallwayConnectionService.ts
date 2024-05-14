import { Result } from "../../core/logic/Result";
import { HallwayConnection } from "../../domain/HallwayConnection";
import { IHallwayConnectionDTO } from "../../dto/IHallwayConnectionDTO";

export default interface IHallwayConnectionService {
    createHallwayConnection(dto: IHallwayConnectionDTO): Promise<Result<IHallwayConnectionDTO>>;
    editHallwayConnection(FloorId1: string, FloorId2: string, DomainId: string): Promise<Result<IHallwayConnectionDTO>>;
    allHallwayConnectionBetwentwoBuildings(BulidingId1: string, BulidingId2: string): Promise<Result<IHallwayConnectionDTO[]>>
    ListarEdificiosPassagens(): Promise<string[]>;
    getAllHallways(): Promise<HallwayConnection[]>;
    getBuildingsFloorsName(domainId: string):Promise<any>;
}
