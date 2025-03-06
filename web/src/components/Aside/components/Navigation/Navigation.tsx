'use client';

import { useTranslation } from '@/i18n/client';
import { fallbackLng } from '@/i18n/utils';
import { useAppSelector } from '@/store';
import { getLang } from '@/store/slices/langSlice';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  title: string;
  path: string;
}

export default function Navigation() {
  const lang = useAppSelector(getLang) || fallbackLng;
  const { t } = useTranslation(lang);
  const pathname = usePathname();

  const homePath = `/${lang}`;

  const navList: NavItem[] = [
    {
      title: t('common.orders'),
      path: `/${lang}`,
    },
    // {
    //   title: t('common.groups'),
    //   path: `/${lang}/groups`,
    // },
    {
      title: t('common.products'),
      path: `/${lang}/products`,
    },
    {
      title: t('common.users'),
      path: `/${lang}/users`,
    },
    // {
    //   title: t('common.settings'),
    //   path: `/${lang}/settings`,
    // },
  ];

  const renderNavItem = (item: NavItem, index: number) => {
    return (
      <li
        key={index}
        className={classNames(
          'border-b-4 border-transparent hover:border-green-700',
          {
            ['active !border-green-700']:
              pathname.includes(item.path) && item.path !== homePath,
          }
        )}
      >
        <Link className="nav-link" href={item.path}>
          {item.title}
        </Link>
      </li>
    );
  };

  return (
    <nav>
      <ul className="flex flex-col items-center gap-4 text-base font-bold uppercase">
        {navList.map(renderNavItem)}
      </ul>
    </nav>
  );
}
