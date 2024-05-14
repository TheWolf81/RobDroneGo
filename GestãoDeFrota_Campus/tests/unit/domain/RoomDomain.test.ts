import {expect} from 'chai';
import {RoomMapper} from '../../../src/mappers/RoomMap';
import { describe } from 'node:test';

describe('Room creation test', () => {
    it('should create a valid room', () => {
        const roomDTO = {
            floorID: '1',
            category: "Gabinete",
            identifier: "B301",
            description: "description",
        };
        const room = RoomMapper.toDomain(roomDTO);
        expect(room).to.not.be.null;    
    });
    it('should create a valid room 2', () => {
        const roomDTO = {
            floorID: '1',
            category: "Anfiteatro",
            identifier: "B301",
            description: "description",
        };
        const room = RoomMapper.toDomain(roomDTO);
        expect(room).to.not.be.null;    
    });
    it('should create a valid room 3', () => {
        const roomDTO = {
            floorID: '1',
            category: "Laboratório",
            identifier: "B301",
            description: "description",
        };
        const room = RoomMapper.toDomain(roomDTO);
        expect(room).to.not.be.null;    
    });
    it('should create a valid room 4', () => {
        const roomDTO = {
            floorID: '1',
            category: "Outro",
            identifier: "B301",
            description: "description",
        };
        const room = RoomMapper.toDomain(roomDTO);
        expect(room).to.not.be.null;    
    });
   /* it('should not create a room with no floorID', () => {
        const roomDTO = {
            category: "Gabinete",
            identifier: "B301",
            description: "description",
        };
        const room = RoomMapper.toDomain(roomDTO);
        expect(room).to.be.null;    
    });
    it('should not create a room with no category', () => {
        const roomDTO = {
            floorID: '1',
            identifier: "B301",
            description: "description",
        };
        const room = RoomMapper.toDomain(roomDTO);
        console.log(room);
    });
    it('should not create a room with no identifier', () => {
        const roomDTO = {
            floorID: '1',
            category: "Gabinete",
            description: "description",
        };
        const room = RoomMapper.toDomain(roomDTO);
        expect(room).to.be.null;    
    });
    it('should not create a room with no description', () => {
        const roomDTO = {
            floorID: '1',
            category: "Gabinete",
            identifier: "B301",
        };
        const room = RoomMapper.toDomain(roomDTO);
        expect(room).to.be.null;    
    });
    it('should not create a room with invalid category', () => {
        const roomDTO = {
            floorID: '1',
            category: "Classroom",
            identifier: "B301",
            description: "description",
        };
        const room = RoomMapper.toDomain(roomDTO);
        expect(room).to.be.null;    
    });
    it('should not create a room with invalid identifier', () => {
        const roomDTO = {
            floorID: '1',
            category: "Gabinete",
            identifier: "B20",
            description: "description",
        };
        const room = RoomMapper.toDomain(roomDTO);
        expect(room).to.be.null;    
    });
    it('should not create a room with invalid description', () => {
        const roomDTO = {
            floorID: '1',
            category: "Gabinete",
            identifier: "B301",
            description: 'a'.repeat(256),
        };
        const room = RoomMapper.toDomain(roomDTO);
        expect(room).to.be.null;    
    });*/
});