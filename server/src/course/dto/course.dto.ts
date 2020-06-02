import { Chapter } from '../interfaces/chapter.interface';

export class CourseDto {
  readonly _id: string;
  readonly courseName: string;
  readonly chapters: Chapter[];
}
