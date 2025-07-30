import { Controller, Get, Post, ValidationPipe,Body,UseInterceptors,UploadedFile} from '@nestjs/common';
import { createCustomerDto } from './dtos/create_customer.dto';
import { customerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer,MulterError,diskStorage } from 'multer';
 

@Controller('customer')
export class CustomerController {

    constructor(private  customer_service: customerService) {

    }



@Get()
getCustomerDetails()
{

    return "Customer details retrieved successfully";   
}


 @Post('profile_picture')
 @UseInterceptors(FileInterceptor('file',
 { fileFilter: (req, file, cb) => {
 if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
 cb(null, true);
 else {
 cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
 }
 },
 limits: { fileSize: 500000 },
 storage:diskStorage({
 destination: './uploads',
 filename: function (req, file, cb) {
 cb(null,Date.now()+file.originalname)
 },
 })
 }))
 uploadFile(@UploadedFile() file: Express.Multer.File) {
 console.log(file);
    return "File uploaded successfully";
 }

 


@Post("create")
createCustomer(@Body(new ValidationPipe({whitelist:true})) customer: createCustomerDto  ) {
     
    return {
    
       message: "Customer created successfully_controller",

        customer: customer,
}









}
}


