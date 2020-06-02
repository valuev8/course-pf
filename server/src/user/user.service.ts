import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { generate } from 'generate-password';
import { UserModel } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(@InjectModel('User') private readonly userModel: Model<UserModel>,
              private readonly mailerService: MailerService) {}

  async findAll(): Promise<UserDto[]> {
    return this.userModel.find({}, { password: 0 }).populate('courses', ['courseName', '_id']).exec();
  }

  async createUser(email: string, courses: string[]): Promise<Partial<UserDto>> {
    if (await this.userModel.findOne({ email: email}).exec()) {
      throw new HttpException('User with such email already exist', HttpStatus.CONFLICT);
    }

    const tempPassword = generate({ length: 10, numbers: false});
    const hashedPassword = await this.getHash(tempPassword);

    const user: Partial<UserDto> = {
      email: email,
      isReset: false,
      password: hashedPassword,
      isAdmin: false,
      courses: courses,
    };

    await this.userModel.create(user);

    return { ...user, password: tempPassword};
  }

  async getUserByMail(email: string): Promise<UserDto> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async getUserById(id: string): Promise<UserDto> {
    return this.userModel.findOne({ _id: id}).exec();
  }

  async updatePassword(id, newPassword): Promise<void> {
    const hashedPassword = await this.getHash(newPassword);
    const updateStatus = await this.userModel.updateOne({ _id: id} , { password: hashedPassword, isReset: true }).exec();

    if (updateStatus[0] === 0) {
      throw await new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return;
  }

  async resetPassword(email): Promise<void> {
    const tempPassword = generate({ length: 10, numbers: false});
    const hashedPassword = await this.getHash(tempPassword);
    const updateStatus = await this.userModel.updateOne({ email: email} , { password: hashedPassword, isReset: false }).exec();

    if (updateStatus[0] === 0) {
      throw await new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.mailerService
      .sendMail({
        to: email,
        from: 'example@no-reply.com',
        subject: 'Сброс Пароля',
        html: `<div> Ваш новый временный пароль: <b> ${tempPassword} </b></div>`,
      });

    return;
  }

  async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
