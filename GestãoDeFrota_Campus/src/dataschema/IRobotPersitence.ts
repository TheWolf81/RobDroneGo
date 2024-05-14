import { IntegerType, Long } from "mongodb";

export interface IRobotPersistence {
    domainId: string;
    nickname:string;
    typeOfRobotId: string;
    StateOfRobot: boolean;
  }
  