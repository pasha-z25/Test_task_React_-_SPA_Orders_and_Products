'use client';

import { Loader, Error } from '@/components/UIElements';
import { useTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  deleteOrder,
  getAllOrders,
  getOrders,
  getOrdersStatus,
} from '@/store/slices/ordersSlice';
import {
  calculateTotalByCurrency,
  getFormattedDateAndTime,
} from '@/utils/helpers';
import { WebSocketEvents, type IViewProps, type Order } from '@/utils/types';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  NUMBER_OF_MONTHS_IN_YEAR,
  ORDER_CARD_DATE_FORMAT,
} from '@/utils/constants';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaListUl } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useSocket } from '@/utils/hooks/useSocket';

export default function AllOrders({ lang }: IViewProps) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(getOrdersStatus);
  const orders = useAppSelector(getAllOrders);

  const { t } = useTranslation(lang);
  const { socket } = useSocket();

  useEffect(() => {
    if (!loading && !orders?.length) {
      dispatch(getOrders());
    }
  }, [orders?.length, dispatch, loading]);

  useEffect(() => {
    socket?.on(WebSocketEvents.WEB_TRIGGER_READ_ALL_ORDERS, () => {
      dispatch(getOrders());
    });

    return () => {
      socket?.off(WebSocketEvents.WEB_TRIGGER_READ_ALL_ORDERS);
    };
  }, [socket]);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  const renderOrderCard = (order: Order) => {
    const total = calculateTotalByCurrency(order.products);
    const values = Object.entries(total);

    return (
      <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center">
        <Link href={`/${lang}/orders/${order.id}`} className="flex-auto">
          <Typography variant="h4" component="h2" className="crop-text">
            {order.title}
          </Typography>
        </Link>
        <div className="flex items-center gap-4 min-w-[150px]">
          <div className="inline-flex items-center justify-center rounded-full p-2 w-10 h-10 border">
            <FaListUl size={30} />
          </div>
          <Typography>
            <Typography component="span" className="block !text-2xl">
              {order.products.length}
            </Typography>
            <Typography component="span" className="block">
              {order.products.length === 1
                ? t('common.product')
                : t('common.productsCount')}
            </Typography>
          </Typography>
        </div>
        <div className="min-w-[150px]">
          <Typography className="!text-xs mb-1">{`${new Date(order.date).getMonth() + 1}/${NUMBER_OF_MONTHS_IN_YEAR}`}</Typography>
          <Typography>
            {getFormattedDateAndTime(lang, ORDER_CARD_DATE_FORMAT, order.date)}
          </Typography>
        </div>
        <div className="min-w-[150px]">
          {values.map(([currency, number]) => (
            <Typography
              key={currency}
              className={currency === 'UAH' ? '!text-lg' : '!text-xs'}
            >
              {new Intl.NumberFormat(lang, {
                style: 'currency',
                currency,
              }).format(number)}
            </Typography>
          ))}
        </div>
        <div>
          <Button
            onClick={() => {
              console.log('Order Delete Action');
              dispatch(deleteOrder(order.id));
            }}
          >
            <RiDeleteBinLine />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <section className="orders-section py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center gap-4">
          <Link href={`/${lang}/orders/add`}>
            <AiOutlinePlusCircle size={30} color="green" />
          </Link>
          <Typography variant="h3" component="h1">
            {t('common.orders')}
          </Typography>
        </div>
        <div className="wrapper">
          <List className="grid gap-4 !py-0">
            {!!orders?.length &&
              orders.map((order: Order) => (
                <ListItem key={order.id} className="!p-0">
                  <Card className="flex-auto">
                    <CardContent>{renderOrderCard(order)}</CardContent>
                  </Card>
                </ListItem>
              ))}
          </List>
        </div>
      </div>
    </section>
  );
}
