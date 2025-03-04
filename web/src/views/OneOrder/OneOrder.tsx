'use client';

import { Loader, Error } from '@/components/UIElements';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  getAllOrders,
  getOrder,
  getOrders,
  getOrdersStatus,
  getSelectedOrder,
} from '@/store/slices/ordersSlice';
import type { IViewProps, Order } from '@/utils/types';
import Link from 'next/link';
import { useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export default function OneOrder({ lang, id: orderId }: IViewProps) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(getOrdersStatus);
  const orders = useAppSelector(getAllOrders);
  const selectedOrder = useAppSelector(getSelectedOrder);

  const { t } = useTranslation(lang);

  useEffect(() => {
    if (!orders?.length) {
      dispatch(getOrders());
    }
    if (orderId) {
      dispatch(getOrder(orderId));
    }
  }, []);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  const renderOrderCard = (order: Order) => {
    return (
      <div>
        <h3>{order.title}</h3>
        <p>{order.description}</p>
      </div>
    );
  };

  const renderSelectedOrder = (order: Order) => {
    return (
      <div>
        Selected order
        <h3>{order.title}</h3>
        <p>{order.description}</p>
      </div>
    );
  };

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
                    <Card>
                      <CardContent>{renderOrderCard(order)}</CardContent>
                    </Card>
                  </Link>
                </li>
              ))}
          </ul>
          {!!selectedOrder && <div>{renderSelectedOrder(selectedOrder)}</div>}
        </div>
      </div>
    </section>
  );
}
