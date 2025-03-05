'use client';

import { Loader, Error } from '@/components/UIElements';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  getAllOrders,
  getOrders,
  getOrdersStatus,
} from '@/store/slices/ordersSlice';
import { calculateTotalByCurrency } from '@/utils/helpers';
import type { IViewProps, Order } from '@/utils/types';
import Link from 'next/link';
import { useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaListUl } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function AllOrders({ lang }: IViewProps) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(getOrdersStatus);
  const orders = useAppSelector(getAllOrders);

  const { t } = useTranslation(lang);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  const renderOrderCard = (order: Order) => {
    const total = calculateTotalByCurrency(order.products);
    const values = Object.entries(total);

    return (
      <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-10">
        <h2 className="text-xl font-bold crop-text">{order.title}</h2>
        <div className="flex items-center gap-4">
          <FaListUl size={30} />
          <p>
            <span className="block text-2xl">{order.products.length}</span>
            <span className="block">Products</span>
          </p>
        </div>
        <p>{order.date}</p>
        <div>
          {values.map(([currency, number]) => (
            <p key={currency}>
              {new Intl.NumberFormat(lang, {
                style: 'currency',
                currency,
              }).format(number)}
            </p>
          ))}
        </div>
        <div>
          <button>
            <RiDeleteBinLine />
          </button>
        </div>
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
        </div>
      </div>
    </section>
  );
}
