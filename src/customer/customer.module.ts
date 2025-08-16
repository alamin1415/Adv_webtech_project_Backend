import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { customerService } from './customer.service';
import { Customer } from './customer.entity';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer_profile } from 'src/customer_profile/customer_profile.entity';

@Module({
  controllers: [CustomerController],
  providers: [customerService],
  imports: [TypeOrmModule.forFeature([Customer,Customer_profile])  ],
})
export class CustomerModule {}
