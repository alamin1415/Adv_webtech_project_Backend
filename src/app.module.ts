import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// All Modules
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Load .env file globally
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // or ['.env.local', '.env'] if you want fallback
    }),

    AuthModule,
    AdminModule,
    ManagerModule,

    TypeOrmModule.forRoot(  {
      type: 'postgres',
      host: 'localhost',
      port: 5432 ,
      username: 'postgres',
      password: 'Shahed',
      database:  'laundry',
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        options: '-c timezone=Asia/Dhaka',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
