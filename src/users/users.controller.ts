import { Controller, Get, Param, ParseIntPipe, Post, Query,Body } from "@nestjs/common";
import { service } from "./users.service";


@Controller("users")
export class userController {

    constructor(private readonly userService: service) {

    }


    @Get()
    getUsers(@Query() query: any) {
        console.log(query);

        if( query.gender)
        {
            return this.userService.getAllUsers().filter (u =>u.gender === query.gender );

        }

        return this.userService.getAllUsers();
        

    }



    @Get(':age')
    getUserByMobileNumber(@Param('age', ParseIntPipe) age:any) {
        console.log(Param);
        return this.userService.getUserByMobileNumber(age);
    }



    @Post()
    createUser()
    {
        const user = {
        mobileNumber: '017............',
        name: 'alamin',
        presentAddress: ', Dhaka_basundhara', 
        pickupSchedule: '09:00 AM',
        gender: 'male',
        age: 25
        };

        this.userService .createUser(user);

       
     return 'user created successfully';


    }
   


   

}
