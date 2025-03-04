'use client';

import { useTranslation } from '@/i18n/client';
import type { IViewProps } from '@/utils/types';
import { Register as RegisterForm } from '@/components/Forms';
import { IoMdPersonAdd } from 'react-icons/io';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useAppSelector } from '@/store';
import { Loader } from '@/components/UIElements';
import Alert from '@mui/material/Alert';
import { getAuthorizedUser, getAuthState } from '@/store/slices/authSlice';
import { fallbackLng } from '@/i18n/utils';

export default function Register({ lang = fallbackLng }: IViewProps) {
  const { t } = useTranslation(lang);
  const { loading, error } = useAppSelector(getAuthState);
  const authorizedUser = useAppSelector(getAuthorizedUser);

  return (
    <section className="login-section py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center gap-4">
          <IoMdPersonAdd size={30} color="green" />
          <Typography variant="h4" component="h1">
            {t('common.register')}
          </Typography>
        </div>
        <Card sx={{ py: 4 }}>
          <CardContent>
            {!!error && (
              <Alert
                severity="error"
                className="min-w-[616px] max-w-max mb-8 mx-auto"
              >
                {error}
              </Alert>
            )}
            {authorizedUser ? (
              <>
                <Alert
                  severity="success"
                  className="min-w-[616px] max-w-max mb-8 mx-auto"
                >
                  {t('sections.registerSuccessMessage')}
                </Alert>
                <Typography sx={{ mt: 4, textAlign: 'center' }}>
                  {t('sections.registerMoveToLogin')}{' '}
                  <Link href={`/${lang}/login`} className="underline">
                    {t('button.login')}
                  </Link>
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 4, textAlign: 'center' }}
                >
                  {t('sections.registerPageHeader')}
                </Typography>
                <RegisterForm />
                <Typography sx={{ mt: 4, textAlign: 'center' }}>
                  {t('sections.registerPageFooter')}{' '}
                  <Link href={`/${lang}/login`} className="underline">
                    {t('button.login')}
                  </Link>
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      {!!loading && <Loader />}
    </section>
  );
}
