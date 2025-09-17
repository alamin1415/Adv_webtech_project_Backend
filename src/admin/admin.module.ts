import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminInfo } from "./admin.entity";
import { ManagerInfo } from "src/manager/manager.entity";
import { AuthModule } from "src/auth/auth.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { PusherModule } from "src/pusher/pusher.module";

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([AdminInfo,ManagerInfo]),
    PusherModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,  // use SSL
        auth: {
          user: 'shahedjaman762@gmail.com', // your Gmail
          pass: 'ufdm inll plew gjua', // Gmail App Password
        },
      },
      defaults: {
        from: '"No Reply" <your_email@gmail.com>',
      },
    }),
],
    controllers: [AdminController],
    providers: [AdminService]
})

export class AdminModule{};
