import { fallbackLng } from '@/i18n/utils';
import type { IPageProps, Product } from '@/utils/types';
import { OneProduct } from '@/views';

export default async function Product({ params }: IPageProps) {
  const { id, lng = fallbackLng } = await params;

  if (!id) return null;

  return <OneProduct id={id} lang={lng} />;
}
