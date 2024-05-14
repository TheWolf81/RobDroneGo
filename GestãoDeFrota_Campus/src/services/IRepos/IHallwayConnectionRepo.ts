import { Repo } from "../../core/infra/Repo";
import { HallwayConnection } from "../../domain/HallwayConnection";
import { HallwayConnectionID } from "../../domain/HallwayConnectionID";
import { IHallwayConnectionDTO } from "../../dto/IHallwayConnectionDTO";

export default interface IHallwayConnectionRepo extends Repo<HallwayConnection>{
    save(hallwayConnection: HallwayConnection): Promise<HallwayConnection>;
    findByDomainId(hallwayConnectionId: HallwayConnectionID | string): Promise<HallwayConnection>;
    findhallwayConnectionbetwenBuildings(buildingId1:string,buildingId2:string): Promise<IHallwayConnectionDTO[]>;
    findAll(): Promise<IHallwayConnectionDTO[]>;
}