'use client';

import { languages } from '@/i18n/utils';
import type { Lang } from '@/utils/types';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface ILanguageProps {
  lang: Lang;
}

export default function Language({ lang }: ILanguageProps) {
  const pathname = usePathname();
  const path = pathname.split(lang);

  return (
    <div className="language-block">
      <ul className="language-block__list flex items-center">
        {languages.map((language, index, self) => {
          return (
            <li
              key={`${language}-${index}`}
              className={classNames('language-block__list__item', language, {
                active: lang === language,
              })}
            >
              <Link
                className="language-block__list__item__link"
                href={`/${language}/${path[1] ? path[1] : ''}`}
              >
                {language}
              </Link>
              {index < self.length - 1 && <span className="delimiter">/</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
