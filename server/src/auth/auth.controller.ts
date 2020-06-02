import { Controller, Post, HttpStatus, Response, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { AuthResponse } from './auth-response.interface';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService) {}

  @Post('login')
  async loginUser(@Body() body: UserDto): Promise<AuthResponse> {
    if (!(body && body.email && body.password)) {
      throw new HttpException('Username and password are required!', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.getUserByMail(body.email);

    if (user) {
      if (await this.userService.compareHash(body.password, user.password)) {
        return await this.authService.createToken(user._id, user.email, user.isAdmin, user.isReset);
      }
    }

    throw new HttpException('Username or password wrong!', HttpStatus.FORBIDDEN);
  }

  @Post('reset')
  resetPassword(@Body('email') email: string): Promise<void> {
    return this.userService.resetPassword(email);
  }
}
