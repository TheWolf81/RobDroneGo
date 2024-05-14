import {expect} from 'chai';
import { UserPassword } from '../../../src/domain/userPassword';
import exp from 'constants';

describe('UserPassword creation test', () => {

    interface UserPasswordProps {
        value: string;
        hashed?: boolean;
      }

    it('should create a valid password', () => {
        const props = {value: 'ABCD1234test', hashed: false} as UserPasswordProps;
        const password = UserPassword.create(props);
        expect(password.isSuccess).to.equal(true);
    });

    it('should not create a password with empty string', () => {
        const props = {value: '', hashed: false} as UserPasswordProps;
        const password = UserPassword.create(props);
        expect(password.isFailure).to.equal(true);
        expect(password.error).to.equal('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].');
    });

    it('should not create a password with null value', () => {
        const props = {value: null as any, hashed: false} as UserPasswordProps;
        const password = UserPassword.create(props);
        expect(password.isFailure).to.equal(true);
        expect(password.error).to.equal('password is null or undefined');    });

    it('should not create a password with undefined value', () => {
        const props = {value: undefined as any, hashed: false} as UserPasswordProps;
        const password = UserPassword.create(props);
        expect(password.isFailure).to.equal(true);
        expect(password.error).to.equal('password is null or undefined');
    });

    it('should not create a password with blank string', () => {
        const props = {value: ' ', hashed: false} as UserPasswordProps;
        const password = UserPassword.create(props);
        expect(password.isFailure).to.equal(true);
        expect(password.error).to.equal('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].');
    });

    it('should not create a password with less than 8 characters', () => {
        const props = {value: 'ABCD123', hashed: false} as UserPasswordProps;
        const password = UserPassword.create(props);
        expect(password.isFailure).to.equal(true);
        expect(password.error).to.equal('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].');
    });

    it('should not create a password with only letters', () => {
        const props = {value: 'abcdefgh', hashed: false} as UserPasswordProps;
        const password = UserPassword.create(props);
        expect(password.isFailure).to.equal(true);
        expect(password.error).to.equal('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].');
    });

    it('should not create a password with only numbers', () => {
        const props = {value: '12345678', hashed: false} as UserPasswordProps;
        const password = UserPassword.create(props);
        expect(password.isFailure).to.equal(true);
        expect(password.error).to.equal('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].');
    });

    it('should not create a password with only symbols', () => {
        const props = {value: '!@#$%^&*', hashed: false} as UserPasswordProps;
        const password = UserPassword.create(props);
        expect(password.isFailure).to.equal(true);
        expect(password.error).to.equal('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].');
    });

    it('should not create a password without uppercase letters', () => {
        const props = {value: 'abcd1234!', hashed: false} as UserPasswordProps;
        const password = UserPassword.create(props);
        expect(password.isFailure).to.equal(true);
        expect(password.error).to.equal('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].');
    });

    it('should not create a password without lowercase letters', () => {
        const props = {value: 'ABCD1234!', hashed: false} as UserPasswordProps;
        const password = UserPassword.create(props);
        expect(password.isFailure).to.equal(true);
        expect(password.error).to.equal('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].');
    });



});