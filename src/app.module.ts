import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { CustomerModule } from './customer/customer.module';
import { CustomerProfileModule } from './customer_profile/customer_profile.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { EmailModule } from './email/email.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    // 1️⃣ ConfigModule import করা হলো globally
    ConfigModule.forRoot({ isGlobal: true }),

    // 2️⃣ TypeOrmModule configure করা হলো
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        synchronize: true,
        autoLoadEntities: true,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'alamin',
        database: 'laundry',
      }),
    }),

    // 3️⃣ MailerModule configure করা হলো Gmail SMTP দিয়ে
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST') || 'smtp.gmail.com',
          port: Number(config.get('SMTP_PORT') ?? 465),
          secure: config.get('SMTP_SECURE') === 'true',  // SSL
          ignoreTLS: config.get('SMTP_IGNORE_TLS') === 'true',
          auth: {
            user: config.get('SMTP_USER') || 'your_email@gmail.com',
            pass: config.get('SMTP_PASS') || 'your_app_password',
          },
        },
        defaults: {
          from: `"${config.get('APP_NAME') || 'Laundry App'}" <${config.get('SMTP_USER')}>`,
        },
      }),
    }),

    // 4️⃣ Project modules import করা হলো
    CustomerModule,
    CustomerProfileModule,
    AuthenticationModule,
    EmailModule,
    OrdersModule, // EmailService ব্যবহার করতে হলে import করতে হবে
  ],
  //controllers: [],
  //providers: [],
})
export class AppModule {}
