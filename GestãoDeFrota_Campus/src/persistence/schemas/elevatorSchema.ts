import mongoose from 'mongoose';
import { IElevatorPersistence } from '../../dataschema/IElevatorPersistence';

const Elevator = new mongoose.Schema(  
    {
        domainId: {
        type: String,
        unique: true,
        required: true
        },
        building_id: {
        type: String,
        unique: true,
        required: true
        },
        floors_servedId: {
        type: Array,
        required: true
        },
        description: {
        type: String,
        maxlength: 255,
        },
    },
    {
        timestamps: true
    }
    );
    export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', Elevator);

