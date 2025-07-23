import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule} from './admin/admin.module';

import { UserModule } from './users/users.module';

@Module({
  imports: [ UserModule,AdminModule],
  main
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
