import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  IsMobilePhone,
} from "class-validator";

export class CustomerProfileDto {
  // full_name - optional string
  @IsString()
  @IsOptional()
  full_name?: string;

  // email - optional, must be valid if provided
  @IsEmail({}, { message: "Invalid email address" })
  @IsOptional()
  email?: string;

  // phone - optional string, must be valid Bangladeshi phone number if provided
  @IsMobilePhone("bn-BD", {}, { message: "Phone number must be a valid Bangladeshi number" })
  @IsOptional()
  phone?: string;

  // address - optional string
  @IsString()
  @IsOptional()
  address?: string;

  // password - optional string, if provided min length and uppercase letter
  @IsString()
  @IsOptional()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @Matches(/(?=.*[A-Z])/, {
    message: "Password must contain at least one uppercase letter",
  })
  password?: string;

  // confirm_password - optional string, same validation as password
  @IsString()
  @IsOptional()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @Matches(/(?=.*[A-Z])/, {
    message: "Password must contain at least one uppercase letter",
  })
  confirm_password?: string;

  // gender - optional, must be "male" or "female" if provided
  @IsString()
  @IsOptional()
  @IsIn(["male", "female"], {
    message: 'Gender must be either "male" or "female"',
  })
  gender?: string;

  // isActive - optional boolean
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  


}
