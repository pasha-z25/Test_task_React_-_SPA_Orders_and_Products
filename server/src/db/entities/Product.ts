import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';

@Entity()
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
    start: Date;
    end: Date;
  };

  @Column({ type: 'json' })
  price!: { value: number; symbol: string; isDefault: boolean }[];

  @Column({ type: 'timestamp' })
  date!: Date;

  @ManyToOne(() => Order, (order) => order.products, { nullable: true })
  order?: Order;
}
