import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';
import { AllProducts } from '@/views';

export default async function Products({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;

  return <AllProducts lang={lng} />;
}
