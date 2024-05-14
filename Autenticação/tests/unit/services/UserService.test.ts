import 'reflect-metadata';
import * as sinon from 'sinon';
import { Container } from 'typedi';
import { expect } from 'chai';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import IUserRepo from '../../../src/services/IRepos/IUserRepo';
import IRoleRepo from '../../../src/services/IRepos/IRoleRepo'; 
import IUserController from '../../../src/controllers/IControllers/IUserController';
import iUserService from '../../../src/services/IServices/IUserService';
import UserService from '../../../src/services/UserService';
import { IUserDTO } from '../../../src/dto/IUserDTO';
import { User } from '../../../src/domain/user';
import { UserMap } from '../../../src/mappers/UserMap';
import { Response, Request, NextFunction } from 'express';
import { Result } from '../../../src/core/logic/Result';
import { Role } from '../../../src/domain/role';
import IUserService from '../../../src/services/IServices/IUserService';
import { Status } from '../../../src/domain/status';
import exp from 'constants';
import { PhoneNumber } from '../../../src/domain/phoneNumber';
import { Nif } from '../../../src/domain/nif';
import { UserPassword } from '../../../src/domain/userPassword';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
describe('User Service Test', function () {

    let userService: UserService;
    let userRepo: IUserRepo;
    let roleRepo: IRoleRepo;

    const sandbox = sinon.createSandbox();

    beforeEach(() => {

        Container.reset();

        const logger = {
            log: sinon.stub(),
            error: sinon.stub(),
            silly: sinon.stub()
        };
        Container.set('logger', logger);

    let userSchemaInstance = require("../../../src/persistence/schemas/userSchema").default;
    Container.set("userSchema", userSchemaInstance);

    let userMapper = require("../../../src/mappers/UserMap").default;
    Container.set("UserMapper", userMapper);

    let userRepoClass = require("../../../src/repos/UserRepo").default;
    let userRepoInstance = Container.get(userRepoClass);
    Container.set("UserRepo", userRepoInstance);

    // erro a partir daqui
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

it('SignUpClient(): should return an user on success (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    const mockUserDTO = {
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

    when(userRepo.findByEmail(anything())).thenResolve(null as any);
    when(userRepo.findByUsername(anything())).thenResolve(null as any);
    when(userRepo.findByPhoneNumber(anything())).thenResolve(null as any);
    when(userRepo.findByNif(anything())).thenResolve(null as any);
    const clientRole = Role.create({name: 'Client', id: '1'});
    when(roleRepo.findByName(anything())).thenResolve(clientRole.getValue() as any);

    const result = await userService.SignUpClient(mockUserDTO);
    mockUserDTO.password = "";

    expect(result.isSuccess).to.be.true;
    expect(result.getValue().userDTO).to.deep.equal(mockUserDTO);
    expect(result.getValue().token).to.be.a('string'); // Assuming token should be a string    

  });

  it('SignUpClient(): should return failure on failure (using stubs)', async () => {
    const logger = {
        log: sinon.stub(),
        error: sinon.stub(),
        silly: sinon.stub()
    };

    Container.set('logger', logger);

    let userServiceInstance = Container.get<IUserService>(UserService);
    let userRepoInstance = Container.get<IUserRepo>("UserRepo");
    let roleRepoInstance = Container.get<IRoleRepo>("RoleRepo");

    const existsUser = {
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

    const newUser = {
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

    sinon.stub(userRepoInstance, "findByEmail").resolves(existsUser as unknown as User);
    sinon.stub(userRepoInstance, "findByUsername").resolves(existsUser as unknown as User);
    sinon.stub(userRepoInstance, "findByPhoneNumber").resolves(existsUser as unknown as User);
    sinon.stub(userRepoInstance, "findByNif").resolves(existsUser as unknown as User);
    const clientRole = Role.create({name: 'Client', id: '1'});
    sinon.stub(roleRepoInstance, "findByName").resolves(clientRole.getValue() as any);

    const actual = await userServiceInstance.SignUpClient(newUser);
    expect(actual.isFailure).to.be.true;
    expect(actual.error).to.equal("User already exists with email=" + newUser.email);
  });

  it('getPendingResgistrationUsers(): should return an array of users on success (integration) (using stubs)', async () => {
    let req: any = {
        user: {} // Make sure req.user is an object
    };
    req.user.role = "SystemAdministrator";

    // array of users in the database
    const user1 = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email:'johndoe@gmail.com',
        password: 'passWORD123.',
        role: 'Client',
        phoneNumber: '912345678',
        nif: '123456789',
        status: 'Requested'
    };
    
    const user2 = {
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        email: 'janesmith@gmail.com',
        password: 'securePASS456!',
        role: 'Client',
        phoneNumber: '987654321',
        nif: '987654321',
        status: 'Requested'
    };
    
    const user3 = {
        firstName: 'Alice',
        lastName: 'Johnson',
        username: 'alicejohnson',
        email: 'alicejohnson@gmail.com',
        password: 'strongPWD789@',
        role: 'Admin',
        phoneNumber: '965555555',
        nif: '555555555',
        status: 'Denied'
    };
    
    const user4 = {
        firstName: 'Bob',
        lastName: 'Miller',
        username: 'bobmiller',
        email: 'bobmiller@gmail.com',
        password: 'secret123!',
        role: 'Client',
        phoneNumber: '943987456',
        nif: '789123456',
        status: 'Requested'
    };
    
    const user5 = {
        firstName: 'Eva',
        lastName: 'Clark',
        username: 'eclark',
        email: 'eclark@gmail.com',
        password: 'evasPWD!456',
        role: 'Client',
        phoneNumber: '926543210',
        nif: '456789123',
        status: 'Approved'
    };    

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
        }
        
    ];

    let userServiceInstance = Container.get<IUserService>(UserService);
    let userSchemaInstance = Container.get("userSchema");
    let roleSchemaInstance = Container.get("roleSchema");

    sandbox.stub(roleSchemaInstance, "findOne").resolves({
        name: 'Client'
    } as any);
    
    sandbox.stub(userSchemaInstance, "find").resolves([user1, user2, user3, user4, user5] as any);

    const actual = await userServiceInstance.getPendingResgistrationUsers(req);

    expect(actual.isSuccess).to.be.true;
    expect(actual.getValue()).to.have.length(3);
    expect(actual.getValue()).to.deep.equal(expected);
  });

  it('getPendingResgistrationUsers(): should return an array of users on success (using stubs)', async () => {
    let req: any = {
        user: {} // Make sure req.user is an object
    };
    req.user.role = "SystemAdministrator";

    // array of users in the database
    const user1 = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: { value: 'johndoe@gmail.com' },
        password: 'passWORD123.',
        role: { name: 'Client' },
        phoneNumber: { value: '912345678' },
        nif: { value: '123456789' },
        status: { value: 'Requested' }
    };
    
    const user2 = {
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        email: { value: 'janesmith@gmail.com' },
        password: 'securePASS456!',
        role: { name: 'Client' },
        phoneNumber: { value: '987654321' },
        nif: { value: '987654321' },
        status: { value: 'Requested' }
    };
    
    const user3 = {
        firstName: 'Alice',
        lastName: 'Johnson',
        username: 'alicejohnson',
        email: { value: 'alicejohnson@gmail.com' },
        password: 'strongPWD789@',
        role: { name: 'Admin' },
        phoneNumber: { value: '965555555' },
        nif: { value: '555555555' },
        status: { value: 'Denied' }
    };
    
    const user4 = {
        firstName: 'Bob',
        lastName: 'Miller',
        username: 'bobmiller',
        email: { value: 'bobmiller@gmail.com' },
        password: 'secret123!',
        role: { name: 'Client' },
        phoneNumber: { value: '943987456' },
        nif: { value: '789123456' },
        status: { value: 'Requested' }
    };
    
    const user5 = {
        firstName: 'Eva',
        lastName: 'Clark',
        username: 'eclark',
        email: { value: 'eclark@gmail.com' },
        password: 'evasPWD!456',
        role: { name: 'Client' },
        phoneNumber: { value: '926543210' },
        nif: { value: '456789123' },
        status: { value: 'Approved' }
    };

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
        }
        
    ];
    
    
    let userServiceInstance = Container.get<IUserService>(UserService);
    let userRepoInstance = Container.get<IUserRepo>("UserRepo");

    sinon.stub(userRepoInstance, "findAll").resolves([user1, user2, user3, user4, user5] as unknown as User[]);
    const actual = await userServiceInstance.getPendingResgistrationUsers(req);

    expect(actual.isSuccess).to.be.true;
    expect(actual.getValue()).to.have.length(3);
    expect(actual.getValue()).to.deep.equal(expected);
    
});

it('getPendingResgistrationUsers(): should return failure if theres no users (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    let req: any = {
        user: {} // Make sure req.user is an object
    };
    req.user.role = "SystemAdministrator";

    when(userRepo.findAll()).thenResolve(null as any);

    const actual = await userService.getPendingResgistrationUsers(req);
    expect(actual.isFailure).to.be.true;
    expect(actual.error).to.equal("Couldn't find users");
});

it('getPendingResgistrationUsers(): should return failure if user role is not SystemAdministrator', async () => {
    let req: any = {
        user: {} // Make sure req.user is an object
    };
    req.user.role = "CampusManager";    
    
    let userServiceInstance = Container.get<IUserService>(UserService);

    const actual = await userServiceInstance.getPendingResgistrationUsers(req);

    expect(actual.isFailure).to.be.true;
    expect(actual.error).to.equal("User not authorized to view user registration requests");

});

it('approveUserRegistration(): should return an user on success (using stubs)', async () => {
    let req: any = {
        user: {} // Make sure req.user is an object
    };
    req.user.role = "SystemAdministrator";

    const user1 = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: { value: 'johndoe@gmail.com' },
        password: 'passWORD123.',
        role: { name: 'Client' },
        phoneNumber: { value: '912345678' },
        nif: { value: '123456789' },
        status: { value: 'Requested' }
    };

    req.body = user1;
    req.body.newStatus = "Approved";

    const expected = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@gmail.com', // Empty object for email
        password: '',
        role: 'Client',
        phoneNumber: '912345678', // Empty object for phoneNumber
        nif: '123456789', // Empty object for nif
        status: 'Approved'
    };

    let userServiceInstance = Container.get<IUserService>(UserService);
    let userRepoInstance = Container.get<IUserRepo>("UserRepo");

    sinon.stub(userRepoInstance, "findByEmail").resolves(user1 as unknown as User);
    sinon.stub(userRepoInstance, "save").resolves(expected as unknown as User);

    const actual = await userServiceInstance.approveUserRegistration(req);
    
    expect(actual.isSuccess).to.be.true;
    expect(actual.getValue()).to.deep.equal(expected);
    expect(actual.getValue().status).to.equal("Approved");
});

it('approveUserRegistration(): should return failure if user role is not SystemAdministrator', async () => {
    let req: any = {
        user: {} // Make sure req.user is an object
    };
    req.user.role = "CampusManager";    
    
    let userServiceInstance = Container.get<IUserService>(UserService);

    const actual = await userServiceInstance.approveUserRegistration(req);

    expect(actual.isFailure).to.be.true;
    expect(actual.error).to.equal("User not authorized to handle user registration requests");

});

it('approveUserRegistration(): should return failure if user is not found (using stubs)', async () => {
    let req: any = {
        user: {} // Make sure req.user is an object
    };
    req.user.role = "SystemAdministrator";

    let userServiceInstance = Container.get<IUserService>(UserService);
    let userRepoInstance = Container.get<IUserRepo>("UserRepo");

    const user1 = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: { value: 'johndoe@gmail.com' },
        password: 'passWORD123.',
        role: { name: 'Client' },
        phoneNumber: { value: '912345678' },
        nif: { value: '123456789' },
        status: { value: 'Requested' }
    };

    req.body = user1;

    sinon.stub(userRepoInstance, "findByEmail").resolves(null as any);

    const actual = await userServiceInstance.approveUserRegistration(req);

    expect(actual.isFailure).to.be.true;
    expect(actual.error).to.equal("Couldn't find user");
});

it('approveUserRegistration(): should return failure if user status is not Requested (using stubs) (1)', async () => {
    let req: any = {
        user: {} // Make sure req.user is an object
    };
    req.user.role = "SystemAdministrator";

    let userServiceInstance = Container.get<IUserService>(UserService);
    let userRepoInstance = Container.get<IUserRepo>("UserRepo");

    const user1 = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: { value: 'johndoe@gmail.com' },
        password: 'passWORD123.',
        role: { name: 'Client' },
        phoneNumber: { value: '912345678' },
        nif: { value: '123456789' },
        status: { value: 'Approved' }
    };

    req.body = user1;

    sinon.stub(userRepoInstance, "findByEmail").resolves(user1 as unknown as User);

    const actual = await userServiceInstance.approveUserRegistration(req);
    expect(actual.isFailure).to.be.true;
    expect(actual.error).to.equal("This request has already been processed");

});    

it('approveUserRegistration(): should return failure if user status is not Requested (using stubs) (2)', async () => {
    let req: any = {
        user: {} // Make sure req.user is an object
    };
    req.user.role = "SystemAdministrator";

    let userServiceInstance = Container.get<IUserService>(UserService);
    let userRepoInstance = Container.get<IUserRepo>("UserRepo");

    const user1 = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: { value: 'johndoe@gmail.com' },
        password: 'passWORD123.',
        role: { name: 'Client' },
        phoneNumber: { value: '912345678' },
        nif: { value: '123456789' },
        status: { value: 'Denied' }
    };

    req.body = user1;

    sinon.stub(userRepoInstance, "findByEmail").resolves(user1 as unknown as User);

    const actual = await userServiceInstance.approveUserRegistration(req);
    expect(actual.isFailure).to.be.true;
    expect(actual.error).to.equal("This request has already been processed");
});

it('requestDataCopy(): should return an user on success (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    const req: any = {
        token: {
            email: 'johndoe@gmail.com'
        }
    };

    const expected = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@gmail.com', // Empty object for email
        phoneNumber: '912345678', // Empty object for phoneNumber
        nif: '123456789'
    };

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    when(userRepo.findByEmail(anything())).thenResolve({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: { value: 'johndoe@gmail.com' },
    password: 'passWORD123.',
    role: { name: 'Client' },
    phoneNumber: { value: '912345678' },
    nif: { value: '123456789' },
    status: { value: 'Approved' }} as unknown as User);

    const result = await userService.requestDataCopy(req);

    expect(result.isSuccess).to.be.true;
    expect(result.getValue()).to.deep.equal(expected);

});

it('requestDataCopy(): should return an user on success (integration) (using stubs)', async () => {
    const req: any = {
        token: {
            email: 'johndoe@gmail.com'
        }
    };

    const expected = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@gmail.com', // Empty object for email
        phoneNumber: '912345678', // Empty object for phoneNumber
        nif: '123456789'
    };

    let userServiceInstance = Container.get<IUserService>(UserService);
    let userSchemaInstance = Container.get("userSchema");
    let roleSchemaInstance = Container.get("roleSchema");

    sandbox.stub(roleSchemaInstance, "findOne").resolves({
        name: 'Client'
    } as any);

    sandbox.stub(userSchemaInstance, "findOne").resolves({
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@gmail.com', // Empty object for email
        password: '',
        role: 'Client',
        phoneNumber: '912345678', // Empty object for phoneNumber
        nif: '123456789', // Empty object for nif
        status: 'Approved'
    } as any);

    const actual = await userServiceInstance.requestDataCopy(req);

    expect(actual.isSuccess).to.be.true;
    expect(actual.getValue()).to.deep.equal(expected);

});

it('requestDataCopy(): should return failure if there is not a valid email present (using stubs)', async () => {
    let req: any = {
        token: {
            email: 'invalid'
        }
    };

    let userServiceInstance = Container.get<IUserService>(UserService);
    let userRepoInstance = Container.get<IUserRepo>("UserRepo");

    sinon.stub(userRepoInstance, "findByEmail").resolves(null as any);

    const actual = await userServiceInstance.requestDataCopy(req);

    expect(actual.isFailure).to.be.true;
    expect(actual.error).to.equal("Couldn't find user");
});

it('requestDataCopy(): should return failure if there is not a valid email present (integration) (using stubs)', async () => {
    let req: any = {
        token: {
            email: 'invalid'
        }
    };

    let userServiceInstance = Container.get<IUserService>(UserService);
    let userSchemaInstance = Container.get("userSchema");

    sandbox.stub(userSchemaInstance, "findOne").resolves(null as any);

    const actual = await userServiceInstance.requestDataCopy(req);

    expect(actual.isFailure).to.be.true;
    expect(actual.error).to.equal("Couldn't find user");
});

it('signUpAdmin(): should return an "Approved" fleet manager user on success (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    const mockUserDTO = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@isep.ipp.pt',
        password: 'passWORD123.',
        role: 'FleetManager',
        phoneNumber: '912345678',
        nif: '123456789',
        status: ''
    }

    const user: any = {};
    user.role = "SystemAdministrator";
    
        when(userRepo.findByEmail(anything())).thenResolve(null as any);
        when(userRepo.findByUsername(anything())).thenResolve(null as any);
        when(userRepo.findByPhoneNumber(anything())).thenResolve(null as any);
        when(userRepo.findByNif(anything())).thenResolve(null as any);
        const FMRole = Role.create({name: 'FleetManager', id: '1'});
        when(roleRepo.findByName(anything())).thenResolve(FMRole.getValue() as any);
        
        const result = await userService.SignUpAdmin(mockUserDTO,user);
        mockUserDTO.password = "";
        mockUserDTO.status = "Approved";
        
        expect(result.isSuccess).to.be.true;
        expect(result.getValue().userDTO).to.deep.equal(mockUserDTO);
        expect(result.getValue().token).to.be.a('string'); // Assuming token should be a string
    });

it('signUpAdmin(): should not be able to set the status in the request (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    const mockUserDTO = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@isep.ipp.pt',
        password: 'passWORD123.',
        role: 'FleetManager',
        phoneNumber: '912345678',
        nif: '123456789',
        status: 'Requested'
    }

    const user: any = {};
    user.role = "SystemAdministrator";
    
    when(userRepo.findByEmail(anything())).thenResolve(null as any);
    when(userRepo.findByUsername(anything())).thenResolve(null as any);
    when(userRepo.findByPhoneNumber(anything())).thenResolve(null as any);
    when(userRepo.findByNif(anything())).thenResolve(null as any);
    const FMRole = Role.create({name: 'FleetManager', id: '1'});
    when(roleRepo.findByName(anything())).thenResolve(FMRole.getValue() as any);
    
    const result = await userService.SignUpAdmin(mockUserDTO,user);
    mockUserDTO.password = "";
    
    expect(result.isSuccess).to.be.true;
    expect(result.getValue().userDTO.status).to.not.equal(mockUserDTO.status);
    expect(result.getValue().token).to.be.a('string'); // Assuming token should be a string
});

it('signUpAdmin(): should not be able to sign up if requesting user is not an admin (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    const mockUserDTO = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@isep.ipp.pt',
        password: 'passWORD123.',
        role: 'FleetManager',
        phoneNumber: '912345678',
        nif: '123456789',
        status: 'Requested'
    }

    const user: any = {};
    user.role = "FleetManager";
    
    when(userRepo.findByEmail(anything())).thenResolve(null as any);
    when(userRepo.findByUsername(anything())).thenResolve(null as any);
    when(userRepo.findByPhoneNumber(anything())).thenResolve(null as any);
    when(userRepo.findByNif(anything())).thenResolve(null as any);
    const FMRole = Role.create({name: 'FleetManager', id: '1'});
    when(roleRepo.findByName(anything())).thenResolve(FMRole.getValue() as any);
    
    const result = await userService.SignUpAdmin(mockUserDTO,user);
    mockUserDTO.password = "";
    
    expect(result.isFailure).to.be.true;
});

it('signUpAdmin(): should not be able to sign up user already exists (using stubs)', async () => {
    const logger = {
        log: sinon.stub(),
        error: sinon.stub(),
        silly: sinon.stub()
    };

    Container.set('logger', logger);

    let userServiceInstance = Container.get<IUserService>(UserService);
    let userRepoInstance = Container.get<IUserRepo>("UserRepo");
    let roleRepoInstance = Container.get<IRoleRepo>("RoleRepo");

    const existsUser = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        password: 'passWORD123.',
        role: 'Client',
        phoneNumber: '912345678',
        nif: '123456789',
        status: 'Approved'
    }

    const newUser = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        password: 'passWORD123.',
        role: 'Client',
        phoneNumber: '912345678',
        nif: '123456789',
        status: ''
    }

    const user: any = {};
    user.role = "SystemAdministrator";

    sinon.stub(userRepoInstance, "findByEmail").resolves(existsUser as unknown as User);
    sinon.stub(userRepoInstance, "findByUsername").resolves(existsUser as unknown as User);
    sinon.stub(userRepoInstance, "findByPhoneNumber").resolves(existsUser as unknown as User);
    sinon.stub(userRepoInstance, "findByNif").resolves(existsUser as unknown as User);
    const clientRole = Role.create({name: 'Client', id: '1'});
    sinon.stub(roleRepoInstance, "findByName").resolves(clientRole.getValue() as any);

    const actual = await userServiceInstance.SignUpAdmin(newUser,user);
    expect(actual.isFailure).to.be.true;
    expect(actual.error).to.equal("User email already in use");
  });
  
  it('editAccount(): should edit firstName (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    const mockUserDTO = {
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

    const user: any = {};
    user.role = "Client";
    when(userRepo.findById(anything())).thenResolve({
        firstName: '',
        lastName: 'Doe',
        username: '',
        email: '',
        role: '',
        phoneNumber: '',
        nif: '',
        status: ''
    } as unknown as User);

    const result = await userService.editAccount(mockUserDTO,user);

    expect(result.getValue().firstName).to.deep.equal(mockUserDTO.firstName);
    expect(result.isSuccess).to.be.true;
  });

  it('editAccount(): should edit lastName (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    const mockUserDTO = {
        firstName: '',
        lastName: 'Smith',
        username: '',
        email: '',
        password: '.',
        role: '',
        phoneNumber: '',
        nif: '',
        status: ''
    }

    const user: any = {};
    user.role = "Client";
    when(userRepo.findById(anything())).thenResolve({
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'jd@isep.ipp.pt',
        role: 'Client',
        phoneNumber: '912345678',
        nif: '123456789',
        status: 'Approved'
    } as unknown as User);

    const result = await userService.editAccount(mockUserDTO,user);


    expect(result.getValue().lastName).to.deep.equal(mockUserDTO.lastName);
    expect(result.isSuccess).to.be.true;
  });

  it('editAccount(): should edit username (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    const mockUserDTO = {
        firstName: '',
        lastName: '',
        username: 'babel',
        email: '',
        password: '',
        role: '',
        phoneNumber: '',
        nif: '',
        status: ''
    }

    const user: any = {};
    user.role = "Client";
    when(userRepo.findById(anything())).thenResolve({
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'jd@isep.ipp.pt',
        role: 'Client',
        phoneNumber: '912345678',
        nif: '123456789',
        status: 'Approved'
    } as unknown as User);

    const result = await userService.editAccount(mockUserDTO,user);

    expect(result.getValue().username).to.deep.equal(mockUserDTO.username);
    expect(result.isSuccess).to.be.true;
  });

  it('editAccount(): should edit email (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    const mockUserDTO = {
        firstName: '',
        lastName: '',
        username: '',
        email: 'amd@isep.ipp.pt',
        password: '',
        role: '',
        phoneNumber: '',
        nif: '',
        status: ''
    }

    const user: any = {};
    user.role = "Client";
    when(userRepo.findById(anything())).thenResolve({
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'jd@isep.ipp.pt',
        role: 'Client',
        phoneNumber: '912345678',
        nif: '123456789',
        status: 'Approved'
    } as unknown as User);

    const result = await userService.editAccount(mockUserDTO,user);

    expect(result.getValue().email).to.deep.equal(mockUserDTO.email);
    expect(result.isSuccess).to.be.true;
  });

  it('editAccount(): should edit phone number (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    const mockUserDTO = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        role: '',
        phoneNumber: '921111111',
        nif: '',
        status: ''
    }

    const user: any = {};
    user.role = "Client";
    when(userRepo.findById(anything())).thenResolve({
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'jd@isep.ipp.pt',
        role: 'Client',
        phoneNumber: '912345678',
        nif: '123456789',
        status: 'Approved'
    } as unknown as User);

    const result = await userService.editAccount(mockUserDTO,user);

    expect(result.getValue().phoneNumber).to.deep.equal(mockUserDTO.phoneNumber);
    expect(result.isSuccess).to.be.true;
  });

  it('editAccount(): should edit nif (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    const mockUserDTO = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        role: '',
        phoneNumber: '',
        nif: '111111111',
        status: ''
    }

    const user: any = {};
    user.role = "Client";
    when(userRepo.findById(anything())).thenResolve({
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'jd@isep.ipp.pt',
        role: 'Client',
        phoneNumber: '912345678',
        nif: '123456789',
        status: 'Approved'
    } as unknown as User);

    const result = await userService.editAccount(mockUserDTO,user);

    expect(result.getValue().nif).to.deep.equal(mockUserDTO.nif);
    expect(result.isSuccess).to.be.true;
  });
    
  it('editAccount(): should not edit if role is not client', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();

    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));

    const mockUserDTO = {
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

    const user: any = {};
    user.role = "FleetManager";
    when(userRepo.findById(anything())).thenResolve({
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'jd@isep.ipp.pt',
        role: 'Client',
        phoneNumber: '912345678',
        nif: '123456789',
        status: 'Approved'
    } as unknown as User);

    const result = await userService.editAccount(mockUserDTO,user);

    expect(result.isFailure).to.be.true;
  });

  it('deleteAccount(): should delete account (using mockito)', async () => {
    let logger1 = mock<any>();
    roleRepo = mock<IRoleRepo>();
    userRepo = mock<IUserRepo>();


    userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));
    const req: any = {};
    req.body = {
        email: 'email@isep.ipp.pt',
        password: 'Client12'
    }
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash("Client12", { salt });
    when(userRepo.findByEmail(anything())).thenResolve({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'email@isep.ipp.pt',
        role: Role.create({name: 'Client', id: '1'}).getValue(),
        password: await UserPassword.create({ value: hashedPassword, hashed: true}).getValue(),
        phoneNumber: '912345678',
        nif: '123456789',
        status: 'Approved'
        } as unknown as User);
    when(userRepo.deleteById(anything())).thenResolve(null as any);
    const result = await userService.deleteAccount(req);

    expect(result.isSuccess).to.be.true;
    });

    it('deleteAccount(): should not delete account if password does not match (using mockito)', async () => {
        let logger1 = mock<any>();
        roleRepo = mock<IRoleRepo>();
        userRepo = mock<IUserRepo>();
    
    
        userService = new UserService(instance(userRepo), instance(roleRepo), instance(logger1));
        const req: any = {};
        req.body = {
            email: 'email@isep.ipp.pt',
            password: 'Client12'
        }
        const salt = randomBytes(32);
        const hashedPassword = await argon2.hash("Client123", { salt });
        when(userRepo.findByEmail(anything())).thenResolve({
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'email@isep.ipp.pt',
            role: Role.create({name: 'Client', id: '1'}).getValue(),
            password: await UserPassword.create({ value: hashedPassword, hashed: true}).getValue(),
            phoneNumber: '912345678',
            nif: '123456789',
            status: 'Approved'
            } as unknown as User);
        when(userRepo.deleteById(anything())).thenResolve(null as any);
        const result = await userService.deleteAccount(req);
    
        expect(result.isFailure).to.be.true;
        });

});