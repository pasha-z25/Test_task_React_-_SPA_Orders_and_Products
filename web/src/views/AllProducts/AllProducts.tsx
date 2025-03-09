'use client';

import { Loader, Error } from '@/components/UIElements';
import { useTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  getAllProducts,
  getProducts,
  getProductsStatus,
} from '@/store/slices/productsSlice';
import type { IViewProps, Product } from '@/utils/types';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function AllProducts({ lang }: IViewProps) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(getProductsStatus);
  const products = useAppSelector(getAllProducts);

  const { t } = useTranslation(lang);

  useEffect(() => {
    if (!loading && !products?.length) {
      dispatch(getProducts());
    }
  }, [products?.length, dispatch, loading]);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  const renderProductCard = (product: Product) => {
    return (
      <div>
        <Image
          src={product.photo}
          alt={product.title}
          width="250"
          height="250"
          loading="lazy"
          unoptimized={true}
        />
        <Typography>{product.title}</Typography>
      </div>
    );
  };

  return (
    <section className="products-section py-12">
      <div className="container mx-auto px-4">
        <div className="wrapper">
          <div className="mb-10 flex items-center gap-4">
            <h1 className="text-xl font-bold">{t('common.products')}</h1>
          </div>
          <ul className="grid gap-4">
            {!!products?.length &&
              products.map((product: Product) => (
                <li key={product.id}>
                  <Link href={`/${lang}/products/${product.id}`}>
                    <Card>
                      <CardContent>{renderProductCard(product)}</CardContent>
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
