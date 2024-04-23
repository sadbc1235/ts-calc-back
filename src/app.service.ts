/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { endWith } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAttach(empSeq: string, imgName: string) {
    const uploadFilePath = `${__dirname}/../file/${empSeq}/${imgName}`;
    let readFile = readFileSync(uploadFilePath); //이미지 파일 읽기
    let encode = Buffer.from(readFile).toString('base64'); //파일 인코딩
    let ext = imgName.split('.')[1];
    const imgSrc = `data:image/${ext};base64,${encode}`
    return `<img style="width: 100%; height: 100%; object-fit: contain" src="${imgSrc}" />`;
  }

  async uploadFile(file, empSeq: string) {
    // console.log(file);
    // __dirname: /var/app/dist
    const uploadFilePath = `${__dirname}/../file/${empSeq}`;

    if (!existsSync(uploadFilePath)) {
      // uploads 폴더가 존재하지 않을시, 생성합니다.
      mkdirSync(uploadFilePath);
    }
    // 파일 이름
    const fileName = Date.now() +'-'+ file.originalname;
    // 파일 업로드 경로
    const uploadPath = `${uploadFilePath +'/'+ fileName}`
    // console.log(uploadPath);
    // 파일생성
    let buffer = Buffer.from(file.buffer, 'base64');
    writeFileSync(uploadPath, buffer);

    const imgUrl = `/attachments/${empSeq}/${fileName}`;

    return {state: 'success', imgUrl: imgUrl, empSeq: empSeq, imgName: fileName};
  }

  delFile(empSeq: string, fileName: string) {
    const uploadFilePath = `${__dirname}/../file/${empSeq}/${fileName}`;
    let result = '삭제되었습니다.';
    let state = 'success';
    if (!existsSync(uploadFilePath)) {
      result = '파일이 존재하지 않습니다.';
      state = 'fail';
    } else {
      unlinkSync(uploadFilePath);
    }

    return {state: state, result};
  }
}
