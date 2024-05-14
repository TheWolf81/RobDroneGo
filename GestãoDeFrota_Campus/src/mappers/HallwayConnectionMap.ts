import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { HallwayConnection } from "../domain/HallwayConnection";
import { IHallwayConnectionDTO } from "../dto/IHallwayConnectionDTO";

export class HallwayConnectionMapper {
    public static toDTO(hallwayConnection: HallwayConnection): IHallwayConnectionDTO {
      return {
        DomainId: hallwayConnection.id.toString(),
        BuildingId1: hallwayConnection.BuildingId1,
        BuildingId2: hallwayConnection.BuildingId2,
        FloorId1: hallwayConnection.FloorId1,
        FloorId2: hallwayConnection.FloorId2,
        x1: hallwayConnection.x1,
        y1: hallwayConnection.y1,
        x2: hallwayConnection.x2,
        y2: hallwayConnection.y2
      } as IHallwayConnectionDTO  ;
    }
  
    public static fromDTO(dto: IHallwayConnectionDTO):Promise< HallwayConnection >{
     const hallwayConnectionOrError =  HallwayConnection.create({
      BuildingId1: dto.BuildingId1,
        BuildingId2:dto.BuildingId2,
        FloorId1: dto.FloorId1,
        FloorId2: dto.FloorId2,
        x1: dto.x1,
        y1: dto.y1,
        x2: dto.x2,
        y2: dto.y2
      }, new UniqueEntityID(dto.DomainId));

      if (hallwayConnectionOrError.isFailure) {
        console.log(hallwayConnectionOrError.error);
        return Promise.reject(hallwayConnectionOrError.error);
      }

      return Promise.resolve(hallwayConnectionOrError.getValue())
      
    }

    public static toPersistence (hallwayConnection: HallwayConnection): any {
      const a = {
        domainId: hallwayConnection.id.toString(),
        BuildingId1: hallwayConnection.BuildingId1,
        BuildingId2: hallwayConnection.BuildingId2,
        FloorId1: hallwayConnection.FloorId1,
        FloorId2: hallwayConnection.FloorId2,
        x1: hallwayConnection.x1,
        y1: hallwayConnection.y1,
        x2: hallwayConnection.x2,
        y2: hallwayConnection.y2
      }
      return a;
    }
  }
  