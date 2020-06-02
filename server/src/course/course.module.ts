import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schemas/course.schema';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { UserService } from '../user/user.service';
import { UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([
    {
      name: 'Course',
      useFactory: () => {
        const schema = CourseSchema;
        schema.pre('remove', (next) => {
          this.model('User').remove({ courses: this._id }, next);
          next();
        });
        return schema;
      },
    },
    { name: 'User', useFactory: () => UserSchema }
  ])],
  controllers: [CourseController],
  providers: [
    CourseService,
    UserService
  ],
})
export class CourseModule {}
