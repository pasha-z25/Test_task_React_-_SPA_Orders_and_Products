import { Loader } from '@/components/UIElements';
import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';
import dynamic from 'next/dynamic';

const DynamicOrdersPage = dynamic(() => import('../../views/AllOrders'), {
  loading: () => <Loader />,
});

export default async function Home({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;

  return <DynamicOrdersPage lang={lng} />;
}
