import { fallbackLng } from '@/i18n/utils';
import type { IPageProps, Order } from '@/utils/types';

import { OneOrder } from '@/views';

export default async function Order({ params }: IPageProps) {
  const { id, lng = fallbackLng } = await params;

  if (!id) return null;

  return <OneOrder id={id} lang={lng} />;
}
