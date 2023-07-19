import './config/alias';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { JwtMiddleware } from './auth/middlewares';
import HttpExceptionFilter from './common/filters/http-exception.filter';
import { healthCheckMiddleware } from './common/middlewares';
import logger from './common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`/api/${process.env.API_VERSION}`);
  app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
  }));
  app.use(cookieParser());
  app.use(JwtMiddleware);
  app.use(logger);
  app.use(healthCheckMiddleware);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto에서 정의되지 않은 값은 제거
      forbidNonWhitelisted: true, // dto에서 정의되지 않은 값이 있으면 에러
      transform: true, // query나 params로 넘어온 값들의 타입을 자동으로 변환
    }),
  );

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    const docs = require('../../swagger.json');
    docs.servers = [
      { url: 'http://localhost:3000' },
    ];
    SwaggerModule.setup('swagger', app, docs);
  }

  await app.listen(3000);
}
bootstrap();
