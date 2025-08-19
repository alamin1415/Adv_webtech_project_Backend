import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { customerService } from 'src/customer/customer.service';
import { CreateCustomerDto } from 'src/customer/dtos/create_customer.dto';
import { logInDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(customerService)
    private readonly customerservice: customerService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService, // <-- যোগ হলো
  ) {}


public async signup(createCustomerDto: CreateCustomerDto) {
    // 1) কাস্টমার তৈরি করো
    await this.customerservice.createCustomer(createCustomerDto);

    // 2) যদি createCustomer() কোনো entity না রিটার্ন করে, তখন ফোন দিয়ে খুঁজে নাও
    const customer = await this.customerservice.findCustomerByPhone(createCustomerDto.phone);

    // 3) ইমেইল থাকলে ওয়েলকাম মেইল পাঠাও
    const emailTo = customer?.email ?? createCustomerDto?.email;
    const name = customer?.full_name ?? createCustomerDto?.full_name;

    if (emailTo) {
        try {
            await this.emailService.sendWelcomeEmail(emailTo, name);
        } catch (e) {
            // ইমেইল ব্যর্থ হলেও সাইনআপ ব্যর্থ হবে না
            console.warn('Welcome email failed:', e.message);
        }
    }

    // 4) রেসপন্স
    return {
        message: 'Dear Customer, your information has been saved successfully',
    };
}



  public async login(logindto: logInDto) {
    const customer = await this.customerservice.findCustomerByPhone(logindto.phone);

    let isequal = await this.hashingProvider.comparePassword(
      logindto.password,
      customer.password,
    );

    if (!isequal) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    const payload_service = {
      phone: customer.phone,
      name: customer.full_name,
    };

    const token = await this.jwtService.signAsync(payload_service, {
      secret: 'mySuperSecretKey123!',
    });

    // (অপশনাল) লগইন হলে ইমেইল অ্যালার্ট
    // যদি customer.email থাকে, তাহলে পাঠাও
    // void this.emailService.sendLoginNotice(customer.email, customer.full_name);

    return {
      message: 'Dear Customer you are successfully logged in',
      token: token,
    };
  }
}
