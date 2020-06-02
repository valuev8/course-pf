import { CourseDto } from '../../course/dto/course.dto';

export class UserDto {
  readonly _id: string;
  readonly email: string;
  readonly password: string;
  readonly isReset: boolean;
  readonly isAdmin: boolean;
  readonly courses: string[]; // TODO: remove strings[]
}
