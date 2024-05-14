import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import FloorService from '../services/FloorService';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const robotSchema = {
    name: 'robotSchema',
    schema: '../persistence/schemas/robotSchema',
  };

  const buildingSchema = {
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  };

  const floorSchema = {
    name: 'floorSchema',
    schema: '../persistence/schemas/floorSchema',
  };

  const roomSchema = {
    name: 'roomSchema',
    schema: '../persistence/schemas/roomSchema',
  };

  const hallwayConnectionSchema ={
    name: 'hallwayConnectionSchema',
    schema: '../persistence/schemas/HallwayConnectionSchema',
  }

  const elevatorSchema = {
    name: 'elevatorSchema',
    schema: '../persistence/schemas/elevatorSchema',
  };

  const typeOfRobotSchema = {
    name: 'typeOfRobotSchema',
    schema: '../persistence/schemas/typeOfRobotSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path
  }

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path
  }

  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  }

  const roomController = {
    name: config.controllers.room.name,
    path: config.controllers.room.path
  }

  const hallwayConnectionController={
    name: config.controllers.hallwayConnection.name,
    path: config.controllers.hallwayConnection.path
  }

  const elevatorController = {
    name: config.controllers.elevator.name,
    path: config.controllers.elevator.path
  };

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path
  }

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  }

  const roomRepo = {
    name: config.repos.room.name,
    path: config.repos.room.path
  }
  const hallwayConnectionRepo={
    name: config.repos.hallwayConnection.name,
    path: config.repos.hallwayConnection.path
  }

  const elevatorRepo = {
    name: config.repos.elevator.name,
    path: config.repos.elevator.path
  };

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path
  }

  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path
  }

  const FloorService = {
    name: config.services.floor.name,
    path: config.services.floor.path
  }

  const roomService = {
    name: config.services.room.name,
    path: config.services.room.path
  }
  const hallwayConnectionService={
    name: config.services.hallwayConnection.name,
    path: config.services.hallwayConnection.path
  }
  const elevatorService = {
    name: config.services.elevator.name,
    path: config.services.elevator.path
  };

  const typeOfRobotService = {
    name: config.services.typeOfRobot.name,
    path: config.services.typeOfRobot.path
  };
  const writeService={
    name: config.services.write.name,
    path: config.services.write.path
  };

  const typeOfRobotRepo = {
    name: config.repos.typeOfRobot.name,
    path: config.repos.typeOfRobot.path
  }

  const typeOfRobotController = {
    name: config.controllers.typeOfRobot.name,
    path: config.controllers.typeOfRobot.path
  }
  const writeController={
    name: config.controllers.write.name,
    path: config.controllers.write.path
  }


  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      robotSchema,
      buildingSchema,
      floorSchema,
      roomSchema,
      hallwayConnectionSchema,
      elevatorSchema,
      typeOfRobotSchema
    ],
    controllers: [
      roleController,
      robotController,
      buildingController,
      floorController,
      roomController,
      hallwayConnectionController,
      elevatorController,
      typeOfRobotController,
      writeController
    ],
    repos: [
      roleRepo,
      userRepo,
      robotRepo,
      buildingRepo,
      floorRepo,
      roomRepo,
      hallwayConnectionRepo,
      elevatorRepo,
      typeOfRobotRepo
    ],
    services: [
      roleService,
      robotService,
      buildingService,
      FloorService,
      roomService,
      hallwayConnectionService,
      elevatorService,
      typeOfRobotService,
      writeService
    ]
  });
  
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  
  Logger.info('✌️ Express loaded');
};
