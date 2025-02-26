import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, type: 'varchar' })
  email!: string;

  @Column('varchar')
  password!: string;

  @Column('varchar')
  name!: string;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
}
