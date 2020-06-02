// @ts-ignore
import { Document } from 'mongoose';

export interface UserModel extends Document {
  _id: string;
  email: string;
  password: string;
  isReset: boolean;
  isAdmin: boolean;
  courses: string[];
}
