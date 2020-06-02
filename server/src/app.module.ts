import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose'
import { CourseModule } from './course/course.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    CourseModule,
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://${someMongoURLhere}'),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'sample@gmail.com',
          pass: 'samplePass'
        },
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets'),
    }),
  ],
})
export class AppModule {}
