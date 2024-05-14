import mongoose from 'mongoose';
import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';

const Building = new mongoose.Schema(  
    {
        domainId: {
        type: String,
        unique: true,
        required: true
        },
        //code must have maximum 5 characters,letters or numbers, with or without spaces.
        code: {
        type: String,
        maxlength: 5,
        required: true,
        unique: true,
        },
        description: {
        type: String,
        maxlength: 255,
        },
        max_length: { type: Number },
        max_width: { type: Number }
    },
    {
        timestamps: true
    
    }
    );

    export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', Building);