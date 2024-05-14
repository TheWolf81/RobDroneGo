import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import BuildingController from '../../../src/controllers/BuildingController'
import IBuildingService from '../../../src/services/IServices/IBuildingService';
import { IBuildingDTO } from '../../../src/dto/IBuildingDTO';
import { assert } from 'console';
import { expect } from 'chai';
import { mock, instance, when } from 'ts-mockito';

describe('BuildingController', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
        Container.reset();
        this.timeout(5000);

        // Re-register the necessary services here
        const logger = {
            log: sinon.stub(),
            error: sinon.stub()
        };
        Container.set('logger', logger);


        let BuildingSchemaInstance = require("../../../src/persistence/schemas/BuildingSchema").default;
        Container.set("BuildingSchema", BuildingSchemaInstance);

        let BuildingRepoClass = require("../../../src/repos/BuildingRepo").default;
        let BuildingRepoInstance = Container.get(BuildingRepoClass);
        Container.set("BuildingRepo", BuildingRepoInstance);

        let buildingSchemaInstance = require("../../../src/persistence/schemas/buildingSchema").default;
        Container.set("buildingSchema", buildingSchemaInstance);

        let buildingRepoClass = require("../../../src/repos/BuildingRepo").default;
        let buildingRepoInstance = Container.get(buildingRepoClass);
        Container.set("BuildingRepo", buildingRepoInstance);

        let BuildingServiceClass = require("../../../src/services/BuildingService").default;
        let BuildingServiceInstance = Container.get(BuildingServiceClass);
        Container.set("BuildingService", BuildingServiceInstance);

    });

    afterEach(function () {
        sandbox.restore();
    });
});

//it('createBuilding(): should return a building on success (using mockito)', async () => {
    