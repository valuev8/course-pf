import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AdminGuard } from '../shared/guards/admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  @UseGuards(AdminGuard)
  getUsers(): Promise<UserDto[]> {
    return this.appService.findAll();
  }

  @Post()
  @UseGuards(AdminGuard)
  createUser(@Body('email') email: string, @Body('courses') courses: string[]): Promise<Partial<UserDto>> { // TODO: change type of courses
    return this.appService.createUser(email, courses);
  }

  @Put()
  updatePassword(@Body('id') id: string, @Body('password') password: string): Promise<void> {
    return this.appService.updatePassword(id, password);
  }
}
