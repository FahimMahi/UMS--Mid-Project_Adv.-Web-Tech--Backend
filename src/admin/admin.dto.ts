import { Type } from "class-transformer";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsBoolean, IsDate, IsDateString, IsDecimal, IsEmail, IsEnum, IsISBN, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, IsUrl, Length, Matches, Max, MaxLength, Min, Validate, ValidateNested } from "class-validator";

export class AdminDTO{
    @IsNotEmpty({message: 'Please enter a valid name'}) 
    @IsString()
    name:string;
    @IsString()
    address:string;
    @IsNumber()
    id:number;
    @IsString()
    @IsEmail()
    email:string;
}

export class CreateStudentDto {
    @IsNotEmpty({message: 'Please enter a valid name'}) 
    @Matches(/^[a-zA-Z]+$/, { message: 'Name should contain only alphabetic characters' })
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    id:number;
    
    @IsNotEmpty()
    @IsString()
    address:string;

    @IsNotEmpty()
    @Matches(/^018-\d{7}$/, { message: 'Phone number must match format 018-xxxxxxx' })
    phoneNumber: string;

    

    @IsNotEmpty()
    @IsString()
    department:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Matches(/.*@.*\.xyz$/, { message: 'Email address must end with .xyz domain' })
    email:string;

    @IsNotEmpty()
    @IsStrongPassword()
    @Matches(/.*[0-9].*/, { message: 'Password must contain at least one numeric character' })
    password:string;

    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/, { message: 'Invalid Bangladeshi NID number format. Digit must be 10.' })
    nid: number;
    
    // @IsNotEmpty({ message: 'NID image is required' })
    // @Validate(FileSizeValidator, { message: 'NID image size must be no more than 2 MB' }) 
    // nidImage: any;




    // // @IsDate()
    // admissiondate:string;
}

export class CreateTeacherDto {
    @IsNotEmpty({message: 'Please enter a valid name'}) 
    @IsString()
    name:string;
    @IsNumber()
    id:number;
    @IsString()
    address:string;
    @IsNumber()
    age:number;
    
    @IsNotEmpty()
    @Matches(/^018-\d{7}$/, { message: 'Phone number must match format 018-xxxxxxx' })
    phoneNumber: string;
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Matches(/.*@.*\.xyz$/, { message: 'Email address must end with .xyz domain' })
    email:string;
    @IsString()
    department:string;
    @IsString()
    designation:string;
    @IsStrongPassword()
    password:string;
    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/, { message: 'Invalid Bangladeshi NID number format. Digit must be 10.' })
    nid: number;


}

export class CreateStaffDto {
    @IsNotEmpty({message: 'Please enter a valid name'}) 
    @IsString()
    name:string;
    @IsNumber()
    id:number;
    @IsString()
    address:string;
    
    @IsNotEmpty()
    @Matches(/^018-\d{7}$/, { message: 'Phone number must match format 018-xxxxxxx' })
    phoneNumber: string;
    @IsNumber()
    age:number;
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Matches(/.*@.*\.xyz$/, { message: 'Email address must end with .xyz domain' })
    email:string;
    @IsString()
    designation:string;
    @IsStrongPassword()
    password:string;
    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/, { message: 'Invalid Bangladeshi NID number format. Digit must be 10.' })
    nid: number;

    @IsNotEmpty()
    filename:string;

}

export class CreateAdminDto {
    @IsNotEmpty({message: 'Please enter a valid name'}) 
    @IsString()
    name:string;
    @IsNumber()
    id:number;
    @IsString()
    address:string;
    
    @IsNotEmpty()
    @Matches(/^018-\d{7}$/, { message: 'Phone number must match format 018-xxxxxxx' })
    phoneNumber: string;
    @IsNumber()
    age:number;
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Matches(/.*@.*\.xyz$/, { message: 'Email address must end with .xyz domain' })
    email:string;
    @IsString()
    designation:string;
    @IsStrongPassword()
    password:string;
    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/, { message: 'Invalid Bangladeshi NID number format. Digit must be 10.' })
    nid: number;

}

export class StudentInfo {
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNumber()
    id:number;
    @IsString()
    address:string;
    @IsPhoneNumber()
    phone:number;
    @IsNumber()
    age:number;
    @IsString()
    department:string;
    @IsString()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    @IsStrongPassword()
    password:string;
    // // @IsDate()
    // admissiondate:string;
}

export class TeacherInfo {
    @IsString()
    name:string;
    @IsNumber()
    id:number;
    @IsString()
    address:string;
    @IsNumber()
    age:number;
    @IsPhoneNumber()
    phone:number;
    @IsString()
    @IsEmail()
    email:string;
    @IsString()
    department:string;
    @IsString()
    designation:string;
    @IsStrongPassword()
    password:string;
}


export class AdminInfo {
    // @IsOptional()
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    username:string;
    
    @IsNotEmpty()
    @IsString()
    address:string;
    
    @IsNotEmpty()
    @Matches(/^01\d{9}$/, { message: 'Phone number must match format 01xxxxxxxxx' })
    
    @IsNumberString() 
    phoneNumber: string;
    
    
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    // @Matches(/.*@.*\.xyz$/, { message: 'Email address must end with .xyz domain' })
    @Matches(/^.+@aiub\.edu$/, { message: 'Email address must belong to aiub.edu domain' })
    email: string;

    @IsNotEmpty()
    @IsDateString()
    dob: string;
    
    @IsNotEmpty()
    @IsString()
    designation:string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;

    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/, { message: 'Invalid Bangladeshi NID number format. Digit must be 10.' })
    nid: number;
    
    // @IsNotEmpty()
    // @IsUrl()
    profilepic:string;
}

export class StudentRecordsDto {
    @IsNotEmpty()
    @Matches(/^\d{2}-\d{5}-\d{1}$/, { message: 'studentId must be in the format XX-XXXXX-X' })
    studentId: string;
  
    @IsNotEmpty()
    @IsString()
    fullName: string;
  
    @IsNotEmpty()
    @IsEmail()
    @Matches(/^\d{2}-\d{5}-\d{1}@student\.aiub\.edu$/, { message: 'Email must be in the format XX-XXXXX-X@student.aiub.edu', })
    email: string;
    
    @IsNotEmpty()
    @IsString()
    address:string;

    @IsNotEmpty()
    @IsString()
    fathersname:string;

    @IsNotEmpty()
    @IsString()
    mothersname:string;

    @IsNotEmpty()
    @IsString()
    guardianname:string;

    @IsNotEmpty()
    @Matches(/^01\d{9}$/, { message: 'GuardianPhone number must match format 01xxxxxxxxx' })
    @IsNumberString() 
    guardianphone:string;
    
    @IsNotEmpty()
    @Matches(/^01\d{9}$/, { message: 'Student Phone number must match format 01xxxxxxxxx' })
    @IsNumberString() 
    phoneNumber: string;
    
    

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    major: string;
    
    @IsNotEmpty()
    @IsOptional()
    @Min(0)
    @Max(4)
    gpa: number;

    
    @IsNotEmpty()
    @IsDateString()
    dob: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password:string;

    @IsNotEmpty()
    @IsDateString()
    enrollmentDate: string;
  
    @IsOptional()
    @IsDateString()
    graduationDate: string;

    
    
    profilepic:string;
}

export class FacultyInfo {
    // @IsOptional()
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    username:string;
    
    @IsNotEmpty()
    @IsString()
    address:string;
    
    @IsNotEmpty()
    @Matches(/^01\d{9}$/, { message: 'Phone number must match format 01xxxxxxxxx' })
    @IsNumberString() 
    phoneNumber: string;
    

    @IsNotEmpty()
    @IsDateString()
    dob: string;
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    // @Matches(/.*@.*\.xyz$/, { message: 'Email address must end with .xyz domain' })
    @Matches(/^.+@aiub\.edu$/, { message: 'Email address must belong to aiub.edu domain' })
    email: string;
    
    @IsNotEmpty()
    @IsString()
    designation:string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;

    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/, { message: 'Invalid Bangladeshi NID number format. Digit must be 10.' })
    nid: number;
    
    
    profilepic:string;
}

export class StaffInfo {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    username:string;
    
    @IsNotEmpty()
    @IsString()
    address:string;
    
    @IsNotEmpty()
    @Matches(/^01\d{9}$/, { message: 'Phone number must match format 01xxxxxxxxx' })
    @IsNumberString() 
    phoneNumber: string;

    @IsNotEmpty()
    @IsDateString()
    dob: string;
    
    
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    // @Matches(/.*@.*\.xyz$/, { message: 'Email address must end with .xyz domain' })
    @Matches(/^.+@aiub\.edu$/, { message: 'Email address must belong to aiub.edu domain' })
    email: string;
    
    @IsNotEmpty()
    @IsString()
    designation:string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;

    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/, { message: 'Invalid Bangladeshi NID number format. Digit must be 10.' })
    nid: number;
    
    
    profilepic:string;
}

export class CourseDTO {
    @IsNotEmpty()
    @IsString()
    code: string;
  
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsNumber()
    credits: number;
  
}

export class DepartmentDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    degree: string;
}