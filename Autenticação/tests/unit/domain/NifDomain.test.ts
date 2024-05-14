import {expect} from 'chai';
import { Nif } from '../../../src/domain/nif';

describe('Nif creation test', () => {

    it('should create a valid nif', () => {
        const nif = Nif.create('123456789');
        expect(nif.isSuccess).to.equal(true);
    });

    it('should not create a nif with empty string', () => {
        const nif = Nif.create('');
        expect(nif.isFailure).to.equal(true);
        expect(nif.error).to.equal('Nif is not valid.');
    });

    it('should not create a nif with null value', () => {
        const nif = Nif.create(null as any);
        expect(nif.isFailure).to.equal(true);
        expect(nif.error).to.equal('Nif should not be empty.');
    });

    it('should not create a nif with undefined value', () => {
        const nif = Nif.create(undefined as any);
        expect(nif.isFailure).to.equal(true);
        expect(nif.error).to.equal('Nif should not be empty.');
    });

    it('should not create a nif with blank string', () => {
        const nif = Nif.create(' ');
        expect(nif.isFailure).to.equal(true);
        expect(nif.error).to.equal('Nif is not valid.');
    });

    it('should not create a nif with invalid value (not portuguese nif regex)', () => {
        const nif = Nif.create('12345678');
        expect(nif.isFailure).to.equal(true);
        expect(nif.error).to.equal('Nif is not valid.');
    });
});