export interface IFloorDTO {
    building_id: string;
    floorNumber: number;
    description: string;
    area: number;
    name: string;
    floorMap: FloorMapDTO[][];
}

export interface FloorMapDTO {
    obj_id: string;
    tipo: string;
    neighbours: string[];
}
