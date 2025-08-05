import { PartialType } from '@nestjs/mapped-types';
import { createCustomerDto } from './create_customer.dto';

export class UpdateCustomerDto extends PartialType(createCustomerDto) {}