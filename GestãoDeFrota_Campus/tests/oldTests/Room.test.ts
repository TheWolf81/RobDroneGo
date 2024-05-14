/*import { expect } from 'chai';
import { Room } from '../src/domain/Room';

describe('Room creation test', () => {
    it('create a valid room: ', () => {
        let room = Room.create({
            floorID: '1',
            category: 'Gabinete',
            identifier: 'B301',
            description: 'Gab. do Prof. X'
        });
        expect(room.isSuccess).to.equal(true);
    });
    it('create a room with an invalid category: ', () => {
        let room = Room.create({
            floorID: '1',
            category: 'Sala de aula',
            identifier: 'B301',
            description: 'Gab. do Prof. X'
        });
        expect(room.isFailure).to.equal(true);
    });
    it('create a room with invalid identifier: ', () => {
        let room = Room.create({
            floorID: '1',
            category: 'Gabinete',
            identifier: 'B2',
            description: 'Gab. do Prof. X'
        });
        expect(room.isFailure).to.equal(true);
    });
    it('create a room with no description: ', () => {
        let room = Room.create({
            floorID: '1',
            category: 'Gabinete',
            identifier: 'B301',
            description: ''
        });
        expect(room.isSuccess).to.equal(true);
    });
});


*/
