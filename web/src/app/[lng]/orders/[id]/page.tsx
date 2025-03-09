import { fallbackLng } from '@/i18n/utils';
import type { IPageProps, Order } from '@/utils/types';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/UIElements';

const DynamicOrderPage = dynamic(() => import('../../../../views/OneOrder'), {
  loading: () => <Loader />,
});

export default async function Order({ params }: IPageProps) {
  const { id, lng = fallbackLng } = await params;

  if (!id) return null;

  return <DynamicOrderPage id={id} lang={lng} />;
}
