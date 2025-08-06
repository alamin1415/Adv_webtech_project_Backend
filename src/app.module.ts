import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
//import { UserModule } from './users/users.module';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/customer.entity';
import { CustomerProfileModule } from './customer_profile/customer_profile.module';


@Module({
  imports: [ TypeOrmModule.forRootAsync({
    useFactory: () => ({


    type: 'postgres',
    entities: [Customer],
    synchronize: true,
    //autoLoadEntities: true,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'alamin',
    database: 'laundry',

    
    })

  }), CustomerModule, CustomerProfileModule],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
 