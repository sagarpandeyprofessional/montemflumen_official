/**
 * File path: src/app/about/how-we-think/page.tsx
 * Role/responsibility: Engineering philosophy and approach page
 * Connections: Part of about section
 * Data/copy source: ABOUT_COPY.howWeThink from constants.ts
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Button } from '@/components/ui';
import { ABOUT_COPY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How We Think',
  description: ABOUT_COPY.howWeThink.subtitle,
};

export default function HowWeThinkPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <div className="py-8 md:py-12 lg:py-16">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-ash-600 dark:text-ash-400 hover:text-forest-700 dark:hover:text-forest-400 mb-6 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to About
          </Link>
          <h1 className="text-display-1 mb-6">{ABOUT_COPY.howWeThink.title}</h1>
          <p className="text-body-lg text-ash-600 dark:text-ash-400 max-w-3xl">
            {ABOUT_COPY.howWeThink.subtitle}
          </p>
        </div>
      </Section>

      {/* Content */}
      <Section background="muted">
        <div className="max-w-3xl">
          <div className="prose prose-lg">
            {ABOUT_COPY.howWeThink.content.split('\n\n').map((paragraph, index) => {
              // Handle bullet points
              if (paragraph.startsWith('-')) {
                const items = paragraph.split('\n').filter(Boolean);
                return (
                  <ul key={index} className="space-y-3 my-6">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-ash-700 dark:text-ash-300">
                        {item.replace(/^- \*\*/, '').replace(/\*\*:/, ':').replace(/\*\*/g, '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-ash-700 dark:text-ash-300 mb-6">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Navigation */}
      <Section>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/about">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to About
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/about/story">
              Read Our Story
              <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
