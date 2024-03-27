import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class TeacherDTO{
    id: number;
    @IsNotEmpty({ message: 'UserName cannot be empty' })
    username: string;
    
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    @MinLength(5, { message: 'Email must be at least 5 characters long' })
    email: string;
    
    @IsNotEmpty({ message: 'Password cannot be empty' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase character' })
    password: string;

    @IsNotEmpty({ message: 'Name cannot be empty' })
    @MaxLength(50, { message: 'Name should be maximum 50 characters long' })
    fullName: string;

    @IsNotEmpty({message: 'Please enter a valid education department'}) 
    department: string;

    //@Matches(/\.pdf$/, { message: 'File must contain .pdf extension' })
    uploadCV: string;

    @IsNotEmpty({message: 'Please enter your address'}) 
    address: string;

    @IsNotEmpty({ message: 'Phone number cannot be empty' })
    @Matches(/^0/, { message: 'Phone number must start with 0' })
    phoneNumber: string;

    isActive: boolean;
}

export class TeacherLoginDTO {
    @IsNotEmpty({ message: 'Email cannot be empty' })
    email: string;
    @IsNotEmpty({ message: 'Password cannot be empty' })
    password: string;
}
    
