import mongoose from 'mongoose';
import { ITypeOfRobotPersistence } from '../../dataschema/ITypeOfRobotPersistence';

const TypeOfRobot = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        taskType: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITypeOfRobotPersistence & mongoose.Document>('TypeOfRobot', TypeOfRobot);