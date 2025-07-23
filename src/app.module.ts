import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';

import { AdminModule} from './admin/admin.module';

import { UserModule } from './users/users.module';

@Module({

  imports: [ UserModule,AdminModule,ServicesModule],
  main

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
