import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs  from 'fs';
import * as path  from 'path';
import { IncomingMessage, ServerResponse } from 'http';

import { CourseModel } from './interfaces/course.interface';
import { CourseDto } from './dto/course.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class CourseService {

  constructor(@InjectModel('Course') private readonly courseModel: Model<CourseModel>,
              private userService: UserService) {}

  async findAll(): Promise<CourseDto[]> {
    return this.courseModel.find({}, { chapters: 0}).exec();
  }

  async findCoursesById(id: string[]): Promise<CourseDto[]> {
    return this.courseModel.find().where('_id').in(id).exec();
  }

  async findUserCourses(userId: string): Promise<CourseDto[]> {
    const user = await this.userService.getUserById(userId);

    return user.courses ? this.findCoursesById(user.courses) : [];
  }

  async getCourseVideo(req: IncomingMessage, res: ServerResponse, name: string) {
    const filePath = path.join(__dirname, '..', `assets/${name}.mp4`);
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1;

      const chunksize = (end - start) + 3;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      file.pipe(res)
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res)
    }
  }

  async deleteCourse(id): Promise<CourseDto[]> {
    await this.courseModel.findByIdAndDelete(id).exec();
    return await this.findAll();
  }
}
