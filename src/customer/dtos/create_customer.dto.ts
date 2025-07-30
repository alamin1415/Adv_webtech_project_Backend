import { IsEmail,  IsIn,  IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches, MinLength, } from "class-validator";

export class createCustomerDto {

//full_name;
  @IsString()
  @IsNotEmpty()
  full_name: string;

// email;
  @IsEmail()
  @IsNotEmpty()
  @Matches(/^[\w.-]+@aiub\.edu$/, {
    message: 'Email must contain @aiub.edu domain',
  })
  email: string;

// phone;
 @IsMobilePhone('bn-BD', {},{
  message: 'Mobile number must be a valid Bangladeshi number',
})
@IsNotEmpty()
@IsString()
@Matches(/^\d+$/, {
message: 'Mobile number must contain only digits',
})
  phone: string;

// address;
  @IsString()
  @IsNotEmpty()
  address: string;

// password;
@IsString()
@IsNotEmpty()
@MinLength(6, { message: 'Password must be at least 6 characters long' })
@Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
password: string;

// confirm_password;
@IsString()
@IsNotEmpty()
@MinLength(6, { message: 'Password must be at least 6 characters long' })
@Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
confirm_password: string;

//gender;
@IsString()
@IsOptional()
@IsIn(['male', 'female'], {
    message: 'Gender must be either "male" or "female"',
  })
gender: string;




}