import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { StaffInfo } from "./admin.dto";
import * as bcrypt from 'bcryptjs';

@Entity("admin")
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    address: string;

    @Column()
    dob: string;
  
    @Column()
    phoneNumber: string;

    

    @Column()
    email: string;

    @Column()
    designation: string;

    @Column()
    password: string;

    @Column()
    nid: number;

    @Column()
    profilepic: string;
    
    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 10);
    // }

    @OneToOne(() => Staff)
    @JoinColumn()
    staffInfo: Staff[];
}

@Entity("student")
export class Student {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    studentId: string;
  
    @Column()
    fullName: string;
  
    @Column()
    email: string;

    @Column()
    fathersname:string;

    @Column()
    mothersname:string;

    @Column()
    guardianname:string;

    @Column()
    guardianphone:string;
  
    @Column()
    address: string;
  
    @Column()
    phoneNumber: string;
  
    
  
    @Column({ nullable: true })
    major: string;
  
    @Column({ type: 'float', nullable: true })
    gpa: number;
  
    @Column()
    dob: string;
  
    @Column()
    password: string;
  
    @Column()
    enrollmentDate: Date;
  
    @Column({ type: 'date', nullable: true })
    graduationDate: Date;
  
    @Column()
    profilepic: string;

    @ManyToMany(() => Course, course => course.students)
    courses: Course[];
}

@Entity("faculty")
export class Faculty {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    name: string;
  
    @Column()
    username: string;
  
    @Column()
    address: string;
  
    @Column()
    phoneNumber: string;
  
    
  
    @Column()
    email: string;

    @Column()
    dob: string;
  
  
    @Column()
    designation: string;
  
    @Column()
    password: string;
  
    @Column()
    nid: number;
  
    @Column()
    profilepic: string;

    @OneToMany(() => Course, course => course.faculty)
    courses: Course[];
    @ManyToOne(() => Department, department => department.faculty)
    department: Department[];
}

@Entity("staff")
export class Staff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column()
    username: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;    

    @Column()
    dob: string;

    @Column()
    email: string;

    @Column()
    designation: string;

    @Column()
    password: string;

    @Column()
    nid: number;

    @Column()
    profilepic: string;

    @ManyToOne(() => Department, department => department.staff)
    department: Department[];
}

@Entity("course")
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    title: string;

    @Column()
    credits: number;

    @ManyToOne(() => Faculty, faculty => faculty.courses)
    faculty: Faculty;

    @ManyToMany(() => Student)
    @JoinTable()
    students: Student[];

    @ManyToOne(() => Department, department => department.courses)
    department: Department[];
}

@Entity("department")
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    degree: string; 

    @OneToMany(() => Staff, staff => staff.department)
    staff: Staff[];

    @OneToMany(() => Faculty, faculty => faculty.department)
    faculty: Faculty[];

    @OneToMany(() => Course, course => course.department)
    courses: Course[];
}
