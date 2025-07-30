import {  Injectable } from "@nestjs/common";

@Injectable()
export class customerService {


 
    getCustomerDetails() {
        return "Customer details retrieved successfully";
    }



    createCustomer() {
        return "Customer created successfully_service";
    }    
    
    



}   