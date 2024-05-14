import {Service, Inject} from "typedi";
import { Document, FilterQuery, Model } from 'mongoose';
import IElevatorRepo from "../services/IRepos/IElevatorRepo";
import { IElevatorPersistence } from "../dataschema/IElevatorPersistence";
import { Elevator } from "../domain/Elevator/Elevator";
import { ElevatorId } from "../domain/Elevator/ElevatorId";
import { ElevatorMapper } from "../mappers/ElevatorMap";
import e from "express";
import { IElevatorDTO } from "../dto/IElevatorDTO";

@Service()
export default class ElevatorRepo implements IElevatorRepo {
    private models: any;

    constructor(
        @Inject('elevatorSchema') private elevatorSchema: Model<IElevatorPersistence & Document>,
       // @Inject('logger') private logger
      ) { }
      public async exists(elevatorId: ElevatorId | string): Promise<boolean> {
        const idX = elevatorId instanceof ElevatorId ? (<ElevatorId>elevatorId).id.toValue() : elevatorId;
        const query = { domainId: idX };
        const elevatorDocument = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);
        return !!elevatorDocument === true;
    }

      public async save(elevator: Elevator): Promise<Elevator> {
        const query = { domainId: elevator.id.toString() };
        const elevatorDocument = await this.elevatorSchema.findOne(query);
        try{
            if(elevatorDocument === null){
                const rawElevator: any = ElevatorMapper.toPersistence(elevator);
                const elevatorCreated = await this.elevatorSchema.create(rawElevator);
                return ElevatorMapper.toDomain(elevatorCreated);
            }
            else{
                elevatorDocument.floors_servedId = elevator.floors_servedId;
                elevatorDocument.description = elevator.description.value;
                await elevatorDocument.save();
                return ElevatorMapper.toDomain(elevatorDocument);
            }
        }catch(err){
            throw err;
        }
    }

    public async findByDomainId(elevatorId: string | number): Promise<Elevator> {
        const query = { domainId: elevatorId};
        const elevatorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);
        if (elevatorRecord != null) {
            return ElevatorMapper.toDomain(elevatorRecord);
        }
        return null;
        
    }

    public async findByBuildingId(buildingId: string | number): Promise<IElevatorDTO[]> {
        const query = { building_id: buildingId };
        const elevatorRecord = await this.elevatorSchema.find(query as FilterQuery<IElevatorPersistence & Document>);
        if (elevatorRecord != null) {
            let elevators: IElevatorDTO[] = [];
            for (let i = 0; i < elevatorRecord.length; i++) {
                const id = elevatorRecord[i].domainId;
                const building_id = elevatorRecord[i].building_id;
                const floors_servedId = elevatorRecord[i].floors_servedId;
                const description = elevatorRecord[i].description;
                const elevatorDTO = { id, building_id, floors_servedId, description };
                elevators.push(elevatorDTO);
            }
            return elevators;
        }
        return null;
    }
}