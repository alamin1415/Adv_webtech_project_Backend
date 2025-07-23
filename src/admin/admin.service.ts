import { Injectable} from "@nestjs/common";

@Injectable()
export class AdminService{

getAdmin():string{
    return "All Admin";
}
getAdminByNameandID(name:string,id:number):object{
    return {name:name,id:id};
}
addAdmin(admindata:object):object{
    return admindata;
}

}

