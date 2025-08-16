import { 
  Delete, Controller, Get, Put, Post, ValidationPipe, Body, 
  UseInterceptors, UploadedFile, Param, Patch, ParseIntPipe 
} from '@nestjs/common';
import { CreateCustomerDto } from './dtos/create_customer.dto';
import { customerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { UpdateCustomerDto } from './dtos/update_customer.dto';
import { UpdateCustomerPutDto } from './dtos/update_customer_put.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customer_service: customerService
    
  ) {}
  
  

  // ---------------- GET METHODS ----------------

  @Get("all_customers")
  getAllCustomers() {

    return this.customer_service.getCustomerDetails();
    
  }

  @Get('null')
  getCustomersWithNullFullName() {
    return this.customer_service.getCustomersWithNullFullName();
  }

  

  @Get('track')
  TrackCustomerParcelById() {
    return 'Track All Customer Parcel successfully By Id';
  }

  @Get('Details')
  getCustomerDetails() {
    return 'Customer details retrieved successfully';
  }

  @Get(':id')
  getCustomerById(@Param('id', ParseIntPipe) id: number) {
    return this.customer_service.getCustomerById(id);
  }

  

  // ---------------- POST METHODS ----------------

  @Post('add_customers')
  createCustomer(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    customer: CreateCustomerDto
  ) {
    this.customer_service.createCustomer(customer);
    return 'Customer created successfully';
  }



  @Post('profile_picture')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
        cb(null, true);
      } else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      }
    },
    limits: { fileSize: 500000 },
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
      },
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return 'File uploaded successfully';
  }

  // ---------------- PUT METHODS ----------------

  // @Put('UpdateCustomer')
  // UpdateCustomerById() {
  //   return 'Customer successfully updated';
  // }


@Put(':id')
replaceCustomer(
  @Param('id', ParseIntPipe) id: number,
  @Body(new ValidationPipe()) customer: UpdateCustomerPutDto
) {
  return this.customer_service.replaceCustomer(id, customer);
}





  // ---------------- PATCH METHODS ----------------

  @Patch(':id')
  updateCustomerById(
    @Param('id',ParseIntPipe) id: number,
    @Body(new ValidationPipe()) customer: UpdateCustomerDto
  ) {
    this.customer_service.updateCustomerById(+id, customer);
    return 'Customer updated successfully';
  }
  
  // ✅ Update by phone (string)
  @Patch('by-phone/:phone')
  updateCustomerByPhone(
    @Param('phone') phone: string,
    @Body(new ValidationPipe()) customer: UpdateCustomerDto
  ) {
    return this.customer_service.updateCustomerByPhone(phone, customer);
  }

  // ---------------- DELETE METHODS ----------------

  @Delete(':id')
  deleteCustomerById(@Param('id') id: number) {
    console.log(`Deleting customer with ID: ${id}`);
    return this.customer_service.deleteCustomerById(+id);
  }
}
