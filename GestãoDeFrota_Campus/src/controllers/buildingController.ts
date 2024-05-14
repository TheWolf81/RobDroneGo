import { Inject, Service } from "typedi";
import IBuildingService from "../services/IServices/IBuildingService";
import config from "../../config";
import IBuildingController from "./IControllers/IBuildingController";
import { NextFunction, Request, Response } from "express";
import { IBuildingDTO } from "../dto/IBuildingDTO";
import { Result } from "../core/logic/Result";

@Service()
export default class BuildingController implements IBuildingController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.building.name) private buildingServiceInstance : IBuildingService,
      @Inject('logger') private logger,

  ) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;
      if (buildingOrError.isFailure) {
        return res.status(402).send(buildingOrError.errorValue());
      }
      
      const deviceDTO = buildingOrError.getValue();
      return res.json( deviceDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  }

  public async editBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingServiceInstance.editBuilding(req.params.domainId, req.body as IBuildingDTO) as Result<IBuildingDTO>;
        
      if (buildingOrError.isFailure) {
        return res.status(402).send(buildingOrError.errorValue());
      }

      const deviceDTO = buildingOrError.getValue();
      return res.json( deviceDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  }

  public async getAllBuildings(req: Request, res: Response, next: NextFunction) {
    try {
        const buildingsOrError = await this.buildingServiceInstance.getAllBuildings() as Result<IBuildingDTO[]>;

        if (buildingsOrError.isFailure) {
            return res.status(402).send(buildingsOrError.errorValue());
        }

        const buildingDTOs = buildingsOrError.getValue();
        return res.json(buildingDTOs).status(200);
    }
    catch (e) {
        return next(e);
    }
}

public async getBuildingsByMaxAndMinFloors(req: Request, res: Response, next: NextFunction) {

  const { min, max } = req.params;

  try {
      const buildingsOrError = await this.buildingServiceInstance.getBuildingsByMaxAndMinFloors(Number(min), Number(max)) as Result<IBuildingDTO[]>;

      /*if (buildingsOrError.isFailure) {
          return res.status(402).send(buildingsOrError.errorValue());
      }

      const buildingDTOs = buildingsOrError.getValue();
      return res.json(buildingDTOs).status(200);*/
      return buildingsOrError;
  }
  catch (e) {
      return next(e);
  }

}

public async getBuildingById(req: Request, res: Response, next: NextFunction) {
  try {
    const buildingOrError = await this.buildingServiceInstance.getBuildingById(req.params.id) as Result<IBuildingDTO>;

    if (buildingOrError.isFailure) {
        return res.status(402).send(buildingOrError.errorValue());
    }

    const buildingDTO = buildingOrError.getValue();
    return res.json(buildingDTO).status(200);
  }
  catch (e) {
    return next(e);
  }

}

}