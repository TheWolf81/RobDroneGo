import { Inject, Service } from "typedi";
import { HallwayConnection } from "../domain/HallwayConnection";
import { HallwayConnectionID } from "../domain/HallwayConnectionID";
import IHallwayConnectionRepo from "../services/IRepos/IHallwayConnectionRepo";
import { Document, FilterQuery, Model } from "mongoose";
import { IHallwayConnectionPersitence } from "../dataschema/IHallwayConnectionPersitence";
import { HallwayConnectionMapper } from "../mappers/HallwayConnectionMap";
import { IHallwayConnectionDTO } from "../dto/IHallwayConnectionDTO";
@Service()
export default class HallwayConnectionRepo implements IHallwayConnectionRepo {
    private models: any;
    constructor(
        @Inject('hallwayConnectionSchema') private hallwayConnectionSchema: Model<IHallwayConnectionPersitence & Document>,

    ) { }
    

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }
    async findAll(): Promise<IHallwayConnectionDTO[]> {
        const query = this.createBaseQuery();
        const  hallwayConnections = await this.hallwayConnectionSchema.find(query);
        //const hallwayConnectionPromises = hallwayConnections.map((hallwayConnection: IHallwayConnectionPersitence) => HallwayConnectionMapper.fromDTO(hallwayConnection));

        return Promise.all(hallwayConnections);
    }
   

    public async save(hallwayConnection: HallwayConnection): Promise<HallwayConnection> {
        const query = { domainId: hallwayConnection.id.toString() };

        const hallwayConnectionDocument = await this.hallwayConnectionSchema.findOne(query);

        try {
            if (hallwayConnectionDocument === null) {
                const rawhallwayConnection: any = HallwayConnectionMapper.toPersistence(hallwayConnection);
                const hallwayConnectionCreated = await this.hallwayConnectionSchema.create(rawhallwayConnection);
                return HallwayConnectionMapper.fromDTO(hallwayConnectionCreated);
            }else{
                const temp = hallwayConnection.BuildingId1;
                hallwayConnectionDocument.BuildingId1 = temp;
                const temp2 = hallwayConnection.BuildingId2;
                hallwayConnectionDocument.BuildingId2 = temp2;
                const temp3 = hallwayConnection.FloorId1;
                hallwayConnectionDocument.FloorId1 = temp3;
                const temp4 = hallwayConnection.FloorId2;
                hallwayConnectionDocument.FloorId2 = temp4;
                await hallwayConnectionDocument.save();
                return hallwayConnection;
            }
        } catch (err) {
            throw err;
        }
    }
    public async findByDomainId(hallwayConnectionId: string | HallwayConnectionID): Promise<HallwayConnection> {
        const query = { domainId: hallwayConnectionId };
        const hallwayConnection = await this.hallwayConnectionSchema.findOne(query as FilterQuery<IHallwayConnectionPersitence & Document>);

        if (hallwayConnection != null) {
            return HallwayConnectionMapper.fromDTO(hallwayConnection);
        }
        else
            return null;
    }
    
    public async findhallwayConnectionbetwenBuildings(buildingId1: string, buildingId2: string): Promise<IHallwayConnectionDTO[]> {
        const query = {
            $or: [
                { BuildingId1: buildingId1, BuildingId2: buildingId2 },
                { BuildingId1: buildingId2, BuildingId2: buildingId1 }
            ]
        };
        const hallwayConnections = await this.hallwayConnectionSchema.find(query) as (IHallwayConnectionPersitence & Document)[];
       
        return hallwayConnections;
    }


    public async exists(t: HallwayConnectionID | string): Promise<boolean> {
        const idX = t instanceof HallwayConnectionID ? (<HallwayConnectionID>t).id.toValue() : t;

        const query = { domainId: idX };
        const hallwayConnectionDocument = await this.hallwayConnectionSchema.findOne(query as FilterQuery<IHallwayConnectionPersitence & Document>);

        return !!hallwayConnectionDocument === true;
    }

}