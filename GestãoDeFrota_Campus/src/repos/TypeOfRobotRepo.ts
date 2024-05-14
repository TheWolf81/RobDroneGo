import { Service, Inject } from "typedi";
import { Document, FilterQuery, Model } from 'mongoose';
import ITypeOfRobotRepo from '../services/IRepos/ITypeOfRobotRepo';
import { TypeOfRobot } from '../domain/TypeOfRobot/TypeOfRobot';
import { TypeOfRobotMap } from '../mappers/TypeOfRobotMap';
import { ITypeOfRobotPersistence } from "../dataschema/ITypeOfRobotPersistence";
import { TypeOfRobotId } from "../domain/TypeOfRobotId";
import { ITypeOfRobotDTO } from "../dto/ITypeOfRobotDTO";
import { types } from "util";

@Service()
export default class TypeOfRobotRepo implements ITypeOfRobotRepo {
    private models: any;

    constructor(
        @Inject('typeOfRobotSchema') private typeOfRobotSchema: Model<ITypeOfRobotPersistence & Document>,
        @Inject('logger') private logger

    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(typeOfRobotId: TypeOfRobotId | string): Promise<boolean> {
        const idX = typeOfRobotId instanceof TypeOfRobotId ? (<TypeOfRobotId>typeOfRobotId).id.toValue() : typeOfRobotId;
        const query = { domainId: idX };
        const typeOfRobotDocument = await this.typeOfRobotSchema.findOne(query as FilterQuery<ITypeOfRobotPersistence & Document>);
        return !!typeOfRobotDocument === true;
    }

    public async save(typeOfRobot: TypeOfRobot): Promise<TypeOfRobot> {

        const query = { domainId: typeOfRobot.id.toString() };

        const typeOfRobotDocument = await this.typeOfRobotSchema.findOne(query as FilterQuery<ITypeOfRobotPersistence & Document>);

        try {
            if (typeOfRobotDocument === null) {
                const rawTypeOfRobot: any = TypeOfRobotMap.toPersistence(typeOfRobot);
                const typeOfRobotCreated = await this.typeOfRobotSchema.create(rawTypeOfRobot);

                return TypeOfRobotMap.toDomain(typeOfRobotCreated);
            } else {
                //update
                typeOfRobotDocument.domainId = typeOfRobot.id.toString();
                typeOfRobotDocument.brand = typeOfRobot.brand.value;
                typeOfRobotDocument.model = typeOfRobot.model.value;
                typeOfRobotDocument.taskType = typeOfRobot.taskType.map((taskType) => taskType.value);
                await typeOfRobotDocument.save();

                return TypeOfRobotMap.toDomain(typeOfRobotDocument);
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(id: string): Promise<TypeOfRobot> {
        const query = { domainId: id };
        const typeOfRobotRecord = await this.typeOfRobotSchema.findOne(query as FilterQuery<ITypeOfRobotPersistence & Document>);
        if (typeOfRobotRecord != null) {
            return TypeOfRobotMap.toDomain(typeOfRobotRecord);
        }
        return null;
    }

    public async findAll(): Promise<TypeOfRobot[]> {
        const typeOfRobotRecord = await this.typeOfRobotSchema.find();
        if (typeOfRobotRecord != null) {
            return typeOfRobotRecord.map((typeOfRobot) => TypeOfRobotMap.toDomain(typeOfRobot));
        }
        return null;
    }

    async findAllType(): Promise<ITypeOfRobotDTO[]> {
        const query = this.createBaseQuery();
        const TypeOfRobot = await this.typeOfRobotSchema.find(query);
        const hallwayConnectionPromises = TypeOfRobot.map((hallwayConnection: ITypeOfRobotPersistence) => TypeOfRobotMap.toDomain(hallwayConnection));
        const types = hallwayConnectionPromises.map((types: TypeOfRobot) => TypeOfRobotMap.toDTO(types));
        for (let index = 0; index < hallwayConnectionPromises.length; index++) {
           
            types[index].domain_id=TypeOfRobot[index].domainId;


        }
        return Promise.all(types);
    }

}
