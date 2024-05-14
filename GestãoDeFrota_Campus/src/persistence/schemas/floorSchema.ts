import mongoose from 'mongoose';
import { IFloorPersistence } from '../../dataschema/IFloorPersistence';

const Floor = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
      required: true
    },
    building_id: {
      type: String,
      required: true,
      ref: 'Building'
    },
    floorNumber: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      maxlength: 255,
      required: true
    },
    area: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      maxlength: 255,
      required: false
    },
    floorMap: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', Floor);