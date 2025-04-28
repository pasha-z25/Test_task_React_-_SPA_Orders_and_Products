import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('int')
  serialNumber!: number;

  @Column('bool')
  isNew!: boolean;

  @Column('varchar')
  photo!: string;

  @Column('varchar')
  title!: string;

  @Column('varchar')
  type!: string;

  @Column('varchar')
  specification!: string;

  @Column({ type: 'json' })
  guarantee!: {
    start: string;
    end: string;
  };

  @Column({ type: 'json' })
  price!: { value: number; symbol: string; isDefault: boolean }[];

  @Column({ type: 'timestamp' })
  date!: string;

  @ManyToOne(() => Order, (order) => order.products)
  order!: Order;
}
