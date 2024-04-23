/* eslint-disable */
import { Controller, Get, Post, UseInterceptors, UploadedFile, Body, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('file/:empSeq/:imgName')
  getAttach(@Param('empSeq') empSeq: string, @Param('imgName') imgName: string) {
    return this.appService.getAttach(empSeq, imgName);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body('empSeq') empSeq: string) {
    return await this.appService.uploadFile(file, empSeq);
  }

  @Post('delFile')
  delFile(@Body('empSeq') empSeq, @Body('imgName') imgName: string) {
    return this.appService.delFile(empSeq, imgName);
  }
}
