/**
 * File path: src/app/about/page.tsx
 * Role/responsibility: Main About page with company overview and navigation to sub-pages
 * Connections: Links to how-we-think, story, and team pages
 * Data/copy source: ABOUT_COPY from constants.ts
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, SectionHeader, Card, CardContent, Button } from '@/components/ui';
import { ABOUT_COPY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: ABOUT_COPY.hero.subtitle,
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <div className="py-8 md:py-12 lg:py-16">
          <h1 className="text-display-1 mb-6">{ABOUT_COPY.hero.title}</h1>
          <p className="text-body-lg text-ash-600 dark:text-ash-400 max-w-3xl">
            {ABOUT_COPY.hero.subtitle}
          </p>
        </div>
      </Section>

      {/* Mission */}
      <Section background="muted">
        <div className="max-w-3xl">
          <h2 className="text-display-2 mb-6">{ABOUT_COPY.mission.title}</h2>
          <p className="text-body-lg text-ash-600 dark:text-ash-400">
            {ABOUT_COPY.mission.content}
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeader title={ABOUT_COPY.values.title} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ABOUT_COPY.values.items.map((value, index) => (
            <Card key={value.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <h3 className="text-heading-2 mb-3">{value.title}</h3>
                <p className="text-body text-ash-600 dark:text-ash-400">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Navigation Cards */}
      <Section background="muted">
        <SectionHeader title="Learn More" subtitle="Dive deeper into who we are and how we work" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ABOUT_COPY.navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card hoverable className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-heading-2 mb-2 group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-body-sm text-ash-600 dark:text-ash-400 mb-4">
                    {item.description}
                  </p>
                  <span className="text-sm font-medium text-forest-700 dark:text-forest-400 flex items-center gap-2">
                    Learn more
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center py-8">
          <h2 className="text-display-2 mb-4">Want to Work Together?</h2>
          <p className="text-body-lg text-ash-600 dark:text-ash-400 mb-8 max-w-2xl mx-auto">
            We're always looking for new challenges and opportunities to help organizations build better platforms.
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
