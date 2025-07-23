import { Injectable} from "@nestjs/common";

@Injectable()
export class AdminService{

getAdmin():string{
    return "All Admin";
}
getAdminByNameandID(name:string,id:number):object{
    return {name:name,id:id};
}
addAdmin(admindate:object):object{
    return admindate;
}

}

