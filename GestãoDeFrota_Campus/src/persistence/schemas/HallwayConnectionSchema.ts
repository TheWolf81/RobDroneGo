import mongoose from 'mongoose';
import { IHallwayConnectionPersitence } from '../../dataschema/IHallwayConnectionPersitence';
const HallwayConnection = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },
    
    BuildingId1: {
      type: String,
      required: true,

    },
    
    BuildingId2: {
      type: String,
      required: true,

    },

    FloorId1:{
        type: String,
        required: true,
    },
    FloorId2:{
        type: String,
        required: true,
    },
    x1:{
        type: Number,
        required: true,
    },
    y1:{
        type: Number,
        required: true,
    },
    x2:{
        type: Number,
        required: true,
    },
    y2:{
        type: Number,
        required: true,
    },
  },
  {
    timestamps: true
  
  }
);

export default mongoose.model<IHallwayConnectionPersitence & mongoose.Document>('HallwayConnection', HallwayConnection);