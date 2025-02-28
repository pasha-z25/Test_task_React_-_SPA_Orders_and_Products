import { client } from '@/utils/helpers';
import type { Order } from '@/utils/types';
import Link from 'next/link';

export default async function Orders() {
  const orders: Order[] = await client('/orders');

  return (
    <section>
      <ul>
        {!!orders.length &&
          orders.map((order: Order) => (
            <li key={order.id}>
              <Link href={`/orders/${order.id}`}>{order.title}</Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
