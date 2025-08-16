import { Module } from '@nestjs/common';
import { CustomerProfileController } from './customer_profile.controller';
import { CustomerProfileService } from './customer_profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer_profile } from './customer_profile.entity';
import { Customer } from 'src/customer/customer.entity';

@Module({
  controllers: [CustomerProfileController],
  providers: [CustomerProfileService],
  imports: [TypeOrmModule.forFeature([Customer_profile, Customer])],
})
export class CustomerProfileModule {}
