import { Controller, Delete, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';
import { AdminGuard } from '../shared/guards/admin.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly appService: CourseService) {}

  @Get()
  getCourses(): Promise<CourseDto[]> {
    return this.appService.findAll();
  }

  @Get(':userId')
  getCourseByUser(@Param('userId') id: string): Promise<CourseDto[]> {
    return this.appService.findUserCourses(id);
  }

  @Get('/id/:courseId') // TODO: move getCourseByUser to separate service, refactor path
  getCourseById(@Param('courseId') id: string): Promise<CourseDto[]> {
    return this.appService.findCoursesById([id]);
  }

  @Get('video/:name')
  getCourseVideo(@Res() res, @Req() req, @Param('name') name: string) {
    return this.appService.getCourseVideo(req, res, name);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  deleteCourse(@Param('id') id: string): Promise<CourseDto[]> {
    return this.appService.deleteCourse(id);
  }
}
