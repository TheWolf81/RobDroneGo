import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";
import { Floor } from "../domain/Floor/Floor";
import { IFloorDTO } from "../dto/IFloorDTO";
import { Document, Model } from "mongoose";
import { Mapper } from "../core/infra/Mapper";
import { Description } from "../domain/Description";
import { Area } from "../domain/Floor/Area";
import { FloorNumber } from "../domain/Floor/FloorNumber";
import { Name } from "../domain/Floor/Name";


export class FloorMapper extends Mapper<Floor> {
    public static toDTO(floor: Floor): IFloorDTO {
        return {
            DomainId: floor.id.toString(),
            building_id: floor.building_id.toString(),
            floorNumber: floor.floorNumber.value,
            description: floor.description.value,
            area: floor.area.value,
            name: floor.name.value,
            floorMap: floor.floorMap
        } as IFloorDTO;
    }

    public static toDomain(floor: any | Model<IFloorPersistence & Document>): Floor {
        const floorNumberOrError = FloorNumber.create(floor.floorNumber);
        const descriptionOrError = Description.create(floor.description);
        const areaOrError = Area.create(floor.area);
        const nameOrError = Name.create(floor.name);

        if (floorNumberOrError.isFailure) {
            console.log(floorNumberOrError.error);
            return null;
        }
        else if (descriptionOrError.isFailure) {
            console.log(descriptionOrError.error);
            return null;
        }
        else if (areaOrError.isFailure) {
            console.log(areaOrError.error);
            return null;
        }
        else if (nameOrError.isFailure) {
            console.log(nameOrError.error);
            return null;
        }

        const floorOrError = Floor.create(
            {
                building_id: floor.building_id,
                floorNumber: floorNumberOrError.getValue(),
                description: descriptionOrError.getValue(),
                area: areaOrError.getValue(),
                name: nameOrError.getValue(),
                floorMap: floor.floorMap
            },
            new UniqueEntityID(floor.domainId)
        );

        floorOrError.isFailure ? console.log(floorOrError.error) : '';
        return floorOrError.isSuccess ? floorOrError.getValue() : null;
    }
  

    public static toPersistence(floor: Floor): any {
        return {
            domainId: floor.id.toString(),
            building_id: floor.building_id.toString(),
            floorNumber: floor.floorNumber.value,
            description: floor.description.value,
            area: floor.area.value,
            name: floor.name.value,
            floorMap: floor.floorMap
    }
    }

}