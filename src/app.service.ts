import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  uploadFile(file: Express.Multer.File) {
    console.log(file);
  }
}