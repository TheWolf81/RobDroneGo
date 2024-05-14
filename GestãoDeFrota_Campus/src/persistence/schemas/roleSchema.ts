import { IRolePersistence } from '../../dataschema/IRolePersistence';
import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    type: { type: String, unique: true },
    StateOfRobot: { type: Boolean }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRolePersistence & mongoose.Document>('Role', RoleSchema);
