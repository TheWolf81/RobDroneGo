import {expect} from 'chai';
import { Status } from '../../../src/domain/status';

describe('Status creation test', () => {

    it('should create a valid status (1)', () => {;
        const status = Status.create('Approved');
        expect(status.isSuccess).to.equal(true);
    });

    it('should create a valid status (2)', () => {
        const status = Status.create('Denied');
        expect(status.isSuccess).to.equal(true);
    });

    it('should create a valid status (3)', () => {
        const status = Status.create('Requested');
        expect(status.isSuccess).to.equal(true);
    });

    it('should not create a status with empty string', () => {
        const status = Status.create('');
        expect(status.isFailure).to.equal(true);
        expect(status.error).to.equal('Must provide a valid status');
    });

    it('should not create a status with null value', () => {
        const status = Status.create(null as any);
        expect(status.isFailure).to.equal(true);
        expect(status.error).to.equal('Status should not be empty.');    });

    it('should not create a status with undefined value', () => {
        const status = Status.create(undefined as any);
        expect(status.isFailure).to.equal(true);
        expect(status.error).to.equal('Status should not be empty.');
    });

    it('should not create a status with blank string', () => {
        const status = Status.create(' ');
        expect(status.isFailure).to.equal(true);
        expect(status.error).to.equal('Must provide a valid status');
    });

    it('should not create a status with invalid value', () => {
        const status = Status.create('Invalid');
        expect(status.isFailure).to.equal(true);
        expect(status.error).to.equal('Must provide a valid status');
    });
});