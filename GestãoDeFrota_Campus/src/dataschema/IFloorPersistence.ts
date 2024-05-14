import { IntegerType, Long } from "mongodb";
import { FloorNumber } from "../domain/Floor/FloorNumber";
import { Description } from "../domain/Description";
import { Name } from "../domain/Floor/Name";
import { Area } from "../domain/Floor/Area";

interface FloorMap {
    obj_id: string;
    tipo: string;
    neighbours: string[];
}

export interface IFloorPersistence {
    domainId: string;
    building_id: string;
    floorNumber: number;
    description: string;
    area: number;
    name: string;
    floorMap: FloorMap[][];
  }
