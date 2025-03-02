'use client';

import { languages } from '@/i18n/utils';
import { useAppDispatch } from '@/store';
import { setLang } from '@/store/slices/langSlice';
import type { Lang } from '@/utils/types';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export interface ILanguageProps {
  lang: Lang;
}

export default function Language({ lang }: ILanguageProps) {
  const pathname = usePathname();
  const path = pathname.split(lang);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLang(lang));
  }, []);

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
                className="language-block__list__item__link uppercase"
                href={`/${language}/${path[1] ? path[1] : ''}`}
                onClick={() => dispatch(setLang(language))}
              >
                {language}
              </Link>
              {index < self.length - 1 && (
                <span className="delimiter mx-2 inline-block">/</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
