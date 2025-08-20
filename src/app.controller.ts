import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} //Injecting AppService caouse @Injectable in service.ts

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  /*
  @Get('Photo')
  getPhoto():string{
    return this.appService.getPhoto();
  }
    */
}
