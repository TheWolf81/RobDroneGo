import mongoose from 'mongoose';
import { IRobotPersistence } from '../../dataschema/IRobotPersitence';

const Robot = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },
    nickname: {
      type: String,
      required: true,
    },
    
    typeOfRobotId: {
      type: String,
      
    },
    StateOfRobot: { type: Boolean 
    ,default : true},

  },
  {
    timestamps: true
  
  }
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', Robot);