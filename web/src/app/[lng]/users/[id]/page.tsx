import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/UIElements';

const DynamicUserPage = dynamic(() => import('../../../../views/OneUser'), {
  loading: () => <Loader />,
});

export default async function User({ params }: IPageProps) {
  const { id, lng = fallbackLng } = await params;

  if (!id) return null;

  return <DynamicUserPage id={id} lang={lng} />;
}
