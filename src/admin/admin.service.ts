import { BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin, MoreThan, Repository } from "typeorm";
import { AdminInfo } from "./admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/updateadmin.dto";
import * as bcrypt from 'bcrypt'
import { ManagerInfo } from "src/manager/manager.entity";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AdminService{

   constructor(
    @InjectRepository(AdminInfo) private adminRepo: Repository<AdminInfo>,
    @InjectRepository(ManagerInfo) private managerRepo: Repository<ManagerInfo>,
    private mailerService:MailerService,
  ) {}


async createAdmin(adminData: CreateAdminDto): Promise<AdminInfo> { //<AdminInfo> is the Type of one object
    return this.adminRepo.save(adminData);
   }


async changeStatus(id: number, status: 'active' | 'inactive'): Promise<{message:string}>{
   const result = await this.adminRepo.update(id, { status });

  if (result.affected === 0) {
    throw new NotFoundException(`Admin with ID ${id} not found`);
  }

  return { message: `Status updated to '${status}' for Admin ID ${id}` };
}

async getInactiveAdmins():Promise <AdminInfo[]> {  //<AdminInfo[]> is the Type of many object
    return this.adminRepo.find({where : {status:'inactive'} });
}

async getAdminOlderThan(age: number):Promise<AdminInfo[]>{
    return this.adminRepo.find({where:{age: MoreThan(age)} });
}

async getAllAdmins(): Promise <AdminInfo[]> {
    return this.adminRepo.find();
  }
    
async getAdminById(id: number): Promise<AdminInfo> {
  const admin= await this.adminRepo.findOne({ where: {id} });

  if(!admin){
    throw new NotFoundException(`Admin with ID ${id} not found`);
  }
  return admin;
}

async updateAdmin(id: number, updateData: UpdateAdminDto): Promise<{ message: string; updated: AdminInfo }>{
 const admin= await this.adminRepo.findOne({where: {id}});

 if(!admin){
  throw new NotFoundException(`Admin with ${id} not found`);
 }
// If new password
  if (updateData.password && updateData.password.trim() !== '') {
    const salt = await bcrypt.genSalt();
    updateData.password = await bcrypt.hash(updateData.password, salt);
  }
   else {
    updateData.password = admin.password; // keeping the old password
  }
 Object.assign(admin, updateData);
 const updated= await this.adminRepo.save(admin);

 return { message: 'Admin Information Updated Successfully',
       updated,
 } 

}

async findByUsername(fullname: string): Promise<AdminInfo | null>{

  return await this.adminRepo.findOne({where:{fullname}})

}

 async deleteAdmin(adminid: number): Promise<string>{

 const admin= await this.adminRepo.findOne({where : {id: adminid} });
 if(!admin){
  throw new NotFoundException(`Admin with ID ${adminid} not found`);
 }
 await this.adminRepo.remove(admin);

 return `Admin with ID ${adminid} deleted successfully`;
}

//MANAGER

async CreateManager(adminid: number, managerData: CreateManagerDto){

  const admin=await this.adminRepo.findOne({where:{id:adminid}});
  if(!admin){
    throw new NotFoundException('Admin not found');
  }

  const existsemail= await this.managerRepo.findOne({where :{email : managerData.email}});
  if(existsemail){
    throw new BadRequestException('Email already exists. Please try another one.');
  }

  const manager= await this.managerRepo.create({...managerData,admin});
  return await this.managerRepo.save(manager);
}

async getManagersByAdminId(adminid: number): Promise <ManagerInfo[]> {

  const admin= await this.adminRepo.findOne({where: {id:adminid}, relations: ['managers'],  });

  if(!admin){
    throw new NotFoundException('Admin Not Found');
  }
return admin.managers; 
}

async deleteManagerById(mid: number): Promise<string>{

 const manager= await this.managerRepo.findOne({where : {id: mid} });
 if(!manager){
  throw new NotFoundException(`Manager with ID ${mid} not found`);
 }
 await this.managerRepo.remove(manager);

 return `Manager with ID ${mid} deleted successfully`;
}


//Sending mail
async sendWelcomeEmail(toEmail: string, username: string) {
    await this.mailerService.sendMail({
      to: toEmail,
      subject: 'ABC Laundry Service',
      text: `Hello ${username}, Welcome to our Laundry Service!`,
    });
  }


/*
 private admins:any[]= []; //in memory array

getAdmin():object[] {
    return this.admins;
}

addAdmin(admindata:object):object{
   this.admins.push(admindata);
   return {message: "Admin added Successfully" , admin:admindata};

}
getAdminByID(id: number): object {
    const admin = this.admins.find(a => {
    if (a == null) return false;
   // Convert both sides to number for safe comparison
    return Number(a.id) === id;
  });
  if (admin) return admin;
  return { message: 'Admin not found!!!' };
}
*/

}


