'use client';

import { Loader, Error } from '@/components/UIElements';
import { useTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  getProduct,
  getProductsStatus,
  getSelectedProduct,
} from '@/store/slices/productsSlice';
import type { IViewProps } from '@/utils/types';
import { useEffect } from 'react';

import Typography from '@mui/material/Typography';

export default function OneProduct({ lang, id: productId }: IViewProps) {
  const dispatch = useAppDispatch();
  const product = useAppSelector(getSelectedProduct);
  const { loading, error } = useAppSelector(getProductsStatus);

  const { t } = useTranslation(lang);

  useEffect(() => {
    if (productId) {
      dispatch(getProduct(productId));
    }
  }, [dispatch, productId]);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  if (!product) return null;

  return (
    <section className="products-section py-12">
      <div className="container mx-auto px-4">
        <div className="wrapper">
          <div className="mb-10 flex items-center gap-4">
            <h1 className="text-xl font-bold">{t('common.products')}</h1>
          </div>
          <Typography>{product.title}</Typography>
        </div>
      </div>
    </section>
  );
}
