import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthenticationService, {
    provide: HashingProvider,
    useClass: BcryptProvider

  }],
  controllers: [AuthenticationController],
  imports: [CustomerModule , JwtModule.register({
      secret: 'mySuperSecretKey123!', // your secret key
      signOptions: { expiresIn: '1h' }, // default token expiration
    })]
})
export class AuthenticationModule {}
