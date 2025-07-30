import { IsString, IsEmail, Matches, IsNotEmpty, MinLength, MaxLength, IsNumber} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAdminDto {

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[A-Za-z\s]+$/, {message: 'Name should contain only alphabets and spaces',})
  name: string;

  @Type(() => Number)
  @IsNumber({},{ message: 'ID must be a number.' })
  @IsNotEmpty({ message: 'ID is required.' })
  id: number;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @Matches(/@.*\.xyz$/, { message: 'Email must contain "@" and end with ".xyz" domain',})
  email: string;

  //valid NID formation
  @IsString()
  @IsNotEmpty({ message: 'NID is required' })
  @MinLength(13, { message: 'NID must be at least 10 digits' })
  @MaxLength(17, { message: 'NID must be at most 17 digits' })
  @Matches(/^\d+$/, { message: 'NID must contain only digits' })
  nid: string;

  //file validation

}
