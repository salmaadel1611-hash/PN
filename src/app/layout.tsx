import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-merriweather' });

export const metadata: Metadata = {
  metadataBase: new URL('https://powernews.cc'),
  title: {
    default: 'PowerNews | Energy, Infrastructure & Business in Egypt and MENA',
    template: '%s | PowerNews'
  },
  description: 'A premium publication for energy, petroleum, infrastructure, and Egyptian business intelligence.',
  openGraph: {
    type: 'website',
    siteName: 'PowerNews',
    title: 'PowerNews',
    description: 'Energy, infrastructure, and business reporting from Egypt and MENA.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PowerNews',
    description: 'Energy and business reporting from Egypt and MENA.'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${merriweather.variable} font-sans`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
