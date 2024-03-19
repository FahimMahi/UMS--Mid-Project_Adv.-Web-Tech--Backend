import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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