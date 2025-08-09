import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository, IsNull } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { CreateCustomerDto } from "./dtos/create_customer.dto";
import { UpdateCustomerDto } from "./dtos/update_customer.dto";

@Injectable()
export class customerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>
  ) {}

  public async createCustomer(customer: CreateCustomerDto) {
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

  async deleteCustomerById(id: number): Promise<string> {
    const existingCustomer = await this.customerRepo.findOne({ where: { id } });

    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    await this.customerRepo.delete(id);
    return `Customer with ID ${id} has been deleted successfully`;
  }

  async getCustomersWithNullFullName(): Promise<Customer | null> {
    return await this.customerRepo.findOne({
      where: [
        { full_name: IsNull() },
        { full_name: '' }
      ]
    });
  }
}
