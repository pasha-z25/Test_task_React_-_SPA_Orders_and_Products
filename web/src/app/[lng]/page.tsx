import { Card } from '@/components/UIElements';
import { useTranslation } from '@/i18n/server';
import { fallbackLng } from '@/i18n/utils';
import { client } from '@/utils/helpers';
import type { IPageProps, Order } from '@/utils/types';
import Link from 'next/link';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export default async function Home({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);
  const orders: Order[] = await client.get('/orders');

  return (
    <section className="orders-section py-12">
      <div className="container mx-auto px-4">
        <div className="wrapper">
          <div className="mb-10 flex items-center gap-4">
            <Link href={`/${lng}/orders/add`}>
              <AiOutlinePlusCircle size={30} color="green" />
            </Link>
            <h1 className="text-xl font-bold">{t('menu.orders')}</h1>
          </div>
          <ul className="grid gap-4">
            {!!orders.length &&
              orders.map((order: Order) => (
                <li key={order.id}>
                  <Link href={`/${lng}/orders/${order.id}`}>
                    <Card>
                      <h3>{order.title}</h3>
                      <p>{order.description}</p>
                    </Card>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
