import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as cookieParser from 'cookie-parser'
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.useStaticAssets(path.join(__dirname, 'assets'));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
