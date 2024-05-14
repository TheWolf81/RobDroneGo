import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb+srv://g07:g07@cluster0.w4ld8kj.mongodb.net/?retryWrites=true&w=majority",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    robot:{
      name: "RobotController",
      path: "../controllers/robotContrller"
    },
    building:{
      name: "BuildingController",
      path: "../controllers/buildingController"
    },
    floor:{
      name: "FloorController",
      path: "../controllers/floorController"
    },
    hallwayConnection:{
      name: "HallwayConnectionController",
      path: "../controllers/HallwayConnectionController"
    },
    room:{
      name: "RoomController",
      path: "../controllers/roomController"
    },
    elevator:{
      name: "ElevatorController",
      path: "../controllers/elevatorController"
    },
    typeOfRobot:{
      name: "TypeOfRobotController",
      path: "../controllers/TypeOfRobotController"
    },
    write:{
      name: "WriteController",
      path: "../controllers/WriteController"
    }
  },


  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    robot:{
      name: "RobotRepo",
      path: "../repos/RobotRepo"
    },
    building:{
      name: "BuildingRepo",
      path: "../repos/BuildingRepo"
    },
    floor:{
      name: "FloorRepo",
      path: "../repos/FloorRepo"
    },
    room:{
      name: "RoomRepo",
      path: "../repos/RoomRepo"
    },
    hallwayConnection:{
      name: "HallwayConnectionRepo",
      path: "../repos/HallwayConnectionRepo"
    },
    elevator:{
      name: "ElevatorRepo",
      path: "../repos/ElevatorRepo"
    },
    typeOfRobot:{
      name: "TypeOfRobotRepo",
      path: "../repos/TypeOfRobotRepo"
    },
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    robot:{
      name: "RobotService",
      path: "../services/robotService"
    },
    building:{
      name: "BuildingService",
      path: "../services/BuildingService"
    },
    floor:{
      name: "FloorService",
      path: "../services/FloorService"
    },
    hallwayConnection: {
      name: "HallwayConnectionService",
      path: "../services/HallwayConnectionService"
    },
    room:{
      name: "RoomService",
      path: "../services/RoomService"
    },
    elevator:{
      name: "ElevatorService",
      path: "../services/ElevatorService"
    },
    typeOfRobot:{
      name: "TypeOfRobotService",
      path: "../services/TypeOfRobotService"
    },
    write:{
      name: "WriteService",
      path: "../services/writeService"

    }
  },
};
