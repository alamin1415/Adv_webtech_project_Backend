import { Injectable } from '@nestjs/common';

@Injectable() //Declare a class as a Provider(class to use logic,service)
export class AppService {

  getHello(): string {
    return 'Hello World! I am Shahed';
  }/*
  getPhoto():string{
    return 'All Photo';
  }
  getPhotoById(photoid:number): string{
    return 'Photo id  is '+ photoid;
  }*/
}
