import { Entity, PrimaryGeneratedColumn, Column, OneToOne,ManyToOne} from 'typeorm';
import { ITStuffEntity } from './it_stuff.entity'; // Import ITStuffEntity

@Entity("students")
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Define one-to-one relationship with ITStuffEntity
  @OneToOne(() => ITStuffEntity, itStuff => itStuff.student)
  itStuff: ITStuffEntity;

  @ManyToOne(() => ITStuffEntity, itStuff => itStuff.students)
  itStuffid: ITStuffEntity;
}