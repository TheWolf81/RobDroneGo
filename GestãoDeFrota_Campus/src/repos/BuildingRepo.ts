import {Service, Inject} from "typedi";
import { Document, FilterQuery, Model } from 'mongoose';
import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import { Building } from '../domain/Building/Building';
import { BuildingMapper } from '../mappers/BuildingMap';
import { IBuildingPersistence } from "../dataschema/IBuildingPersistence";
import { BuildingId } from "../domain/Building/BuildingId";
import { Result } from "../core/logic/Result";


@Service()
export default class BuildingRepo implements IBuildingRepo {
    private models: any;

    constructor(
        @Inject('buildingSchema') private buildingSchema: Model<IBuildingPersistence & Document>,
       // @Inject('logger') private logger
    
      ) { }  
      
      private createBaseQuery(): any {
        return {
          where: {},
        }
      }

    public async exists(buildingId: BuildingId | string): Promise<boolean> {
    const idX = buildingId instanceof BuildingId ? (<BuildingId>buildingId).id.toValue() : buildingId;
    const query = { domainId: idX };
    const buildingDocument = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);
    return !!buildingDocument === true;
  }
    
  public async save(building: Building): Promise<Building> {
    const query = { domainId: building.id.toString() };
    const buildingDocument = await this.buildingSchema.findOne(query);

    try {
      if (buildingDocument === null) {
        const rawBuilding: any = BuildingMapper.toPersistence(building);

        const buildingCreated = await this.buildingSchema.create(rawBuilding);

        return BuildingMapper.toDomain(buildingCreated);
      } else {
        //update
        buildingDocument.domainId = building.id.toString();
        buildingDocument.code = building.code.value;
        buildingDocument.description = building.description.value;
        buildingDocument.max_length = building.max_length.value;
        buildingDocument.max_width = building.max_width.value;
        await buildingDocument.save();

        return BuildingMapper.toDomain(buildingDocument);
      }
    } catch (err) {
      throw err;
    }

  }

  public async findByDomainId(buildingId: BuildingId | string): Promise<Building> {
    const query = { domainId: buildingId };
    const buildingRecord = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);
    if (buildingRecord != null) {
      return BuildingMapper.toDomain(buildingRecord);
    }
    return null;
  }

  public async findByCode(buildingCode: string): Promise<Building> {
    const query = { code: buildingCode };
    const buildingRecord = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);
    if (buildingRecord != null) {
      return BuildingMapper.toDomain(buildingRecord);
    }
    return null;
  }

  public async findAll(): Promise<Building[]> {
    const query = this.createBaseQuery();
    const buildingRecords = await this.buildingSchema.find(query);
    if (buildingRecords.length > 0) {
        return buildingRecords.map(buildingRecord => BuildingMapper.toDomain(buildingRecord));
    }
    return null;
}

    
}