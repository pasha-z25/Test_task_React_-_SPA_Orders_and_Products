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

  @Column('varchar')
  gender!: 'male' | 'female';

  @Column('varchar')
  avatar!: string;

  @Column({ nullable: true, type: 'varchar' })
  phone?: string;

  @Column({ nullable: true, type: 'varchar' })
  address?: string;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @Column('timestamp')
  registered!: string;

  @Column('bool')
  active!: boolean;
}
