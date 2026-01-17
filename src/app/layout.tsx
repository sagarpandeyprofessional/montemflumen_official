/**
 * File path: src/app/layout.tsx
 * Role/responsibility: Root layout with fonts, metadata, header, footer, and global SEO
 * Connections: Wraps all pages, imports Header and Footer, adds Organization schema
 * Edge cases: Dark mode flash prevention (PIT-95)
 * Performance: next/font optimization
 * SEO: Organization JSON-LD, favicon, canonical base
 * Reference documents: PIT-3 (Metadata in Client), PIT-95 (Dark Mode FOUC)
 */

import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import { OrganizationSchema, WebSiteSchema } from '@/components/seo';
import { SITE_CONFIG, SEO_DEFAULTS } from '@/lib/constants';
import './globals.css';

// =============================================================================
// FONTS
// =============================================================================

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s${SEO_DEFAULTS.titleSuffix}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SEO_DEFAULTS.defaultKeywords],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/banners/mainbanner.svg`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/images/banners/mainbanner.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

// =============================================================================
// LAYOUT
// =============================================================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <head>
        {/* Prevent dark mode flash (PIT-95: Dark Mode Flicker) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        {/* Organization Schema - Global */}
        <OrganizationSchema />
        {/* WebSite Schema - Global */}
        <WebSiteSchema />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header />
        <main className="flex-1 pt-16 lg:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
