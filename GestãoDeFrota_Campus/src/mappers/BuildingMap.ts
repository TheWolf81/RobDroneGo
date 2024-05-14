import { Document, Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { IBuildingPersistence } from "../dataschema/IBuildingPersistence";
import { Building } from "../domain/Building/Building";
import { IBuildingDTO } from "../dto/IBuildingDTO";
import { BuildingCode } from "../domain/Building/BuildingCode";
import { Description } from "../domain/Description";
import { Measurement } from "../domain/Measurement";
import { Result } from "../core/logic/Result";

export class BuildingMapper extends Mapper<Building> {
  
  public static toDTO( building: Building): IBuildingDTO {
    return {
      domain_id: building.id.toString(),
      code: building.code.value,
      description: building.description.value,
      max_length: building.max_length.value,
      max_width: building.max_width.value
    } as IBuildingDTO;
  }

  public static toDomain (building: any | Model<IBuildingPersistence & Document> ): Building {
    const BuildingCodeOrError = BuildingCode.create(building.code);
    const DescriptionOrError = Description.create(building.description);
    const maxLengthOrError = Measurement.create(building.max_length);
    const maxWidthOrError = Measurement.create(building.max_width);

    if (BuildingCodeOrError.isFailure) {
      console.log(BuildingCodeOrError.error);
      return null;
    }

    if (DescriptionOrError.isFailure) {
      console.log(DescriptionOrError.error);
      return null;
    }

    if (maxLengthOrError.isFailure) {
      console.log(maxLengthOrError.error);
      return null;
    }

    if (maxWidthOrError.isFailure) {
      console.log(maxWidthOrError.error);
      return null;
    }

    const buildingOrError = Building.create(
      {
        code: BuildingCodeOrError.getValue(),
        description: DescriptionOrError.getValue(),
        max_length: maxLengthOrError.getValue(),
        max_width: maxWidthOrError.getValue()
      },
      new UniqueEntityID(building.domainId)
    );

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence (building: Building): any {
    return {
      domainId: building.id.toString(),
      code: building.code.value,
      description: building.description.value,
      max_length: building.max_length.value,
      max_width: building.max_width.value
    }
  }

}