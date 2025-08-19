import { Inject, Injectable } from '@nestjs/common';
import { read } from 'fs';
import { customerService } from 'src/customer/customer.service';
import { CreateCustomerDto } from 'src/customer/dtos/create_customer.dto';
import { logInDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthenticationService {

    constructor( @Inject(customerService)
        private readonly customerservice: customerService,
        private readonly hashingProvider: HashingProvider,
        private readonly jwtService: JwtService
    ) {}


        public async signup(createCustomerDto: CreateCustomerDto) {
        
            await  this.customerservice.createCustomer(createCustomerDto)

            return{
                message: " Dear Customer your information save  successfully"
            }
        }


      public async login( logindto: logInDto)
        {

          let customer = await  this.customerservice.findCustomerByPhone(logindto.phone)

          let isequal : boolean = false;

    
          isequal = await this.hashingProvider.comparePassword(logindto.password, customer.password);

    
          if (!isequal) {
                throw new UnauthorizedException("Invalid phone or password");
          }


        //   const token = this.jwtService.signAsync ({

        //     sub: customer.id, 
        //     phone: customer.phone,
        //     name: customer.full_name}
        //     , {
        //         //secret:


        //   })
            const payload_service = {
                    
            phone: customer.phone,     // user phone
            name: customer.full_name   // user full name
            };

            const token = await this.jwtService.signAsync(// user full name
            payload_service, {
            secret: 'mySuperSecretKey123!'  
            });






            return {
                
                message:"Dear Customer you are successfully logged in"
                , token: token
            };

        } 


}
