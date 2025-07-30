import {Controller, Get, Query, Post, Body, Param, ParseIntPipe, ValidationPipe, UsePipes, UseInterceptors, UploadedFile} from '@nestjs/common';
import {AdminService} from "./admin.service";
import { CreateAdminDto } from './dto/create-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';


@Controller('admin')
export class AdminController{ //class
constructor(private readonly adminService:AdminService)
{}

@Get()
getAdmin(){
    return this.adminService.getAdmin();
}

@Get('gateadmin/:id')
getAdminByID(@Param('id', ParseIntPipe) id:number): object
{
return this.adminService.getAdminByID(id);
}
@Post('addadmin')
@UsePipes(new ValidationPipe())
@UseInterceptors(
  FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
        cb(null, true);
      } else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      }
    },
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    }),
  }),
)
async addAdmin(
  @Body() admindata: CreateAdminDto,
  @UploadedFile() file: Express.Multer.File,
) {
  console.log(admindata); // validated admin data
  console.log(file);      // uploaded file info

  return {
    message: 'Admin created successfully',
    data: admindata,
    uploadedFile: file?.filename,
  };
}


}