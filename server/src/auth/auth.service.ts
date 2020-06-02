import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthResponse } from './auth-response.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async createToken(id: string, email: string, isAdmin: boolean, isReset: boolean): Promise<AuthResponse> {
    const expiresIn = 28800000;
    const secretOrKey = 'secret';
    const user = { _id: id, email, isAdmin, isReset };
    const token = jwt.sign(user, secretOrKey, { expiresIn });

    return { expires_in: expiresIn, token };
  }

  async validateUser(signedUser): Promise<boolean> {
    if (signedUser && signedUser.email) {
      return Boolean(this.userService.getUserByMail(signedUser.email));
    }

    return false;
  }
}
