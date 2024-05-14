import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    firstName: {
      type: String,
      required: [true, 'Please enter first name'],
    },

    lastName: {
      type: String,
      required: [true, 'Please enter last name'],
    },

    username: {
      type: String,
      required: [true, 'Please enter username'],
      index: true,
      unique: true,
    },

    email: {
      type: String,
      lowercase: true,  
      required: [true, 'Please enter email'],
      unique: true,
      index: true,
    },

    password: String,

    salt: String,

    role: {
      type: String,
      default: 'user',
    },

    phoneNumber: {
      type: String,
      index: true,
      required: [true, 'Please enter phone number'],
      unique: true,
    },

    nif: {
      type: String,
      index: true,
      required: [true, 'Please enter nif'],
      unique: true,
    },

    status: {
      type: String,
      default: 'Requested',
    },

  },
  { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', User);
