import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("students")
export class StudentsEntity{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column({ unique: true })
  @IsNotEmpty()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  password: string;
}

@Entity("courses")
export class OfferedCoursesEntity{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  courseCode: string;

  @Column()
  @IsNotEmpty()
  courseName: string;

  @Column()
  @IsNotEmpty()
  semister: string;
}

@Entity("parking")
export class ParkingEntity{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  userName: string;

  @Column()
  @IsNotEmpty()
  vehicle: string;
}

@Entity("coreCourse")
export class CoreCurriculam{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  courseCode: string;

  @Column()
  @IsNotEmpty()
  courseName: string;

  @Column()
  @IsNotEmpty()
  credit: number;

  @Column()
  @IsNotEmpty()
  semister: string;
}