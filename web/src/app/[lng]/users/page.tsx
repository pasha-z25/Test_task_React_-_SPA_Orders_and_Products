import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';
import { AllUsers } from '@/views';

export default async function Users({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;

  return <AllUsers lang={lng} />;
}
