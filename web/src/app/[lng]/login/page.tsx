import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/UIElements';

const DynamicLoginPage = dynamic(() => import('../../../views/Login'), {
  loading: () => <Loader />,
});

export default async function Login({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;

  return <DynamicLoginPage lang={lng} />;
}
