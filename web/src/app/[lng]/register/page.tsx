import { Register as RegisterForm } from '@/components/Forms';
import { useTranslation } from '@/i18n/server';
import { fallbackLng } from '@/i18n/utils';
import type { IPageProps } from '@/utils/types';

export default async function Register({ params }: IPageProps) {
  const { lng = fallbackLng } = await params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);

  return (
    <div>
      <p>Register Page</p>
      <p>{t('button.readMore')}</p>
      <RegisterForm />
    </div>
  );
}
