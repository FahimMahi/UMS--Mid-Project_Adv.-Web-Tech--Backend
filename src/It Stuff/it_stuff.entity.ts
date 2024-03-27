import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany,JoinColumn } from 'typeorm';
import { StudentEntity } from './students.entity'; // Import StudentEntity


@Entity("it_stuff")
export class ITStuffEntity {


  @PrimaryGeneratedColumn({ unsigned: true }) 
  id: number;

  @Column({ length: 100 }) 
  fullName: string;

  @Column({ unsigned: true }) 
  age: number;

  @Column({ default: 'active', enum: ['active', 'inactive'] })
  status: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  phoneNumber: string;

  @Column({nullable:true})
  profilePicture: string;

// Define one-to-one relationship with StudentEntity
@OneToOne(() => StudentEntity, student => student.itStuff)
@JoinColumn()
student: StudentEntity ;

// Define the one-to-many relationship with students
@OneToMany(() => StudentEntity, student => student.itStuff)
students: StudentEntity[];
  
}
