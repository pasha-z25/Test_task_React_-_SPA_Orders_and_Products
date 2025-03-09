import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/UIElements';

const DynamicRegisterPage = dynamic(() => import('../../../views/Register'), {
  loading: () => <Loader />,
});

export default async function Register({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;

  return <DynamicRegisterPage lang={lng} />;
}
