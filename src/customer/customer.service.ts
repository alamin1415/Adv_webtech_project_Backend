import {  Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Customer } from "./customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { createCustomerDto } from "./dtos/create_customer.dto";
import { UpdateCustomerDto } from "./dtos/update_customer.dto";

@Injectable()
export class customerService {
    constructor (
    @InjectRepository(Customer)
    private  customerRepo: Repository<Customer>
    
    ) {}




    public async createCustomer(customer: createCustomerDto) {
        
    const newCustomer = this.customerRepo.create(customer);
    return await this.customerRepo.save(newCustomer);

    }

 
    getCustomerDetails() {
        return this.customerRepo.find();
    }



    getCustomerById(id: number) {
        return this.customerRepo.findOne({ where: { id } });
    }

    
async updateCustomerById(id: number, updateData: UpdateCustomerDto): Promise<string> {
  const existingCustomer = await this.customerRepo.findOne({ where: { id } });

  if (!existingCustomer) {
    throw new NotFoundException(`Customer with ID ${id} not found`);
  }

  const updatedCustomer = this.customerRepo.merge(existingCustomer, updateData);

  await this.customerRepo.save(updatedCustomer);

  return 'Customer updated successfully';
}

    

  



    // deleteCustomerByNumber(num: number) {
    //     return this.customerRepo.delete(num);
    // }   

    

    async deleteCustomerById(id: number): Promise<string> {
  const existingCustomer = await this.customerRepo.findOne({ where: { id } });

  if (!existingCustomer) {
    throw new NotFoundException(`Customer with ID ${id} not found`);
  }

  await this.customerRepo.delete(id);

  return `Customer with ID ${id} has been deleted successfully`;
}




 

    
    



}   