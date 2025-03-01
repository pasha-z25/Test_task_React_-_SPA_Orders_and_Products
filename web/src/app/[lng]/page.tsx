import { useTranslation } from '@/i18n/server';
import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';
// import Image from 'next/image';
import { client } from '@/utils/helpers';
import type { Order } from '@/utils/types';
import Link from 'next/link';

export default async function Home({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);
  const orders: Order[] = await client('/orders');
  console.log('!!! Home', { t });

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
