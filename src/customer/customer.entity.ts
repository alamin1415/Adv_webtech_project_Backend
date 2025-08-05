import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  full_name: string;

  @Column()
  email: string;

  //  @Column()
  //  phone: string;
  @Column({ type: 'bigint', unsigned: true })
  phone: number;

  @Column()
  address: string;  

  @Column()
  password: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;


  @Column({ unique: true })
  customCode: string; // Your custom code stored here

  @BeforeInsert()
  generateCustomCode() {
    this.customCode = `CUS_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  }


}
