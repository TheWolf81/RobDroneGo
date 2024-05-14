import mongoose from 'mongoose';
import { IRoomPersistence } from '../../dataschema/IRoomPersistence';

const Room = new mongoose.Schema( /*add constraints*/
    {
        domainId: {
        type: String,
        unique: true
        },
        floorID: {
        type: String,
        required: true,
        },
        // category must be either "Gabinete", "Anfiteatro", "Laboratório" or "Outro"
        category: {
        type: String,
        required: true,
        enum: ["Gabinete", "Anfiteatro", "Laboratório", "Outro"],
        },
        // identifier must begin with an upper case letter and be followed by three digits
        identifier: {
        type: String,
        required: true,
        unique: true,
        match: /^[A-Z]\d{3}$/,
        },
        description: { 
        type: String,
        maxlength: 255
        },
        x:{
        type: Number,
        required: true,
        },
        y:{
        type: Number,
        required: true,
        }
        
    },
    {
        timestamps: true
    
    }
);
export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', Room);