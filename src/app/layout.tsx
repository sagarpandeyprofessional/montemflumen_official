/**
 * File path: src/app/layout.tsx
 * Role/responsibility: Root layout with fonts, metadata, header, and footer
 * Connections: Wraps all pages, imports Header and Footer
 * Edge cases: Dark mode flash prevention (PIT-95)
 * Performance: next/font optimization
 * Reference documents: PIT-3 (Metadata in Client), PIT-95 (Dark Mode FOUC)
 */

import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
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
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header />
        <main className="flex-1 pt-16 lg:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
