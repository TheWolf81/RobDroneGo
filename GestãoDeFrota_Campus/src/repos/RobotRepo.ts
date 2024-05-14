import { Service, Inject } from 'typedi';



import { Document, FilterQuery, Model } from 'mongoose';
import IRobotRepo from '../services/IRepos/IRobotRepo';
import { RobotMapper } from '../mappers/RobotMap';
import { RobotId } from '../domain/RobotId';
import { IRobotPersistence } from '../dataschema/IRobotPersitence';
import { query } from 'express';
import { Robot } from '../domain/robot';

@Service()
export default class RobotRepo implements IRobotRepo {
  private models: any;

  constructor(
    @Inject('robotSchema') private robotSchema: Model<IRobotPersistence & Document>,
  ) { }

  async findAll(): Promise<Robot[]> {
    const robots = await this.robotSchema.find().lean().exec();
    const robotPromises = robots.map((robot: IRobotPersistence) => RobotMapper.toDomain(robot));
    return Promise.all(robotPromises);
  }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(robotId: RobotId | string): Promise<boolean> {

    const idX = robotId instanceof RobotId ? (<RobotId>robotId).id.toValue() : robotId;

    const query = { domainId: idX };
    const RobotDocument = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence & Document>);

    return !!RobotDocument === true;
  }

  public async save(robot: Robot): Promise<Robot> {
    const query = { domainId: robot.id.toString() };

    const robotDocument = await this.robotSchema.findOne(query);

    try {
      if (robotDocument === null) {
        const rawRobot: any = RobotMapper.toPersistence(robot);
        console.log(rawRobot);
        const robotCreated = await this.robotSchema.create(rawRobot);

        return RobotMapper.toDomain(robotCreated);
      } else {
        robotDocument.domainId=robot.id.toString();
        robotDocument.nickname = robot.nickname;
        robotDocument.typeOfRobotId = robot.typeOfRobotId;
        robotDocument.StateOfRobot = robot.StateOfRobot;
        await robotDocument.save();

        return robot;
      }
    } catch (err) {
      throw err;
    }

  }

  public async findByDomainId(RobotId: RobotId | string): Promise<Robot> {
    const query = { domainId: RobotId };
    console.log(query);
    const RobotRecord = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence & Document>);

    if (RobotRecord != null) {
      return RobotMapper.toDomain(RobotRecord);
    }
    else
      return null;
  }
}
