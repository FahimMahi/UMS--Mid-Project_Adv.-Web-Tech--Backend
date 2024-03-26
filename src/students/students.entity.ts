import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToMany(() => RegisteredCourse, (registerCourse)=> registerCourse.students)
  registerCourse: RegisteredCourse[]
}

@Entity("registerCourse")
export class RegisteredCourse{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  courseCode: string;

  @Column()
  @IsNotEmpty()
  courseName: string;

  @Column({default: 'Invalid'})
  CourseStatus: string;

  @Column({name: 'course_id'})
  @IsNotEmpty()
  courseId: number;

  @ManyToOne(() => StudentsEntity, (students)=> students.registerCourse)
  @JoinColumn({name: 'course_id'})
  students: StudentsEntity
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

@Entity("offeredClubs")
export class OfferedClubs{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  clubName: string;

  @Column()
  @IsNotEmpty()
  clubDescription: string;
}

@Entity("joinClub")
export class JoinCLub{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  userName: string;

  @Column()
  @IsNotEmpty()
  clubName: string;
}

@Entity("appoinment")
export class Appointment{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  userName: string;

  @Column()
  @IsNotEmpty()
  teacherName: string;

  @Column({type: 'timestamp'})
  @IsNotEmpty()
  date: Date;
}
