// @ts-ignore
import { Document } from 'mongoose';
import { Chapter } from './chapter.interface';

export interface CourseModel extends Document {
  _id: string;
  courseName: string;
  courseDesc: string;
  courseImage: string;
  chapters: Chapter[];
}
