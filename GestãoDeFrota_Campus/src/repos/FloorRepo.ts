import {Service, Inject} from "typedi";
import { Document, FilterQuery, Model } from 'mongoose';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import { Floor, FloorMap } from '../domain/Floor/Floor';
import { FloorMapper } from '../mappers/FloorMap';
import { IFloorPersistence } from "../dataschema/IFloorPersistence";
import { FloorId } from "../domain/FloorId";
import BuildingRepo from "../repos/BuildingRepo";
import { Result } from "../core/logic/Result";

@Service()
export default class FloorRepo implements IFloorRepo {

    private models: any;
    constructor(
        @Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>,
       // @Inject('logger') private logger
      ) { }

        private createBaseQuery(): any {
            return {
            where: {},
            }
        }

    public async exists(floorId: FloorId | string): Promise<boolean> {
        const idX = floorId instanceof FloorId ? (<FloorId>floorId).id.toValue() : floorId;
        const query = { domainId: idX };
        const floorDocument = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
        return !!floorDocument === true;
    }

    public async existsInBuilding(buildingId: string, floorNumber: number): Promise<boolean> {
        const query = { building_id: buildingId, floorNumber: floorNumber };
        const floorDocument = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
        return !!floorDocument === true;
    }

    public async save(floor: Floor): Promise<Floor> {
        const query = { domainId: floor.id.toString() };
        const floorDocument = await this.floorSchema.findOne(query);

        if(await this.existsInBuilding(floor.building_id, floor.floorNumber.value) === true) {
            throw new Error("Floor already exists in building");
        }

        try {
            if (floorDocument === null) {
                const rawFloor: any = FloorMapper.toPersistence(floor);
                const floorCreated = await this.floorSchema.create(rawFloor);
                
                return FloorMapper.toDomain(floorCreated);
            } else {
                //update
                floorDocument.domainId = floor.id.toString();
                floorDocument.building_id = floor.building_id.toString();
                floorDocument.floorNumber = floor.floorNumber.value;
                floorDocument.description = floor.description.value;
                floorDocument.area = floor.area.value;
                floorDocument.name = floor.name.value;
                floorDocument.floorMap = floor.floorMap;
                
                await floorDocument.save();

                return FloorMapper.toDomain(floorDocument);
            }
        } catch (err) {
            throw err;
        }

    }

    public async update(floor: Floor): Promise<Floor> {
        const query = { domainId: floor.id.toString() };
        const floorDocument = await this.floorSchema.findOne(query);
        try {
            if (floorDocument != null) {
                //update
                floorDocument.domainId = floor.id.toString();
                floorDocument.building_id = floor.building_id.toString();
                floorDocument.floorNumber = floor.floorNumber.value;
                floorDocument.description = floor.description.value;
                floorDocument.area = floor.area.value;
                floorDocument.name = floor.name.value;
                floorDocument.floorMap = floor.floorMap;
                await floorDocument.save();

                return FloorMapper.toDomain(floorDocument);
            } else {
                throw new Error("Floor not found");
            }
        }
        catch (err) {
            throw err;
        }
    }

    public async updateWithMap(floor: Floor, map: FloorMap[][]): Promise<Floor> {
    
        const query = { domainId: floor.id.toString() };
        const floorDocument = await this.floorSchema.findOne(query);

        if(await this.exists(floor.id.toString()) === false) {
            throw new Error("Floor does not exist");
        }

        try {
            if (floorDocument != null) {
                //update
                floorDocument.domainId = floor.id.toString();
                floorDocument.building_id = floor.building_id.toString();
                floorDocument.floorNumber = floor.floorNumber.value;
                floorDocument.description = floor.description.value;
                floorDocument.area = floor.area.value;
                floorDocument.name = floor.name.value;
                floorDocument.floorMap = map;
                await floorDocument.save();

                return FloorMapper.toDomain(floorDocument);
            } else {
                throw new Error("Floor not found");
            }
        }
        catch (err) {
            throw err;
        }

    }

    public async findByDomainId(floorId: FloorId | string): Promise<Floor> {
        const query = { domainId: floorId };
        const floorRecord = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
        
        if (floorRecord != null) {
            return FloorMapper.toDomain(floorRecord);
        }
        return null;
    }

    public async findAll(): Promise<Floor[]> {
        const query = this.createBaseQuery();
        const floorRecords = await this.floorSchema.find(query);
        if (floorRecords.length > 0) {
            return floorRecords.map(floorRecord => FloorMapper.toDomain(floorRecord));
        }
        return null;
    }

    public async findByBuildingId(building_id: string): Promise<Floor[]> {
        try {
        const query = { building_id: building_id };
        const floorRecords = await this.floorSchema.find(query as FilterQuery<IFloorPersistence & Document>);

        return floorRecords.map(floorRecord => FloorMapper.toDomain(floorRecord));
        }
        catch (err) {
            throw err;
        }
    }

    //  await this.floorRepo.updateFloorMap(floor, floorMap); using a patch
    public async updateFloorMap(floor: Floor, map:FloorMap[][] ): Promise<Floor> {
        const query = { domainId: floor.id.toString() };
        const floorDocument = await this.floorSchema.findOne(query);

        if(await this.exists(floor.id.toString()) === false) {
            throw new Error("Floor does not exist");
        }

        try {
            if (floorDocument != null) {
                //update
                const floor = await this.floorSchema.findOneAndUpdate(query, {floorMap: map});
                await floorDocument.save();

                return FloorMapper.toDomain(floorDocument);
            } else {
                throw new Error("Floor not found");
            }
        }
        catch (err) {
            throw err;
        }
      
        
    }

        
}