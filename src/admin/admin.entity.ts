import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin")
export class AdminEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: true })
    ad_name: string;
    
    // @Column({ nullable: true })
    // ad_username: string;
    
    // @Column()
    // ad_email: string;
    
    // @Column()
    // ad_password: string;
    
    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'bigint', unsigned: true })
    ad_phoneNumber: string;
    
    // @Column()
    // ad_age: number;

    // @Column()
    // ad_address: string;
    
    // @Column()
    // ad_nid: number;

    @BeforeInsert()
    generateId() {
        this.id = Math.floor(Math.random() * 1000000);
    }

    
    // @Column()
    // filename:string;
}