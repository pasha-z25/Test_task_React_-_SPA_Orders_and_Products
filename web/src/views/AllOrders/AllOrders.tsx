'use client';

import { Card, Loader, Error } from '@/components/UIElements';
import { useTranslation } from '@/i18n/client';
import { fallbackLng } from '@/i18n/utils';
import { useAppDispatch, useAppSelector } from '@/store';
import { getLang } from '@/store/slices/langSlice';
import {
  getAllOrders,
  getOrders,
  getOrdersStatus,
} from '@/store/slices/ordersSlice';
import { Order } from '@/utils/types';
import Link from 'next/link';
import { useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export default function AllOrders() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getLang) || fallbackLng;
  const { loading, error } = useAppSelector(getOrdersStatus);
  const orders = useAppSelector(getAllOrders);

  const { t } = useTranslation(lang);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  const renderOrderCard = (order: Order) => {};

  return (
    <section className="orders-section py-12">
      <div className="container mx-auto px-4">
        <div className="wrapper">
          <div className="mb-10 flex items-center gap-4">
            <Link href={`/${lang}/orders/add`}>
              <AiOutlinePlusCircle size={30} color="green" />
            </Link>
            <h1 className="text-xl font-bold">{t('menu.orders')}</h1>
          </div>
          <ul className="grid gap-4">
            {!!orders?.length &&
              orders.map((order: Order) => (
                <li key={order.id}>
                  <Link href={`/${lang}/orders/${order.id}`}>
                    <Card hasHover={true}>
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
