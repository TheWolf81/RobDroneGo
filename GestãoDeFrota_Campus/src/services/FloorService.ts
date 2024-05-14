import { Inject, Service } from "typedi";
import IFloorService from "./IServices/IFloorService";
import { Result } from "../core/logic/Result";
import IFloorRepo from "./IRepos/IFloorRepo";
import { IFloorDTO } from "../dto/IFloorDTO";
import config from "../../config";
import { Floor, FloorMap } from "../domain/Floor/Floor";
import { FloorMapper } from "../mappers/FloorMap";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import { IMapDTO } from "../dto/IMapDTO";
import IRoomRepo from "./IRepos/IRoomRepo";

@Service()
export default class FloorService implements IFloorService {

    constructor(
        @Inject('logger') private logger,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
        @Inject(config.repos.room.name) private rommsRepo: IRoomRepo,
    ) { }
    async getFloors(): Promise<Result<Array<IFloorDTO>>> {
        const floors = this.floorRepo.findAll();
        if (floors === null) {
            return Result.fail<Array<IFloorDTO>>("There are no floors!");
        }
        else {

            const FloorDTOResult = (await floors).map(floors => FloorMapper.toDTO(floors) as IFloorDTO);
            return Result.ok<Array<IFloorDTO>>(FloorDTOResult)
        }
    }

    async ReformData(floorMap: FloorMap[][],floorName:string, listOfRooms:any): Promise<any> {
        let map = [];
        let initialPosition, elevatorLocations;
        let exitLocation = [];
        let roomlocations = [];
        let columns = floorMap[0].length;
        let rows = floorMap.length;

        for (let i = 0; i < floorMap.length; i++) {
            let row = [];
            for (let j = 0; j < floorMap[i].length; j++) {
                let cell = floorMap[i][j];
                switch (cell.tipo) {
                    case "0":
                        row.push(0);
                        break;
                    case "1":
                        row.push(1);
                        break;
                    case "2":
                        row.push(1);
                        break;
                    case "3":
                        initialPosition = [j+1, i+1];
                        row.push(1);
                        break;
                    case "4":
                        elevatorLocations = [j+1, i+1];
                        row.push(0);
                        break;
                    case "5":
                        elevatorLocations = [j+1, i+1];
                        row.push(0);
                        break;
                    case "6":
                        exitLocation.push([j+1, i+1]);
                        row.push(0);
                        break;
                    case "7":
                        exitLocation.push([j+1, i+1]);
                        row.push(0);
                        break;
                    case "10":
                        roomlocations.push([j+1, i+1]);
                        row.push(0);
                        break;
                    case "11":
                        roomlocations.push([j, i])
                        row.push(0);
                        break;
                    default:
                        row.push(0);
                        break;
                }
            }
            map.push(row);
        }

        return {
            map: map,
            initialPosition: initialPosition,
            exitLocation: exitLocation,
            elevatorLocations: elevatorLocations,
            roomlocations: roomlocations,
            floorName:floorName,
            columns: columns,
            rows: rows
        };

    }
    async getFloorMap(floorDomainId: string): Promise<any> {
        const floor = await this.floorRepo.findByDomainId(floorDomainId.substring(1));
        if (floor == null) {
            return Result.fail<IFloorDTO>("Floor id does not exist");
        }
        const listOfRooms=this.rommsRepo.findByFloorId(floorDomainId.substring(1));
        const floorMap = floor.floorMap;
        const result = this.ReformData(floorMap,floor.name.value,listOfRooms);
        return result;
    };
    async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {

            let floorNumber = floorDTO.floorNumber as unknown as number;

            if (await this.buildingRepo.exists(floorDTO.building_id) === false) {
                return Result.fail<IFloorDTO>("Building Id does not exist");
            }


            if (await this.floorRepo.existsInBuilding(floorDTO.building_id, floorNumber) === true) {
                return Result.fail<IFloorDTO>("Floor number already exists in this building");
            }


            const floor = FloorMapper.toDomain(floorDTO);

            if (floor == null) {
                return Result.fail<IFloorDTO>("Invalid State");
            }

            this.logger.silly('Creating floor db record');
            await this.floorRepo.save(floor);

            const FloorDTOResult = FloorMapper.toDTO(floor) as IFloorDTO;

            return Result.ok<IFloorDTO>(FloorDTOResult);
        }
        catch (e) {
            throw e;
        }
    }

    async updateFloor(id: string, floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {

            const floor = await this.floorRepo.findByDomainId(id);

            if (floor == null) {
                return Result.fail<IFloorDTO>("Floor id does not exist");
            }

            floorDTO.area = floor.area as unknown as number;
            floorDTO.floorNumber = floor.floorNumber as unknown as number;
            floorDTO.building_id = floor.building_id as unknown as string;
            floorDTO.floorMap = floor.floorMap as unknown as FloorMap[][];

            const aux = FloorMapper.toDomain(floorDTO);

            if (aux == null) {
                return Result.fail<IFloorDTO>("Invalid State");
            }

            floor.description = aux.description;
            floor.name = aux.name;
            //floor.floorMap = aux.floorMap;

            await this.floorRepo.update(floor);

            const FloorDTOResult = FloorMapper.toDTO(floor) as IFloorDTO;
            return Result.ok<IFloorDTO>(FloorDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async getFloorsByBuildingId(buildingId: string): Promise<Result<IFloorDTO[]>> {
        try {
            const floors = await this.floorRepo.findByBuildingId(buildingId);

            if (floors.length === 0) {
                return Result.fail<IFloorDTO[]>("No floors found for this building");
            }

            const floorDTOs: IFloorDTO[] = [];
            for (let i = 0; i < floors.length; i++) {
                const floorDTO = FloorMapper.toDTO(floors[i]);
                floorDTOs.push(floorDTO);
            }

            return Result.ok<Array<IFloorDTO>>(floorDTOs);
        } catch (e) {
            throw e;
        }
    }


    public async createFloorMapObject(position: string, tipo: string, vizinhos: string[]) {
        return {
            obj_id: position,
            tipo: tipo,
            neighbours: vizinhos
        }
    }


    public async loadMap(id: string, mapDTO: IMapDTO): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(id);

            if (floor == null) {
                throw new Error("Floor id does not exist");
            }

            const floorMap: FloorMap[][] = [];
            const floorMapMatrix = mapDTO.maze.map;
            const exits = mapDTO.maze.exits; //"exits": [[2.0, -1.0],[5.0, 8.0]]
            const elevators = mapDTO.maze.elevators; // "elevators": [[2.0,8.0]]
            const exitLocation = mapDTO.maze.exitLocation; // "exitLocation": [[2.0, 8.0]]

            for (let i = 0; i < floorMapMatrix.length; i++) {
                const row: FloorMap[] = [];
                for (let j = 0; j < floorMapMatrix[i].length; j++) {
                    const obj_id = `${i}.${j}`;
                    const cellValue = floorMapMatrix[i][j];
                    const neighbors: string[] = [];

                    if (i > 0) {
                        neighbors.push(`${i - 1}.${j}`); // cima
                    }
                    if (i > 0 && j < floorMapMatrix[i].length - 1) {
                        neighbors.push(`${i - 1}.${j + 1}`); // cima.direita
                    }
                    if (j < floorMapMatrix[i].length - 1) {
                        neighbors.push(`${i}.${j + 1}`); // direita
                    }
                    if (i < floorMapMatrix.length - 1 && j < floorMapMatrix[i].length - 1) {
                        neighbors.push(`${i + 1}.${j + 1}`); // baixo.direita
                    }
                    if (i < floorMapMatrix.length - 1) {
                        neighbors.push(`${i + 1}.${j}`); // baixo
                    }
                    if (i < floorMapMatrix.length - 1 && j > 0) {
                        neighbors.push(`${i + 1}.${j - 1}`); // baixo.esquerda
                    }
                    if (j > 0) {
                        neighbors.push(`${i}.${j - 1}`); // esquerda
                    }
                    if (i > 0 && j > 0) {
                        neighbors.push(`${i - 1}.${j - 1}`); // cima.esquerda
                    }



                    const objectFloorMap = this.createFloorMapObject(obj_id, cellValue.toString(), neighbors);
                    row.push(await objectFloorMap);

                }
                floorMap.push(row);
            }

            //await this.floorRepo.updateFloorMap(floor, floorMap);
            //await this.floorRepo.update(floor);
            await this.floorRepo.updateWithMap(floor, floorMap);

            const floorDTO: IFloorDTO = {
                building_id: floor.building_id.toString(),
                floorNumber: floor.floorNumber.value,
                description: floor.description.value,
                area: floor.area.value,
                name: floor.name.value,
                floorMap: floorMap,
            };

            return Result.ok<IFloorDTO>(floorDTO);
        } catch (e) {
            throw e;
        }

    }




}