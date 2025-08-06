import { Delete,Controller, Get, Put,Post, ValidationPipe,Body,UseInterceptors,UploadedFile, Param, Patch, ParseIntPipe} from '@nestjs/common';
import { createCustomerDto } from './dtos/create_customer.dto';
import { customerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer,MulterError,diskStorage } from 'multer';
import { UpdateCustomerDto } from './dtos/update_customer.dto';
 




@Controller('customer')
export class CustomerController {

    constructor(private  customer_service: customerService) {

 }


 @Get('null')
  getCustomersWithNullFullName() {
    return this.customer_service.getCustomersWithNullFullName();
    //console.log("Fetching customers with null full name");
  }


//working fine
@Get(":id")
getCustomerById(@Param("id",ParseIntPipe) id: number) {
    return this.customer_service.getCustomerById(id);
}




//working fine
@Post("addCustomer")
createCustomer(@Body(new ValidationPipe({whitelist:true,transform:true})) customer: createCustomerDto  ) {
     
this.customer_service.createCustomer(customer);

return "Customer created successfully";   

}



//working fine
@Get()
getAllCustomer()
{

return this.customer_service.getCustomerDetails();

}





@Put("UpdateCustomer")
UpdateCustomerById()
{

    return "Customer are  successfully updated"; 
}


@Patch(":id")
updateCustomerById(@Param("id") id: number, @Body(new ValidationPipe()) customer: UpdateCustomerDto) {
//console.log(id, customer);

    this.customer_service.updateCustomerById(+id, customer);
return "Customer updated successfully";

}


// @Patch()
// updateCustomerById(@Body(new ValidationPipe({whitelist:true,transform:true})) customer: UpdateCustomerDto) {
// console.log( customer);
// return "Customer updated successfully";

// }





@Get()
TrackCustomerParcelById()
{

    return "Track All Customer Parcel successfully By Id";   
}




@Get("Details")
getCustomerDetails()
{

    return "Customer details retrieved successfully";   
}


// @Delete(":number")
// deleteCustomerByNumber( @Param() number: number) {

//     //console.log(number);

//    return this.customer_service.deleteCustomerByNumber(number);

// }


// @Get(':number')
// deleteCustomerByNumber( @Param("number") number: number,) {
  

//    //return this.customer_service.deleteCustomerById(id);

// }






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


 @Delete(':id')
deleteCustomerById(@Param('id') id: number) {
    console.log(`Deleting customer with ID: ${id}`);
  return this.customer_service.deleteCustomerById(+id);
  
}











}



