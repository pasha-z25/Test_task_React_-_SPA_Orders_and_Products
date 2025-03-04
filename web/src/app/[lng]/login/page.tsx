import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';
import { Login as LoginView } from '@/views';

export default async function Login({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;

  return <LoginView lang={lng} />;
}
