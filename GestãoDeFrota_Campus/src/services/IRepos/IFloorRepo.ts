import { Repo } from "../../core/infra/Repo";
import { Floor, FloorMap } from "../../domain/Floor/Floor";

export default interface IFloorRepo extends Repo<Floor> {
    updateFloorMap(floor: Floor, map: FloorMap[][]): Promise<Floor>;
    save(floor: Floor): Promise<Floor>;
    update(floor: Floor): Promise<Floor>;
    findByDomainId (id: string): Promise<Floor>;
    exists(floor: Floor): Promise<boolean>;
    existsInBuilding(buildingId: string, floorNumber: number): Promise<boolean>;
    findAll(): Promise<Floor[]>;
    findByBuildingId(building_id: string): Promise<Floor[]>;
    updateWithMap(floor: Floor, map: FloorMap[][]): Promise<Floor>
    // findByIds (deviceIds: DeviceId[]): Promise<Device[]>;
    // saveCollection (devices: Device[]): Promise<Device[]>;
    // removeByDeviceIds (devices: DeviceId[]): Promise<any>
}