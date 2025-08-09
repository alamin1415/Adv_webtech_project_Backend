import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // Auto-set when row is created

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // Auto-updated on row update

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date; // Soft delete timestamp
}
