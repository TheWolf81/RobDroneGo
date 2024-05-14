import {expect} from 'chai';
import { PhoneNumber } from '../../../src/domain/phoneNumber';

describe('PhoneNumber creation test', () => {

    it('should create a valid phone number (without country number)', () => {
        const phoneNumber = PhoneNumber.create('961234567');
        expect(phoneNumber.isSuccess).to.equal(true);
    });

    it('should create a valid phone number (with country number)', () => {
        const phoneNumber = PhoneNumber.create('+351961234567');
        expect(phoneNumber.isSuccess).to.equal(true);
    });

    it('should not create a phone number with empty string', () => {
        const phoneNumber = PhoneNumber.create('');
        expect(phoneNumber.isFailure).to.equal(true);
        expect(phoneNumber.error).to.equal('Phone number is not valid.');
    });

    it('should not create a phone number with null value', () => {
        const phoneNumber = PhoneNumber.create(null as any);
        expect(phoneNumber.isFailure).to.equal(true);
        expect(phoneNumber.error).to.equal('Phone number should not be empty.');
    });

    it('should not create a phone number with undefined value', () => {
        const phoneNumber = PhoneNumber.create(undefined as any);
        expect(phoneNumber.isFailure).to.equal(true);
        expect(phoneNumber.error).to.equal('Phone number should not be empty.');
    });

    it('should not create a phone number with blank string', () => {
        const phoneNumber = PhoneNumber.create(' ');
        expect(phoneNumber.isFailure).to.equal(true);
        expect(phoneNumber.error).to.equal('Phone number is not valid.');
    });

    it('should not create a phone number with invalid value (not portuguese phone number regex) (1)', () => {
        const phoneNumber = PhoneNumber.create('12345678');
        expect(phoneNumber.isFailure).to.equal(true);
        expect(phoneNumber.error).to.equal('Phone number is not valid.');
    });

    it('should not create a phone number with invalid value (not portuguese phone number regex) (2)', () => {
        const phoneNumber = PhoneNumber.create('123456789');
        expect(phoneNumber.isFailure).to.equal(true);
        expect(phoneNumber.error).to.equal('Phone number is not valid.');
    });

    it('should not create a phone number with invalid value (not portuguese phone number regex) (3)', () => {
        const phoneNumber = PhoneNumber.create('9999999999');
        expect(phoneNumber.isFailure).to.equal(true);
        expect(phoneNumber.error).to.equal('Phone number is not valid.');
    });
});