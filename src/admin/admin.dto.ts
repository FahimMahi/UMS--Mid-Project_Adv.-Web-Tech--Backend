import { IsBoolean, IsDate, IsEmail, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, Matches, Validate } from "class-validator";

export class AdminDTO{
    @IsNotEmpty({message: 'Please enter a valid name'}) 
    @IsString()
    name:string;
    @IsString()
    address:string;
    @IsInt()
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
    @IsInt()
    id:number;
    
    @IsNotEmpty()
    @IsString()
    address:string;

    @IsNotEmpty()
    @Matches(/^018-\d{7}$/, { message: 'Phone number must match format 018-xxxxxxx' })
    phoneNumber: string;

    @IsNotEmpty()
    @IsInt()
    age:number;

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




    // @IsDate()
    // admissiondate:string;
}

export class CreateTeacherDto {
    @IsNotEmpty({message: 'Please enter a valid name'}) 
    @IsString()
    name:string;
    @IsInt()
    id:number;
    @IsString()
    address:string;
    @IsInt()
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
    @IsInt()
    id:number;
    @IsString()
    address:string;
    
    @IsNotEmpty()
    @Matches(/^018-\d{7}$/, { message: 'Phone number must match format 018-xxxxxxx' })
    phoneNumber: string;
    @IsInt()
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
    @IsInt()
    id:number;
    @IsString()
    address:string;
    
    @IsNotEmpty()
    @Matches(/^018-\d{7}$/, { message: 'Phone number must match format 018-xxxxxxx' })
    phoneNumber: string;
    @IsInt()
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

export class AdminInfo {
    @IsOptional()
    // @IsNotEmpty()
    @IsString()
    ad_name?: string | null;;

    // @IsNotEmpty()
    // @IsString()
    // ad_username:string;
    
    // @IsNotEmpty()
    // @IsString()
    // ad_address:string;
    
    @IsNotEmpty()
    // @Matches(/^018-\d{8}$/, { message: 'Phone number must match format 018-xxxxxxxx' })
    
    @IsNumberString() 
    ad_phoneNumber: string;
    
    // @IsNotEmpty()
    // // @IsInt()
    // ad_age:number;
    
    // @IsNotEmpty()
    // @IsString()
    // @IsEmail()
    // // @Matches(/.*@.*\.xyz$/, { message: 'Email address must end with .xyz domain' })
    // @Matches(/^.+@aiub\.edu$/, { message: 'Email address must belong to aiub.edu domain' })
    // ad_email: string;
    
    // @IsNotEmpty()
    // @IsString()
    // ad_designation:string;

    // @IsNotEmpty()
    // // // @IsString()
    // // @IsStrongPassword()
    // ad_password: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean = true; 

    // @IsNotEmpty()
    // @Matches(/^[0-9]{10}$/, { message: 'Invalid Bangladeshi NID number format. Digit must be 10.' })
    // ad_nid: number;
    
    // @IsNotEmpty()
    // filename:string;
}

export class StudentInfo {
    @IsString()
    name:string;
    @IsInt()
    id:number;
    @IsString()
    address:string;
    @IsPhoneNumber()
    phone:number;
    @IsInt()
    age:number;
    @IsString()
    department:string;
    @IsString()
    @IsEmail()
    email:string;
    @IsStrongPassword()
    password:string;
    // @IsDate()
    // admissiondate:string;
}

export class TeacherInfo {
    @IsString()
    name:string;
    @IsInt()
    id:number;
    @IsString()
    address:string;
    @IsInt()
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

export class StaffInfo {
    @IsString()
    name:string;
    @IsInt()
    id:number;
    @IsString()
    address:string;
    @IsPhoneNumber()
    phone:number;
    @IsInt()
    age:number;
    @IsString()
    @IsEmail()
    email:string;
    @IsString()
    designation:string;
    @IsStrongPassword()
    password:string;
}
