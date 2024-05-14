import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import { IHallwayConnectionDTO } from "../dto/IHallwayConnectionDTO";
import IHallwayConnectionService from "./IServices/IHallwayConnectionService";
import { HallwayConnection } from "../domain/HallwayConnection";
import IHallwayConnectionRepo from "./IRepos/IHallwayConnectionRepo";
import { HallwayConnectionMapper } from "../mappers/HallwayConnectionMap";
import config from "../../config";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import { Floor } from "../domain/Floor/Floor";
import IFloorRepo from "./IRepos/IFloorRepo";
import { promises } from "dns";


@Service()
export default class HallwayConnectionService implements IHallwayConnectionService {
    constructor(
        @Inject(config.repos.hallwayConnection.name) private hallwayConnectionRepo: IHallwayConnectionRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
        @Inject('logger') private logger

    ) { }
    public async getAllHallways(): Promise<any[]> {
        let AllHallways: string[] = [];
        const hallwayConnections = this.hallwayConnectionRepo.findAll();
        if (hallwayConnections === null) {
            return null;
        }
        return hallwayConnections;
    }
    public async getBuildingsFloorsName(domainId: string): Promise<any> {

        const hallwayConnection = this.hallwayConnectionRepo.findByDomainId(domainId.substring(1));
        if (hallwayConnection === null) {
            return null;
        }
        const building1 = await this.buildingRepo.findByDomainId((await hallwayConnection).BuildingId1);
        const building2 = await this.buildingRepo.findByDomainId((await hallwayConnection).BuildingId2);
        const floor1 = await this.floorRepo.findByDomainId((await hallwayConnection).FloorId1);
        const floor2 = await this.floorRepo.findByDomainId((await hallwayConnection).FloorId2);

        return {
            building1: building1.props.code.value,
            building2: building2.props.code.value,
            floor1: floor1.props.name.value,
            floor2: floor2.props.name.value
        };
    }


    public async ListarEdificiosPassagens(): Promise<string[]> {
        let buildingsId: string[] = [];
        const hallwayConnections = this.hallwayConnectionRepo.findAll();
        if (hallwayConnections === null) {
            return null;
        }

        for (let i = 0; i < (await hallwayConnections).length; i++) {

            const element = (await hallwayConnections).find((hc, index, arr) => index === i)?.FloorId1;
            const element2 = (await hallwayConnections).find((hc, index, arr) => index === i)?.FloorId2;
            if (buildingsId.length > 0) {
                if (!buildingsId.includes(element)) {
                    buildingsId.push(element);
                    console.log(element);
                }

                if (!buildingsId.includes(element2)) {
                    buildingsId.push(element2);
                    console.log(element2);
                }
            } else {
                buildingsId.push(element);
                buildingsId.push(element2);
            }

        }
        return buildingsId;
    }


    public async createHallwayConnection(dto :IHallwayConnectionDTO): Promise<Result<IHallwayConnectionDTO>> {
        try {
            let FloorId1: string;
            FloorId1=dto.FloorId1;
            let FloorId2: string;
            FloorId2=dto.FloorId2;
            this.logger.silly('Creating user db record');
            const floor1 = await this.getFloor(FloorId1);
            if (floor1 == null) {
                return Result.fail<IHallwayConnectionDTO>("floor not found");
            }
            if (!(floor1.floorMap[dto.x1][dto.y1].tipo != '6' ||
            floor1.floorMap[dto.x1][dto.y1].tipo != '7')) {
            return Result.fail<IHallwayConnectionDTO>("HallwayConnection does not exist on map");
          }
            const floor2 = await this.getFloor(FloorId2);
            if (floor2 == null) {
                return Result.fail<IHallwayConnectionDTO>("floor not found");
            }
            if (!(floor2.floorMap[dto.x2][dto.y2].tipo != '6' ||
            floor2.floorMap[dto.x2][dto.y2].tipo != '7')) {
            return Result.fail<IHallwayConnectionDTO>("HallwayConnection does not exist on map");
          }

            // check that floors are in the same building
            if (floor1.props.building_id == floor2.props.building_id) {
                return Result.fail<IHallwayConnectionDTO>("floors are in the same building");
            }
            
            const HallwayConnectionOrError = await HallwayConnection.create(
                {
                    BuildingId1: floor1.props.building_id,
                    BuildingId2: floor2.props.building_id,
                    FloorId1: FloorId1,
                    FloorId2: FloorId2,
                    x1:dto.x1,
                    y1:dto.y1,
                    x2:dto.x2,
                    y2:dto.y2
                }
            )
            if (HallwayConnectionOrError.isFailure) {
                return Result.fail<IHallwayConnectionDTO>(HallwayConnectionOrError.error.toString())
            }
            const HallwayConnectionResult = HallwayConnectionOrError.getValue();
            await this.hallwayConnectionRepo.save(HallwayConnectionResult);
            const hallwayConnectionDTOResult = HallwayConnectionMapper.toDTO(HallwayConnectionResult) as IHallwayConnectionDTO;
            return Result.ok<IHallwayConnectionDTO>(hallwayConnectionDTOResult);
        } catch (e) {
            throw e;
        }
    }
    public async editHallwayConnection(FloorId1: string, FloorId2: string, DomainId: string): Promise<Result<IHallwayConnectionDTO>> {
        try {
            const hallwayConnection = await this.hallwayConnectionRepo.findByDomainId(DomainId);
            if (hallwayConnection === null) {
                return Result.fail<IHallwayConnectionDTO>("HallwayConnection not found");
            }
            const floor1 = await this.getFloor(FloorId1);

            if (floor1 == null) {
                return Result.fail<IHallwayConnectionDTO>("floor not found");
            }
           
            const floor2 = await this.getFloor(FloorId2);
            if (floor2 == null) {
                return Result.fail<IHallwayConnectionDTO>("floor not found");
            }
            // check that floors are in the same building~
            if (floor1.props.building_id == floor2.props.building_id) {
                return Result.fail<IHallwayConnectionDTO>("floors are in the same building");
            }
            hallwayConnection.BuildingId1 = floor1.props.building_id;
            hallwayConnection.BuildingId2 = floor2.props.building_id;
            hallwayConnection.FloorId1 = FloorId1;
            hallwayConnection.FloorId2 = FloorId2;
            await this.hallwayConnectionRepo.save(hallwayConnection);
            const hallwayConnectionDTOResult = HallwayConnectionMapper.toDTO(hallwayConnection) as IHallwayConnectionDTO;
            return Result.ok<IHallwayConnectionDTO>(hallwayConnectionDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async allHallwayConnectionBetwentwoBuildings(BulidingId1: string, BulidingId2: string): Promise<Result<IHallwayConnectionDTO[]>> {
        try {
            const hallwayConnections = await this.hallwayConnectionRepo.findhallwayConnectionbetwenBuildings(BulidingId1, BulidingId2);
            return Result.ok<IHallwayConnectionDTO[]>(hallwayConnections);
        } catch (e) {
            throw e;
        }
    }


    private async getFloor(id: string): Promise<Floor> {

        const floor = await this.floorRepo.findByDomainId(id);

        if (floor === null) {
            return null;
        }
        return floor;
    }

}
