'use client';

import { useTranslation } from '@/i18n/client';
import type { IViewProps } from '@/utils/types';
import { Login as LoginForm } from '@/components/Forms';
import { IoIosLogIn } from 'react-icons/io';
import Link from 'next/link';
import { useAppSelector } from '@/store';
import { getAuthState } from '@/store/slices/authSlice';
import { Card, Loader } from '@/components/UIElements';

export default function Login({ lang }: IViewProps) {
  const { t } = useTranslation(lang);
  const { loading } = useAppSelector(getAuthState);

  return (
    <section className="login-section py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center gap-4">
          <IoIosLogIn size={30} color="green" />
          <h1>{t('common.login')}</h1>
        </div>
        <Card>
          <h2>{t('sections.loginPageHeader')}</h2>
          <LoginForm />
          <h4>
            {t('sections.loginPageFooter')}{' '}
            <Link href={`/${lang}/register`} className="underline">
              {t('button.register')}
            </Link>
          </h4>
        </Card>
      </div>
      {!!loading && <Loader />}
    </section>
  );
}
