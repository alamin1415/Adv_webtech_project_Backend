import { Customer_profile } from "src/customer_profile/customer_profile.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  full_name?: string; // Optional

  @Column({ type: 'varchar', nullable: true })
  email?: string; // Optional

  @Column({ type: 'varchar', nullable: false })
  phone: string; // Required (Not nullable), now as string


  @OneToOne(() => Customer_profile, (Customer_profile)=>Customer_profile.customer,{ nullable: true,
    cascade: ["insert", "update"], // cascade remove
    //eager: true  // Automatically load profile when fetching customer
   })
  //@JoinColumn()
  profile: Customer_profile|null; // Optional, can be used to link to a profile entity
  



  // @OneToOne(() => Customer_profile, {
  //   nullable: true,
  //   cascade: ["insert", "update", "remove"], // cascade remove
  //   onDelete: "CASCADE" // database level cascade
  // })
  // // @JoinColumn()
  // profile?: Customer_profile|null;
  

  



  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // Auto-set when row is created

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // Auto-updated on row update

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date; // Soft delete timestamp
}
