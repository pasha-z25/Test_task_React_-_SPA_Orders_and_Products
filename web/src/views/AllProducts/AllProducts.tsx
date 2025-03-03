'use client';

import { Loader, Error, Card } from '@/components/UIElements';
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

export default function AllProducts({ lang }: IViewProps) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(getProductsStatus);
  const products = useAppSelector(getAllProducts);

  const { t } = useTranslation(lang);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

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
          unoptimized={true}
        />
        <p>{product.title}</p>
      </div>
    );
  };

  return (
    <section className="products-section py-12">
      <div className="container mx-auto px-4">
        <div className="wrapper">
          <div className="mb-10 flex items-center gap-4">
            <h1 className="text-xl font-bold">{t('menu.products')}</h1>
          </div>
          <ul className="grid gap-4">
            {!!products?.length &&
              products.map((product: Product) => (
                <li key={product.id}>
                  <Link href={`/${lang}/products/${product.id}`}>
                    <Card hasHover={true}>{renderProductCard(product)}</Card>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
