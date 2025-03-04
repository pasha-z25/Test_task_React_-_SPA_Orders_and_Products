import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';
import { OneUser } from '@/views';

export default async function User({ params }: IPageProps) {
  const { id, lng = fallbackLng } = await params;

  if (!id) return null;

  return <OneUser id={id} lang={lng} />;
}
