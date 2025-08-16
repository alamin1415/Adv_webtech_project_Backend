import { Controller, Get } from '@nestjs/common';
import { CustomerProfileService } from './customer_profile.service';

@Controller('customer-profile')
export class CustomerProfileController {

    constructor(private readonly customerProfileService: CustomerProfileService) {}

    @Get("all_profile")
    
    findAllCustomerProfile() {

        return this.customerProfileService.findAll();
    }



}
