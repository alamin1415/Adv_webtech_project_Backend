import { IsString, IsNotEmpty, IsOptional, IsEmail, MinLength, Matches } from 'class-validator';

export class CreateManagerDto {
  @IsString()
    @IsNotEmpty({ message: 'Fullname is required' })
   @Matches(/^[A-Za-z][A-Za-z\s]*$/, {
      message: 'Fullname should contain only alphabets and spaces',
    })
  fullname: string;


   @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;


  @IsString()
  @IsNotEmpty({message: 'Password can not be empty'})
  @MinLength(6,{message: "Password must have atleast 6 characters"})
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  profile_picture?: string;

  @IsOptional()
  status?: 'active' | 'inactive' | 'suspended';
}
