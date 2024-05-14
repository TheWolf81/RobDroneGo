import {expect} from 'chai';
import { UserMap } from '../../../src/mappers/UserMap';

describe('User creation test', () => {
    it('should create a valid user', () => {
        const UserDTO = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@gmail.com',
            password: 'passWORD123.',
            role: 'Client',
            phoneNumber: '912345678',
            nif: '123456789',
            status: 'Requested'
        };

        const user = UserMap.toDomain(UserDTO);
        expect(user).to.be.not.null;
    });

    it('should not create a user with invalid first name', () => {
        const UserDTO = {
            firstName: '',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@gmail.com',
            password: 'passWORD123.',
            role: 'Client',
            phoneNumber: '912345678',
            nif: '123456789',
            status: 'Requested'
        };

        const user = UserMap.toDomain(UserDTO);
        expect(user).to.be.empty;
    });

    it('should not create a user with invalid last name', () => {
        const UserDTO = {
            firstName: 'John',
            lastName: '',
            username: 'johndoe',
            email: 'johndoe@gmail.com',
            password: 'passWORD123.',
            role: 'Client',
            phoneNumber: '912345678',
            nif: '123456789',
            status: 'Requested'
        };

        const user = UserMap.toDomain(UserDTO);
        expect(user).to.be.empty;
    });

    it('should not create a user with invalid username', () => {
        const UserDTO = {
            firstName: 'John',
            lastName: 'Doe',
            username: '',
            email: 'johndoe@gmail.com',
            password: 'passWORD123.',
            role: 'Client',
            phoneNumber: '912345678',
            nif: '123456789',
            status: 'Requested'
        };

        const user = UserMap.toDomain(UserDTO);
        expect(user).to.be.empty;
    });

    it('should not create a user with invalid email', () => {
        const UserDTO = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: '',
            password: 'passWORD123.',
            role: 'Client',
            phoneNumber: '912345678',
            nif: '123456789',
            status: 'Requested'
        };

        const user = UserMap.toDomain(UserDTO);
        expect(user).to.be.empty;
    });

    it('should not create a user with invalid password', () => {
        const UserDTO = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@gmail.com',
            password: '',
            role: 'Client',
            phoneNumber: '912345678',
            nif: '123456789',
            status: 'Requested'
        };

        const user = UserMap.toDomain(UserDTO);
        expect(user).to.be.empty;
    });

    it('should not create a user with invalid role', () => {
        const UserDTO = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@gmail.com',
            password: 'passWORD123.',
            role: '',
            phoneNumber: '912345678',
            nif: '123456789',
            status: 'Requested'
        };

        const user = UserMap.toDomain(UserDTO);
        expect(user).to.be.empty;
    });

    it('should not create a user with invalid phone number', () => {
        const UserDTO = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@gmail.com',
            password: 'passWORD123.',
            role: 'Client',
            phoneNumber: '',
            nif: '123456789',
            status: 'Requested'
        };

        const user = UserMap.toDomain(UserDTO);
        expect(user).to.be.empty;
    });

    it('should not create a user with invalid NIF', () => {
        const UserDTO = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@gmail.com',
            password: 'passWORD123.',
            role: 'Client',
            phoneNumber: '912345678',
            nif: '',
            status: 'Requested'
        };

        const user = UserMap.toDomain(UserDTO);
        expect(user).to.be.empty;
    });

    it('should not create a user with invalid status', () => {
        const UserDTO = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@gmail.com',
            password: 'passWORD123.',
            role: 'Client',
            phoneNumber: '912345678',
            nif: '123456789',
            status: ''
        };

        const user = UserMap.toDomain(UserDTO);
        expect(user).to.be.empty;
    });


});