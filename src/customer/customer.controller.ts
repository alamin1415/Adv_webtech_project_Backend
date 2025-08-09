import { 
  Delete, Controller, Get, Put, Post, ValidationPipe, Body, 
  UseInterceptors, UploadedFile, Param, Patch, ParseIntPipe 
} from '@nestjs/common';
import { createCustomerDto } from './dtos/create_customer.dto';
import { customerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { UpdateCustomerDto } from './dtos/update_customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customer_service: customerService) {}

  // ---------------- GET METHODS ----------------


  @Get('null')
  getCustomersWithNullFullName() {
    return this.customer_service.getCustomersWithNullFullName();
  }

  @Get(':id')
  getCustomerById(@Param('id', ParseIntPipe) id: number) {
    return this.customer_service.getCustomerById(id);
  }

  

  @Get('track')
  TrackCustomerParcelById() {
    return 'Track All Customer Parcel successfully By Id';
  }

  @Get('Details')
  getCustomerDetails() {
    return 'Customer details retrieved successfully';
  }

  // ---------------- POST METHODS ----------------

  @Post('addCustomer')
  createCustomer(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    customer: createCustomerDto
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

  @Put('UpdateCustomer')
  UpdateCustomerById() {
    return 'Customer successfully updated';
  }

  // ---------------- PATCH METHODS ----------------

  @Patch(':id')
  updateCustomerById(
    @Param('id') id: number,
    @Body(new ValidationPipe()) customer: UpdateCustomerDto
  ) {
    this.customer_service.updateCustomerById(+id, customer);
    return 'Customer updated successfully';
  }

  // ---------------- DELETE METHODS ----------------

  @Delete(':id')
  deleteCustomerById(@Param('id') id: number) {
    console.log(`Deleting customer with ID: ${id}`);
    return this.customer_service.deleteCustomerById(+id);
  }
}
