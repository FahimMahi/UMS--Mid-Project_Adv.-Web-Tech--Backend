import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("teacher")
export class TeacherEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string

    @Column({ type: "varchar", length: 150 })
    fullName: string;
    
    @Column()
    department: string;

    @Column()
    uploadCV: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @Column({ type: "boolean", default: false })
    isActive: boolean;

    @BeforeInsert()
    generateId() {
        this.id = Date.now();
    }
}