import * as sinon from 'sinon';
import { Container } from 'typedi';
import { expect } from 'chai';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { RobotMapper } from "../../../src/mappers/RobotMap";
import ITypeOfRobotRepo from "../../../src/services/IRepos/ITypeOfRobotRepo";
import { Robot } from "../../../src/domain/robot";
import IRobotService from "../../../src/services/IServices/IRobotService";
import RobotService from '../../../src/services/RobotService';
import IRobotRepo from '../../../src/services/IRepos/IRobotRepo';
import { IRobotDTO } from '../../../src/dto/IRobotDTO';
describe('Robot Service test', function () {

    let robotService: RobotService;
    let robotRepo: IRobotRepo;
    let typeOfRobotRepo: ITypeOfRobotRepo;
    let logger = mock<any>();
    const sandbox = sinon.createSandbox();
    beforeEach(() => {

        Container.reset();
        this.timeout(5000);

        const logger = {
            log: sinon.stub(),
            error: sinon.stub(),
            silly: sinon.stub()
        };
        Container.set('logger', logger);

        let robotSchemaInstance = require("../../../src/persistence/schemas/robotSchema").default;
        Container.set("robotSchema", robotSchemaInstance);

        let typeOfRobotSchemaInstance = require("../../../src/persistence/schemas/typeOfRobotSchema").default;
        Container.set("typeOfRobotSchema", typeOfRobotSchemaInstance);

        let robotRepoClass = require("../../../src/repos/RobotRepo").default;
        let robotRepoInstance = Container.get(robotRepoClass);
        Container.set("RobotRepo", robotRepoInstance);

        let typeOfRobotRepoClass = require("../../../src/repos/TypeOfRobotRepo").default;
        let typeOfRobotRepoInstance = Container.get(typeOfRobotRepoClass);
        Container.set("TypeOfRobotRepo", typeOfRobotRepoInstance);

        let robotServiceClass = require("../../../src/services/robotService").default;
        let robotServiceInstance = Container.get(robotServiceClass);
        Container.set("RobotService", robotServiceInstance);
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('createRobot(): should return a robot on success (using mockito)', async function () {
        robotRepo = mock<IRobotRepo>();
        typeOfRobotRepo = mock<ITypeOfRobotRepo>();
        robotService = new RobotService(instance(logger), instance(typeOfRobotRepo), instance(robotRepo),);
        const robotDTO = {
            DomainId: "11",
            nickname: 'robot1',
            typeOfRobotId: '1',
            StateOfRobot: true,
        };
        const robot = RobotMapper.toDomain(robotDTO);
        const robotOrError = Robot.create((await robot).props, (await robot).id);
        when(robotRepo.exists(anything())).thenResolve(true);
        when(robotRepo.findByDomainId(anything())).thenResolve(robotOrError.getValue());
        when(robotRepo.save(anything())).thenResolve();

        const result = await robotService.createDevice(robotDTO);
        robotDTO.DomainId = (result as any).getValue().DomainId;


        expect(result.isSuccess).to.be.true;
        expect(result.getValue()).to.deep.equal(robotDTO);

    });

    it('createRobot(): should return a robot on success (using stubs)', async function () {
        const logger = {
            log: sinon.stub(),
            error: sinon.stub(),
            silly: sinon.stub()
        };

        Container.set('logger', logger);
        let robotRepoInstance = Container.get<IRobotRepo>("RobotRepo");
        let typeOfRobotRepoInstance = Container.get<ITypeOfRobotRepo>("TypeOfRobotRepo");
        let robotServiceInstance = Container.get<IRobotService>("RobotService");
        sinon.stub(typeOfRobotRepoInstance, "exists").resolves(true);
        sinon.stub(robotRepoInstance, "save").resolves({} as Robot);

        const robotDTO = {
            DomainId: "11",
            nickname: 'robot1',
            typeOfRobotId: '1',
            StateOfRobot: true,
        };
        const actual = await robotServiceInstance.createDevice(robotDTO);
        robotDTO.DomainId = (actual as any).getValue().DomainId;
        expect(actual.isSuccess).to.be.true;
        expect(actual.getValue()).to.deep.equal(robotDTO);

    });
    it('inibirRobot(): should inibir a robot on success (using stubs)', async function () {
        const logger = {
            log: sinon.stub(),
            error: sinon.stub(),
            silly: sinon.stub()
        };

        Container.set('logger', logger);
        let robotRepoInstance = Container.get<IRobotRepo>("RobotRepo");
        let typeOfRobotRepoInstance = Container.get<ITypeOfRobotRepo>("TypeOfRobotRepo");
        let robotServiceInstance = Container.get<IRobotService>("RobotService");
        sinon.stub(robotRepoInstance, "save").resolves({} as Robot);

        const robotDTO = {
            DomainId: "11",
            nickname: 'robot1',
            typeOfRobotId: '1',
            StateOfRobot: true,
        };

        sinon.stub(robotRepoInstance, "findByDomainId").resolves(robotDTO as unknown as Robot);
        sinon.stub(RobotMapper, "toDTO").returns(robotDTO as unknown as IRobotDTO);

        const actual = await robotServiceInstance.inibirRobot(robotDTO.DomainId);
        expect(actual.isSuccess).to.be.true;
        expect(actual.getValue().StateOfRobot).to.be.false;

    });
}
);
