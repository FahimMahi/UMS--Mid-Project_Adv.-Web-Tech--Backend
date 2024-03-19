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