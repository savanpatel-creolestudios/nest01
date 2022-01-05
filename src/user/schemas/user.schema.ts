import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: 'demo',
  },
  password: {
    type: String,
    require: true,
  },
  otp: {
    type: Number,
    require: true,
  },
  salt: {
    type: String,
    require: true,
  },
});
