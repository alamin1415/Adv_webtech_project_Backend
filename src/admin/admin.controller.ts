import {Controller, Get, Query, Post, Body} from '@nestjs/common';
import {AdminService} from "./admin.service";

@Controller('admin')
export class AdminController{ //class
constructor(private readonly adminService:AdminService)
{}

@Get()
getAdmin(){
    return this.adminService.getAdmin();
}

@Get('gateadmin')
getAdminByNameandID(@Query('name') name:string, @Query('id') id:number): object
{
return this.adminService.getAdminByNameandID(name,id);
}

@Post('addadmin')
addAdmin(@Body() admindata: object): object
{
    return this.adminService.addAdmin(admindata);
}

}