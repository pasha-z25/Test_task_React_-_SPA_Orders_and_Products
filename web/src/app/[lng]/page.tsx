import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';
import { AllOrders } from '@/views';

export default async function Home({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;

  return <AllOrders lang={lng} />;
}
