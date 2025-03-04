import { fallbackLng } from '@/i18n/utils';
import { getFormattedDateAndTime } from '@/utils/helpers';
import type { Lang } from '@/utils/types';
import Language from '../Language';
import { useTranslation } from '@/i18n/server';

export interface IFooterProps {
  lang: Lang;
}

export default async function Footer({ lang = fallbackLng }: IFooterProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lang);

  return (
    <footer className="border-t py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <p>
            {getFormattedDateAndTime(lang, 'YYYY')} © {t('SEO.footerCopy')}
          </p>
          <Language lang={lang} />
        </div>
      </div>
    </footer>
  );
}
