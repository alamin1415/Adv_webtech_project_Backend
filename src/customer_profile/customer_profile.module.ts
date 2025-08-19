import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // <-- import করা
import { CustomerProfileController } from './customer_profile.controller';
import { CustomerProfileService } from './customer_profile.service';
import { Customer_profile } from './customer_profile.entity';
import { Customer } from 'src/customer/customer.entity';
import { authorizeGuards } from 'src/authentication/guards/authorize.guards'; // <-- guard import

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer_profile, Customer]),
    JwtModule.register({  // <-- JwtModule register করা
      secret: 'mySuperSecretKey123!', // তোমার secret
      signOptions: { expiresIn: '1h' }, // token expiration
    }),
  ],
  controllers: [CustomerProfileController],
  providers: [CustomerProfileService, authorizeGuards], // <-- guard provider এ যুক্ত
  exports: [authorizeGuards], // <-- অন্য জায়গায় ব্যবহার করার জন্য export
})
export class CustomerProfileModule {}
