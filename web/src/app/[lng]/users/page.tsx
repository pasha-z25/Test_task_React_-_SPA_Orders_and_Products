import { Loader } from '@/components/UIElements';
import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';
import dynamic from 'next/dynamic';

const DynamicUsersPage = dynamic(() => import('../../../views/AllUsers'), {
  loading: () => <Loader />,
});

export default async function Users({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;

  return <DynamicUsersPage lang={lng} />;
}
