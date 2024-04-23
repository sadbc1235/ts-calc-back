/* eslint-disable */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 도커 볼륨에 있는 첨부 파일을 저장하는 위치를 정의합니다.
  const attachmentsPath = '../file';
  app.useStaticAssets(join(__dirname, attachmentsPath), { 
    prefix: '/attachments' 
    , index: false // 인덱스 파일을 제공하지 않도록 설정
  });
  await app.listen(3000);
}
bootstrap();
