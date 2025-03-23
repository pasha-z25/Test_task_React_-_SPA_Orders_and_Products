'use client';

import { Loader, Error } from '@/components/UIElements';
import { useTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  getAllProducts,
  getProduct,
  getProducts,
  getProductsStatus,
  getSelectedProduct,
} from '@/store/slices/productsSlice';
import type { IViewProps, Product } from '@/utils/types';
import { useEffect } from 'react';
import {
  calculateTotalByCurrency,
  getFormattedDateAndTime,
} from '@/utils/helpers';
import { PRODUCT_CARD_DATE_FORMAT } from '@/utils/constants';
import Link from 'next/link';
import Image from 'next/image';

import { IoCloseOutline } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function OneProduct({ lang, id: productId }: IViewProps) {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getAllProducts);
  const selectedProduct = useAppSelector(getSelectedProduct);
  const { loading, error } = useAppSelector(getProductsStatus);

  const { t } = useTranslation(lang);

  useEffect(() => {
    if (!loading && !products?.length) {
      dispatch(getProducts());
    }

    if (productId) {
      dispatch(getProduct(productId));
    }
  }, [products?.length, dispatch, productId]);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  if (!selectedProduct) return null;

  const renderProductCard = (product: Product) => {
    return (
      <>
        <CardContent className="flex-auto">
          <div className="product-card flex items-center gap-4">
            <span className="list-dot" />
            <Image
              src={product.photo}
              alt={product.title}
              width="70"
              height="70"
              loading="lazy"
              unoptimized={true}
            />
            <Typography variant="h6" component="h2" className="crop-text">
              <Link
                className="underline"
                href={`/${lang}/products/${product.id}`}
              >
                {product.title}
              </Link>
            </Typography>
            <Typography>{product.isNew ? 'New' : 'Used'}</Typography>
          </div>
        </CardContent>
        {product.id === selectedProduct.id && (
          <div className="bg-slate-200 hover:bg-slate-300 min-w-16 flex items-center justify-center">
            <IoIosArrowForward size={30} />
          </div>
        )}
      </>
    );
  };

  const renderSelectedProduct = (product: Product) => {
    const total = calculateTotalByCurrency([product]);
    const values = Object.entries(total);

    return (
      <div className="selected-product">
        <Image
          src={product.photo}
          alt={product.title}
          width="1500"
          height="1500"
          loading="lazy"
          unoptimized={true}
          className="rounded-sm mb-4"
        />
        <div className="flex items-center justify-between">
          <Typography variant="h6" component="h1">
            {product.title} <span>({product.serialNumber})</span>
          </Typography>
          <Typography>
            {getFormattedDateAndTime(
              lang,
              PRODUCT_CARD_DATE_FORMAT,
              product.date
            )}
          </Typography>
        </div>
        <Typography>{product.isNew ? 'New' : 'Used'}</Typography>

        <Typography>Type: {product.type}</Typography>
        <Typography>Specification: {product.specification}</Typography>
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
        <Typography>
          Guarantee: start{' '}
          {getFormattedDateAndTime(
            lang,
            PRODUCT_CARD_DATE_FORMAT,
            product.guarantee.start
          )}
          , end{' '}
          {getFormattedDateAndTime(
            lang,
            PRODUCT_CARD_DATE_FORMAT,
            product.guarantee.end
          )}
        </Typography>
        <Typography>
          Order: {product.order.title} #{product.order.id}
        </Typography>
      </div>
    );
  };

  return (
    <section className="products-section py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center gap-4">
          <Typography variant="h3" component="h2">
            <Link href={`/${lang}/products`}>{t('common.products')}</Link> /{' '}
            {selectedProduct.id}
          </Typography>
        </div>
        <div className="wrapper flex items-start gap-6">
          <List className="grid gap-4 !py-0">
            {!!products?.length &&
              products.map((product: Product) => (
                <ListItem key={product.id} className="!p-0">
                  <Link
                    href={`/${lang}/products/${product.id}`}
                    className="min-w-[412px]"
                  >
                    <Card className="flex">{renderProductCard(product)}</Card>
                  </Link>
                </ListItem>
              ))}
          </List>
          {!!selectedProduct && (
            <div className="relative flex-auto">
              <Link
                href={`/${lang}/products`}
                className="absolute -top-3 -right-3 inline-flex w-8 h-8 rounded-full items-center justify-center bg-white border shadow-md"
              >
                <IoCloseOutline size={20} />
              </Link>
              <Card>
                <CardContent>
                  {renderSelectedProduct(selectedProduct)}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
