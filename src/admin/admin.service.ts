import { Injectable} from "@nestjs/common";

@Injectable()
export class AdminService{

    private admins:any[]= []; //in memory array

getAdmin():object[] {
    return this.admins;
}

addAdmin(admindata:object):object{
   this.admins.push(admindata);
   return {message: "Admin added" , admin:admindata};

}
getAdminByID(id:number):object{
    const admin=this.admins.find((a) => a.id === id);
    if(admin) return admin;
    return {message: "Admin not found" };
    
}
}

