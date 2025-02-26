import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('int')
  serialNumber!: number;

  @Column()
  isNew!: boolean;

  @Column()
  photo!: string;

  @Column()
  title!: string;

  @Column()
  type!: string;

  @Column()
  specification!: string;

  @Column({ type: 'json' })
  guarantee!: {
    start: string;
    end: string;
  };

  @Column({ type: 'json' })
  price!: { value: number; symbol: string; isDefault: boolean }[];

  @Column({ type: 'timestamp' })
  date!: Date;

  @ManyToOne(() => Order, (order) => order.products, { nullable: true })
  order?: Order;
}
