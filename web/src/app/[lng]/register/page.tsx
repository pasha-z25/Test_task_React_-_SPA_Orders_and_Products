import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';
import { Register as RegisterView } from '@/views';

export default async function Register({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;

  return <RegisterView lang={lng} />;
}
