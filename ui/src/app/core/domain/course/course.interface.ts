import {Chapter} from './chapter.interface';

export interface Course {
  _id: string;
  courseName: string;
  courseDesc: string;
  courseImage: string;
  chapters: Chapter[];
}
