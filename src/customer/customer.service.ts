import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository, IsNull } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { CreateCustomerDto } from "./dtos/create_customer.dto";
import { UpdateCustomerDto } from "./dtos/update_customer.dto";
import { Customer_profile } from "src/customer_profile/customer_profile.entity";
import { CustomerProfileDto } from "src/customer_profile/dtos/customer_profile.dto";
import { create } from "domain";
import { UpdateCustomerPutDto } from "./dtos/update_customer_put.dto";

@Injectable()
export class customerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,

    @InjectRepository(Customer_profile)
    private profileRepo: Repository<Customer_profile>
    
    
  ) {}

  // ---------------- GET METHODS ----------------
getCustomerDetails() {
  
  return this.customerRepo.find({
  
    relations:{
      profile:true
    } 

  });
}


  public async createCustomer(customer: CreateCustomerDto) {

    
    // const newCustomer = this.customerRepo.create(customer);
    // return await this.customerRepo.save(newCustomer);

    customer.profile = customer.profile ?? {} ;
    // let pro = this.profileRepo.create(customer.profile);
    // await this.profileRepo.save(pro);

    let cus = this.customerRepo.create(customer)

    // cus.profile = pro; 
        
     return await this.customerRepo.save(cus);
    
    

    // CustomerProfileDto.profile = profile;

    // return await this.customerRepo.save(Customer);



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


async updateCustomerByPhone(phone: string, updateData: UpdateCustomerDto): Promise<string> {
  // Find the customer by phone number
  const existingCustomer = await this.customerRepo.findOne({ where: { phone } });

  if (!existingCustomer) {
    throw new NotFoundException(`Customer with phone number ${phone} not found`);
  }

  // Merge new data into the existing customer entity
  const updatedCustomer = this.customerRepo.merge(existingCustomer, updateData);

  // Save the updated customer to the database
  await this.customerRepo.save(updatedCustomer);

  return 'Customer updated successfully by phone';
}


//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
async replaceCustomer(id: number, updateData: UpdateCustomerPutDto): Promise<string> {
  // Find the customer by ID
  const existingCustomer = await this.customerRepo.findOne({ where: { id } });

  if (!existingCustomer) {
    throw new NotFoundException(`Customer with ID ${id} not found`);
  }

  // Replace all data of the existing customer with the new data
  // This assumes that you want to overwrite all fields
  const replacedCustomer = this.customerRepo.create({
    ...updateData,
    id: existingCustomer.id, // keep the same ID
  });

  // Save the replaced customer to the database
  await this.customerRepo.save(replacedCustomer);

  return 'Customer replaced successfully';
}
//.......................................................



  async deleteCustomerById(id: number): Promise<string> {

    const existingCustomer = await this.customerRepo.findOne({ where: { id } });

    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

      await this.customerRepo.delete(id);
    // if (existingCustomer.profile && existingCustomer.profile.id) {
    //   await this.profileRepo.delete(existingCustomer.profile.id);
    // } 
    return `Customer with ID ${id} has been deleted successfully`;
  }



//   async deleteCustomerById(id: number): Promise<string> {
//   // Find the customer along with their profile
//   const existingCustomer = await this.customerRepo.findOne({
//     where: { id },
//     relations: ["profile"], // include the related profile
//   });

//   if (!existingCustomer) {
//     throw new NotFoundException(`Customer with ID ${id} not found`);
//   }

//   // Remove the customer; cascade will delete the profile too
//   await this.customerRepo.remove(existingCustomer);

//   return `Customer with ID ${id} and their profile have been deleted successfully`;
// }


  
  

  async getCustomersWithNullFullName(): Promise<Customer | null> {
    return await this.customerRepo.findOne({
      where: [
        { full_name: IsNull() },
        { full_name: '' }

      ]
    });
  }
}
