/**
 * File path: src/app/about/story/page.tsx
 * Role/responsibility: Company story and history page
 * Connections: Part of about section
 * Data/copy source: ABOUT_COPY.story from constants.ts
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Button } from '@/components/ui';
import { ABOUT_COPY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Story',
  description: ABOUT_COPY.story.subtitle,
};

export default function StoryPage() {
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
          <h1 className="text-display-1 mb-6">{ABOUT_COPY.story.title}</h1>
          <p className="text-body-lg text-ash-600 dark:text-ash-400 max-w-3xl">
            {ABOUT_COPY.story.subtitle}
          </p>
        </div>
      </Section>

      {/* Content */}
      <Section background="muted">
        <div className="max-w-3xl">
          <div className="prose prose-lg">
            {ABOUT_COPY.story.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-ash-700 dark:text-ash-300 mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Navigation */}
      <Section>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/about/how-we-think">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              How We Think
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/team">
              Meet the Team
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
