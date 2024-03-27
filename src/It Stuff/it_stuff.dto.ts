import { IsString, IsInt, Min, IsIn, IsEmail, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { StudentEntity } from './students.entity';
import { ITStuffEntity } from './it_stuff.entity';


export class CreateITStaffDto {
  itStuff: ITStuffEntity;
 

  @IsString()
  fullName: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsString()
  @IsIn(['active', 'inactive'])
  status: string;
  
  @IsString()
  @IsNotEmpty({ message: 'Name field is required' })
  @Length(4, undefined, { message: 'Name should be at least 4 characters long' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Address should not be empty' })
  @IsOptional()
  address: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email Address field is required' })
  @Matches(/^.+@aiub\.edu$/, { message: 'Email must be from aiub.edu domain' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password field is required' })
  @Length(6, undefined, { message: 'Password must be at least 6 characters long' })
  @Matches(/.*[A-Z].*/, { message: 'Password must contain at least one uppercase character' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Gender field is required' })
  @Matches(/^(male|female)$/i, { message: 'Gender must be either male or female' })
  gender: string;

  @IsString()
  @Length(13, 13, { message: 'Phone number must be exactly 13 characters long' })
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numeric characters' })
  phoneNumber: string;

  

  
}
export class CreateITStuffWithStudentDto {

  
  student: StudentEntity;
}

  
