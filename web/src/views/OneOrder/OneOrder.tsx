'use client';

import { Loader, Error } from '@/components/UIElements';
import { useTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  getAllOrders,
  getOrder,
  getOrders,
  getOrdersStatus,
  getSelectedOrder,
} from '@/store/slices/ordersSlice';
import type { IViewProps, Order, Product } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { getFormattedDateAndTime } from '@/utils/helpers';
import {
  NUMBER_OF_MONTHS_IN_YEAR,
  ORDER_CARD_DATE_FORMAT,
} from '@/utils/constants';
import { useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaListUl } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

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

  if (!selectedOrder) return null;

  const renderOrderCard = (order: Order) => {
    return (
      <>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 items-center">
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
                {getFormattedDateAndTime(
                  lang,
                  ORDER_CARD_DATE_FORMAT,
                  order.date
                )}
              </Typography>
            </div>
          </div>
        </CardContent>
        {order.id === selectedOrder.id && (
          <div className="bg-slate-200 hover:bg-slate-300 min-w-16 flex items-center justify-center">
            <IoIosArrowForward size={30} />
          </div>
        )}
      </>
    );
  };

  const renderProductCard = (product: Product) => {
    return (
      <div className="grid flex-auto gap-8 items-center grid-cols-[auto_auto_1fr_auto_auto]">
        <span className="list-dot" />
        <Image
          src={product.photo}
          alt={product.title}
          width="70"
          height="70"
          unoptimized={true}
        />
        <p className="underline">
          <Link href={`/${lang}/products/${product.id}`}>{product.title}</Link>
        </p>
        <p>{product.isNew ? 'New' : 'Used'}</p>
        <div>
          <Button
            onClick={() => {
              console.log('Product Delete Action');
            }}
          >
            <RiDeleteBinLine />
          </Button>
        </div>
      </div>
    );
  };

  const renderSelectedOrder = (order: Order) => {
    return (
      <div className="grid gap-8">
        <Typography variant="h4" component="h2">
          {order.title}
        </Typography>
        <List className="grid gap-4">
          {!!order.products &&
            order.products.map((product: Product, i: number) => (
              <>
                {i !== 0 && (
                  <Divider key={`${product.id}-Divider${i}`} component="li" />
                )}
                <ListItem key={product.id} className="!p-0">
                  {renderProductCard(product)}
                </ListItem>
              </>
            ))}
        </List>
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
          <Typography variant="h3" component="h2">
            <Link href={`/${lang}`}>{t('common.orders')}</Link> /{' '}
            {selectedOrder.id}
          </Typography>
        </div>
        <div className="wrapper flex gap-6">
          <List className="grid gap-4 !py-0">
            {!!orders?.length &&
              orders.map((order: Order) => (
                <ListItem key={order.id} className="!p-0">
                  <Link
                    href={`/${lang}/orders/${order.id}`}
                    className="min-w-[412px]"
                  >
                    <Card className="flex">{renderOrderCard(order)}</Card>
                  </Link>
                </ListItem>
              ))}
          </List>
          {!!selectedOrder && (
            <div className="relative flex-auto">
              <Link
                href={`/${lang}`}
                className="absolute -top-3 -right-3 inline-flex w-8 h-8 rounded-full items-center justify-center bg-white border shadow-md"
              >
                <IoCloseOutline size={20} />
              </Link>
              <Card>
                <CardContent>{renderSelectedOrder(selectedOrder)}</CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
