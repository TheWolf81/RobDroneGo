import {expect} from 'chai';
import { UserEmail } from '../../../src/domain/userEmail';

describe('UserEmail creation test', () => {
    it('should create a valid email', () => {
        const email = UserEmail.create('johndoe@gmail.com');
        expect(email.isSuccess).to.equal(true);
    });

    it('should not create an email with invalid format (1)', () => {
        const email = UserEmail.create('johndoe');
        expect(email.isFailure).to.equal(true);
        expect(email.error).to.equal('Email must contain only one @ and one . character');
    });

    it('should not create an email with invalid format (2)', () => {
        const email = UserEmail.create('johndoe@');
        expect(email.isFailure).to.equal(true);
        expect(email.error).to.equal('Email must contain only one @ and one . character');
    });

    it('should not create an email with invalid format (3)', () => {
        const email = UserEmail.create('johndoe@gmail');
        expect(email.isFailure).to.equal(true);
        expect(email.error).to.equal('Email must contain only one @ and one . character');
    });

    it('should not create an email with invalid format (4)', () => {
        const email = UserEmail.create('johndoe.');
        expect(email.isFailure).to.equal(true);
        expect(email.error).to.equal('Email must contain only one @ and one . character');
    });

    it('should not create an email with empty string', () => {
        const email = UserEmail.create('');
        expect(email.isFailure).to.equal(true);
    });

    it('should not create an email with null value', () => {
        const email = UserEmail.create(null as any);
        expect(email.isFailure).to.equal(true);
    });

    it('should not create an email with undefined value', () => {
        const email = UserEmail.create(undefined as any);
        expect(email.isFailure).to.equal(true);
    });

    it('should not create an email with blank string', () => {
        const email = UserEmail.create(' ');
        expect(email.isFailure).to.equal(true);
    });


});