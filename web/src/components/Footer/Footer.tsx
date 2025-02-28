import { fallbackLng } from '@/i18n/utils';
import type { Lang } from '@/utils/types';
import Language from '../Language';

export interface IFooterProps {
  lang: Lang;
}

export default async function Footer({ lang = fallbackLng }: IFooterProps) {
  return (
    <footer className="border-t py-4">
      <div className="container mx-auto">
        Footer
        <Language lang={lang} />
      </div>
    </footer>
  );
}
