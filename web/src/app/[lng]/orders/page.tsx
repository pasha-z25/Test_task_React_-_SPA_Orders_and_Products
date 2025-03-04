import { fallbackLng } from '@/i18n/utils';
import { IPageProps } from '@/utils/types';
import { redirect } from 'next/navigation';

export default async function Orders({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;

  redirect(`/${lng}`);
}
