import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World! I am Shahed';
  }
  getPhoto():string{
    return 'All Photo';
  }
  getPhotoById(photoid:number): string{
    return 'Photo id  is '+ photoid;
  }
}
