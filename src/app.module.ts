import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//All Modules
import { AdminModule} from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerModule } from './manager/manager.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule,AdminModule, ManagerModule,TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Shahed',
      database: 'laundry',//database name
      autoLoadEntities:true, // entity auto load
      synchronize: true, //entity schema auto create/update
      extra: {
          options: '-c timezone=Asia/Dhaka' // -c client configu. param.
          }
    }
  ),
],


  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
