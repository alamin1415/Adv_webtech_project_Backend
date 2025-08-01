import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
//import { UserModule } from './users/users.module';
import { CustomerModule } from './customer/customer.module';


@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',
    entities: [],
    synchronize: true,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'alamin',
    database: 'laundry',

  }), CustomerModule],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
