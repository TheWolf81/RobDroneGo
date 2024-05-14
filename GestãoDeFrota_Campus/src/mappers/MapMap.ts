import { Mapper } from "../core/infra/Mapper";
import { Map } from "../domain/Map";
import { IMapDTO } from "../dto/IMapDTO";


export class MapMapper extends Mapper<Map> {

    public static toDTO(map: Map): IMapDTO{
        return {
            maze: {
                size: map.size,
                map: map.map,
                exits: map.exits,
                elevators: map.elevators,
                exitLocation: map.exitLocation
            },
    
        } as IMapDTO;

    }

    public static toDomain(map: any): Map {
        const mapOrError = Map.create(map);
        mapOrError.isFailure ? console.log(mapOrError.error) : '';
        return mapOrError.isSuccess ? mapOrError.getValue() : null;
    }




}