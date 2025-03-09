import StoreProvider from '@/store/StoreProvider';
import type { Lang } from '@/utils/types';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Main from '@/components/Main';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Inventory - My Test App',
  description: 'Test app',
};

export interface ILayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lng: Lang;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<ILayoutProps>) {
  const { lng } = await params;
  return (
    <html lang={lng}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <div className="body-wrapper">
            <Header />
            <Main>{children}</Main>
            <Footer lang={lng} />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
