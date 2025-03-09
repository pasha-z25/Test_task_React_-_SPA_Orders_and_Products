import { fallbackLng } from '@/i18n/utils';
import type { IPageProps, Product } from '@/utils/types';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/UIElements';

const DynamicProductPage = dynamic(
  () => import('../../../../views/OneProduct'),
  {
    loading: () => <Loader />,
  }
);

export default async function Product({ params }: IPageProps) {
  const { id, lng = fallbackLng } = await params;

  if (!id) return null;

  return <DynamicProductPage id={id} lang={lng} />;
}
