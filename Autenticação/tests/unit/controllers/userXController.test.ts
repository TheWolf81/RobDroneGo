import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import UserController from '..//../../src/controllers/userController';
import IUserService from '../../../src/services/IServices/IUserService';
import { IUserDTO } from '../../../src/dto/IUserDTO';
import { expect } from 'chai';
import { mock, instance, when, anything } from 'ts-mockito';
import UserService from '../../../src/services/UserService';
import IUserRepo from '../../../src/services/IRepos/IUserRepo';
import IRoleRepo from '../../../src/services/IRepos/IRoleRepo';
import { User } from '../../../src/domain/user';

describe('User controller tests', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function() {
        Container.reset();
        this.timeout(10000);

        // Re-register the necessary services here
        const logger = {
            log: sinon.stub(),
            error: sinon.stub()
        };
        Container.set('logger', logger);

        let userSchemaInstance = require("../../../src/persistence/schemas/userSchema").default;
        Container.set("userSchema", userSchemaInstance);

        let userRepoClass = require("../../../src/repos/UserRepo").default;
        let userRepoInstance = Container.get(userRepoClass);
        Container.set("UserRepo", userRepoInstance);

        let roleSchemaInstance = require("../../../src/persistence/schemas/roleSchema").default;
        Container.set("roleSchema", roleSchemaInstance);

        let roleRepoClass = require("../../../src/repos/RoleRepo").default;
        let roleRepoInstance = Container.get(roleRepoClass);
        Container.set("RoleRepo", roleRepoInstance);

        let userServiceClass = require("../../../src/services/UserService").default;
        let userServiceInstance = Container.get(userServiceClass);
        Container.set("UserService", userServiceInstance);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('SignUpClient(): should return a token and a userDTO on success (using mockito)', async () => {
        const body = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        password: 'passWORD123.',
        role: 'Client',
        phoneNumber: '912345678',
        nif: '123456789',
        status: 'Requested'
        }

        const req: Partial<Request> = { body };
        const res: Partial<Response> = {};
        const next: Partial<NextFunction> = () => {};

        const userService = mock<IUserService>();
        when(userService.SignUpClient(body)).thenResolve(Result.ok<{ userDTO: IUserDTO; token: string; }>({
            userDTO: {
                firstName: 'John',
                lastName: 'Doe',
                username: 'johndoe',
                email: 'johndoe@gmail.com',
                password: 'passWORD123.',
                role: 'Client',
                phoneNumber: '912345678',
                nif: '123456789',
                status: 'Requested'
            },
            token: 'your-token'
        }))

        const userController = new UserController(instance(userService), console);
        const actualResult = await userController.SignUpClient(req as Request, res as Response, next as NextFunction) as Result<{ userDTO: IUserDTO; token: string; }>;

        expect(actualResult.isSuccess).to.be.true;
        expect(actualResult.getValue().userDTO).to.deep.equal(body);
        expect(actualResult.getValue().token).to.be.a('string');
    });

    it('SignUpClient(): should return failure on failure (using stubs)', async () => {
        const body = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe'
        }
        let req: Partial<Request> = {};

        req.body = body;
        let res: Partial<Response> = { };
        let next: Partial<NextFunction> = () => { };

        let userServiceInstance = Container.get<IUserService>("UserService");
        sinon.stub(userServiceInstance, "SignUpClient").resolves(Result.fail<{ userDTO: IUserDTO; token: string; }>("Error message"));

        let userController = new UserController(userServiceInstance, console);
        let actualResult = await userController.SignUpClient(req as Request, res as Response, next as NextFunction) as Result<{ userDTO: IUserDTO; token: string; }>;

        expect(actualResult.isFailure).to.be.true;
        expect(actualResult.error).to.equal("Error message");
    });

    it('getPendingResgistrationUsers(): should return an array of users on success (using mockito)', async () => {
        const req: any = {
            user: {} // Make sure req.user is an object
        };
        req.user.role = "SystemAdministrator";
        const res: Partial<Response> = {};
        const next: Partial<NextFunction> = () => {};

        const userService = mock<IUserService>();

        // expect result
        const expected = [
        {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@gmail.com', // Empty object for email
            password: '',
            role: 'Client',
            phoneNumber: '912345678', // Empty object for phoneNumber
            nif: '123456789', // Empty object for nif
            status: 'Requested',
        },
         {
            firstName: 'Jane',
            lastName: 'Smith',
            username: 'janesmith',
            email: 'janesmith@gmail.com', // Empty object for email
            password: '',
            role: 'Client',
            phoneNumber: '987654321', // Empty object for phoneNumber
            nif: '987654321', // Empty object for nif
            status: 'Requested',
        },
        
        {
            firstName: 'Bob',
            lastName: 'Miller',
            username: 'bobmiller',
            email: 'bobmiller@gmail.com', // Empty object for email
            password: '',
            role: 'Client',
            phoneNumber: '943987456', // Empty object for phoneNumber
            nif: '789123456', // Empty object for nif
            status: 'Requested',
        }];

        when(userService.getPendingResgistrationUsers(req)).thenResolve(Result.ok<IUserDTO[]>(expected));

        const userController = new UserController(instance(userService), console);
        const actualResult = await userController.getPendingResgistrationUsers(req as Request, res as Response, next as NextFunction) as Result<IUserDTO[]>;

        expect(actualResult.isSuccess).to.be.true;
        expect(actualResult.getValue()).to.deep.equal(expected);

    });

    it('getPendingResgistrationUsers(): should return failure on failure (using stubs)', async () => {
        const req: any = {
            user: {} // Make sure req.user is an object
        };
        req.user.role = "SystemAdministrator";
        const res: Partial<Response> = {};
        const next: Partial<NextFunction> = () => {};


        let userServiceInstance = Container.get<IUserService>("UserService");
        sinon.stub(userServiceInstance, "getPendingResgistrationUsers").resolves(Result.fail<IUserDTO[]>("Error message"));

        const userController = new UserController(userServiceInstance, console);
        const actualResult = await userController.getPendingResgistrationUsers(req as Request, res as Response, next as NextFunction) as Result<IUserDTO[]>;

        expect(actualResult.isFailure).to.be.true;
        expect(actualResult.error).to.equal("Error message");
    });

    it('approveUserRegistration(): should return an user on success (using mockito)', async () => {	
        let req: any = {
            user: {}, // Make sure req.user is an object
            body: {
                firstName: 'John',
                lastName: 'Doe',
                username: 'johndoe',
                email: { value: 'johndoe@gmail.com' },
                password: 'passWORD123.',
                role: { name: 'Client' },
                phoneNumber: { value: '912345678' },
                nif: { value: '123456789' },
                status: { value: 'Requested' }
            },
            newStatus: 'Approved'
        };
        req.user.role = "SystemAdministrator";

        const res: Partial<Response> = {};
        const next: Partial<NextFunction> = () => {};

        const userService = mock<IUserService>();

        when(userService.approveUserRegistration(req)).thenResolve(Result.ok<IUserDTO>({
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@gmail.com', // Empty object for email
            password: '',
            role: 'Client',
            phoneNumber: '912345678', // Empty object for phoneNumber
            nif: '123456789', // Empty object for nif
            status: 'Approved'
        }));

        const userController = new UserController(instance(userService), console);
        const actualResult = await userController.approveUserRegistration(req as Request, res as Response, next as NextFunction) as Result<IUserDTO>;

        expect(actualResult.isSuccess).to.be.true;
        expect(actualResult.getValue()).to.deep.equal({
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@gmail.com', // Empty object for email
            password: '',
            role: 'Client',
            phoneNumber: '912345678', // Empty object for phoneNumber
            nif: '123456789', // Empty object for nif
            status: 'Approved'
        });
    });

    it('approveUserRegistration(): should return failure on failure (using stubs)', async () => {
        let req: any = {
            user: {}, // Make sure req.user is an object
            body: {
                firstName: 'John',
                lastName: 'Doe',
                username: 'johndoe',
                email: { value: 'johndoe@gmail.com' },
                password: 'passWORD123.',
                role: { name: 'Client' },
                phoneNumber: { value: '912345678' },
                nif: { value: '123456789' },
                status: { value: 'Requested' }
            },
            newStatus: 'Approved'
        };
        req.user.role = "SystemAdministrator";

        const res: Partial<Response> = {};
        const next: Partial<NextFunction> = () => {};

        let userServiceInstance = Container.get<IUserService>("UserService");
        sinon.stub(userServiceInstance, "approveUserRegistration").resolves(Result.fail<IUserDTO>("Error message"));

        const userController = new UserController(userServiceInstance, console);
        const actualResult = await userController.approveUserRegistration(req as Request, res as Response, next as NextFunction) as Result<IUserDTO>;

        expect(actualResult.isFailure).to.be.true;
        expect(actualResult.error).to.equal("Error message");
    });

    it('signUpAdmin(): should return a token and a userDTO on success (using mockito)', async () => {
        let request: any = {};
        request.body = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@isep.ipp.pt',
            password: 'passWORD123.',
            role: 'FleetManager',
            phoneNumber: '912345678',
            nif: '123456789',
            status: ''
        }
        request.user = {
            role: 'SystemAdministrator'
        }
        const req: Partial<Request> = request;
        const res: Partial<Response> = {};
        const next: Partial<NextFunction> = () => {};

        const userService = mock<IUserService>();
        when(userService.SignUpAdmin(request.body,request.user)).thenResolve(Result.ok<{ userDTO: IUserDTO; token: string; }>({
                userDTO: {
                    firstName: 'John',
                    lastName: 'Doe',
                    username: 'johndoe',
                    email: 'johndoe@isep.ipp.pt',
                    password: 'passWORD123.',
                    role: 'FleetManager',
                    phoneNumber: '912345678',
                    nif: '123456789',
                    status: 'Approved'
                },
                token: 'your-token'
        }));

        const userController = new UserController(instance(userService), console);
        const actualResult = await userController.SignUpAdmin(req as Request, res as Response, next as NextFunction) as Result<{ userDTO: IUserDTO; token: string; }>;
        req.body.status = 'Approved';
        expect(actualResult.isSuccess).to.be.true;
        expect(actualResult.getValue().userDTO).to.deep.equal(request.body);
        expect(actualResult.getValue().token).to.be.a('string');
    });

    it('signUpAdmin(): should return failure on failure (using stubs)', async () => {
        let request: any = {};
        request.body = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@gmail.com',
            password: 'passWORD123.',
            role: 'FleetManager',
            phoneNumber: '912345678',
            nif: '123456789',
            status: ''
        }
        request.user = {
            role: 'SystemAdministrator'
        }
        const req: Partial<Request> = request;
        const res: Partial<Response> = {};
        const next: Partial<NextFunction> = () => {};

        let userServiceInstance = Container.get<IUserService>("UserService");
        sinon.stub(userServiceInstance, "SignUpAdmin").resolves(Result.fail<{ userDTO: IUserDTO; token: string; }>("Error message"));

        const userController = new UserController(userServiceInstance, console);
        const actualResult = await userController.SignUpAdmin(req as Request, res as Response, next as NextFunction) as Result<{ userDTO: IUserDTO; token: string; }>;

        expect(actualResult.isFailure).to.be.true;
        expect(actualResult.error).to.equal("Error message");
    });

    it('editAccount(): should return a userDTO on success (using mockito)', async () => {
        let request: any = {};
        request.body = {
            firstName: 'Jane',
            lastName: '',
            username: '',
            email: '',
            password: '',
            role: '',
            phoneNumber: '',
            nif: '',
            status: ''
        }
        request.user = {
            role: 'Client'
        }
        const req: Partial<Request> = request;
        const res: Partial<Response> = {};
        const next: Partial<NextFunction> = () => {};

        const userService = mock<IUserService>();
        when(userService.editAccount(request.body,request.user)).thenResolve(Result.ok<IUserDTO>({
            firstName: 'Jane',
            lastName: '',
            username: '',
            email: '',
            password: '',
            role: '',
            phoneNumber: '',
            nif: '',
            status: ''
        }));

        const userController = new UserController(instance(userService), console);
        const actualResult = await userController.editAccount(req as Request, res as Response, next as NextFunction) as Result<IUserDTO>;

        expect(actualResult.isSuccess).to.be.true;
        
    });

    it('editAccount(): should return failure on failure)', async () => {
        let request: any = {};
        request.body = {
            firstName: 'Jane',
            lastName: '',
            username: '',
            email: '',
            password: '',
            role: '',
            phoneNumber: '',
            nif: '',
            status: ''
        }
        request.user = {
            role: 'Fleetmanager'
        }
        const req: Partial<Request> = request;
        const res: Partial<Response> = {};
        const next: Partial<NextFunction> = () => {};

        const userService = mock<IUserService>();
        when(userService.editAccount(request.body,request.user)).thenResolve(Result.fail<IUserDTO>("Error message"));

        const userController = new UserController(instance(userService), console);
        const actualResult = await userController.editAccount(req as Request, res as Response, next as NextFunction) as Result<IUserDTO>;

        expect(actualResult.isFailure).to.be.true;      
    });

    it('deleteAccount(): should return a userDTO on success (using mockito)', async () => {
        let request: any = {};
        request.body = {
            email: 'email@isep.ipp.pt',
            password: 'passWORD123.'
        }
        request.user = {
            role: 'Client'
        }
        const req: Partial<Request> = request;
        const res: Partial<Response> = {};
        const next: Partial<NextFunction> = () => {};

        const userService = mock<IUserService>();
        when(userService.deleteAccount(request)).thenReturn(Result.ok("User deleted successfully!"));
        const userController = new UserController(instance(userService), console);
        const actualResult = await userController.deleteAccount(req as Request, res as Response, next as NextFunction) as Result<IUserDTO>;
        expect(actualResult.isSuccess).to.be.true;
        
    });

    it('deleteAccount(): should return a an error on failure', async () => {
        let request: any = {};
        request.body = {
            email: 'email@isep.ipp.pt',
            password: 'passWORD123.'
        }
        request.user = {
            role: 'Client'
        }
        const req: Partial<Request> = request;
        const res: Partial<Response> = {};
        const next: Partial<NextFunction> = () => {};

        const userService = mock<IUserService>();
        when(userService.deleteAccount(request)).thenReturn(Result.fail("Error"));
        const userController = new UserController(instance(userService), console);
        const actualResult = await userController.deleteAccount(req as Request, res as Response, next as NextFunction) as Result<IUserDTO>;
        expect(actualResult.isFailure).to.be.true;
        
    });



});