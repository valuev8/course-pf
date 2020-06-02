import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  isReset: Boolean,
  isAdmin: Boolean,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});
