import { IsNotEmpty, MinLength } from "class-validator";

export class CreateStudentsDto{
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}


export class UpdateStudentsDto{
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class OfferedCoursesDto{
  @IsNotEmpty()
  courseCode: string;

  @IsNotEmpty()
  courseName: string;

  @IsNotEmpty()
  semister: string;
}

export class ParkingDto{
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  vehicle: string;
}

export class CoreCurriculamDto{
  @IsNotEmpty()
  courseCode: string;

  @IsNotEmpty()
  courseName: string;

  @IsNotEmpty()
  credit: number;

  @IsNotEmpty()
  semister: string;
}