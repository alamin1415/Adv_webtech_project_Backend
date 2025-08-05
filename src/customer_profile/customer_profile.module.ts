import { Module } from '@nestjs/common';
import { CustomerProfileController } from './customer_profile.controller';
import { CustomerProfileService } from './customer_profile.service';

@Module({
  controllers: [CustomerProfileController],
  providers: [CustomerProfileService]
})
export class CustomerProfileModule {}
