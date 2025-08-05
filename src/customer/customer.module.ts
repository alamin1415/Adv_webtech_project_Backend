import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { customerService } from './customer.service';
import { Customer } from './customer.entity';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CustomerController],
  providers: [customerService],
  imports: [TypeOrmModule.forFeature([Customer])  ],
})
export class CustomerModule {}
