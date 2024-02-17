// Style
import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { siteConfig } from '@/config/site';
import ThemeProvider from '@/components/theme-provider';
import { cn } from '@/lib/utils';

import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

const fontSans = Inter( {
  subsets: [ 'latin' ],
  variable: '--font-sans',
} );

// Font files can be colocated inside of `pages`
const fontHeading = localFont( {
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
} );

export const metadata = {
  metadataBase: new URL( siteConfig.url ),
  alternates: {
    canonical: '/',
  },
  title: {
    default: siteConfig.name,
    template: `%s | ${ siteConfig.name }`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [ siteConfig.author ],
  creator: 'meceware',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [ `${ siteConfig.url }/og.png` ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [ `${ siteConfig.url }/og.png` ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

export default async function RootLayout( { children } ) {
  return (
    <html lang='en' className={ cn( 'scroll-smooth antialiased' ) } suppressHydrationWarning>
      <head />
      <body className={ cn( 'bg-background font-sans antialiased', fontSans.variable, fontHeading.variable ) }>
        <ThemeProvider>
          <div className = { cn( 'flex min-h-screen flex-col' ) }>
            <Header github={ siteConfig.links.github } />
            <main className = { cn( 'flex h-full grow justify-center' ) }>{ children }</main>
            <Footer author={ siteConfig.author } github={ siteConfig.links.github } />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
