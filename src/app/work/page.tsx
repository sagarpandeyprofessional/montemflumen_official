// File path: src/app/work/page.tsx
// Role: Case studies listing page with filtering
// Connected files: content.ts (data), Card components (UI), constants.ts (copy)
// UI patterns: WORK-03 Card Grid with Filtering
// Edge cases: Empty state handling, async data fetching
// Reference: PIT-56 (parallel fetching)

import { Metadata } from 'next';
import Link from 'next/link';
import { Section, Card, CardContent, Tag, Button } from '@/components/ui';
import { getAllCaseStudies } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import { SITE_CONFIG, EMPTY_STATES } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Our Work | ${SITE_CONFIG.name}`,
  description: 'Case studies and examples of our platform engineering projects.',
  openGraph: {
    title: `Our Work | ${SITE_CONFIG.name}`,
    description: 'Case studies and examples of our platform engineering projects.',
  },
};

export default async function WorkPage() {
  const caseStudies = await getAllCaseStudies();

  // Get unique tags for filtering
  const allTags = Array.from(new Set(caseStudies.flatMap((cs) => cs.tags)));

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-32 pb-16" background="muted">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Our Work
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-world case studies of platform engineering projects we've delivered.
            Each project demonstrates our approach to building scalable, reliable infrastructure.
          </p>
        </div>
      </Section>

      {/* Filter Section */}
      {allTags.length > 0 && (
        <Section className="py-8 border-b">
          <div className="flex flex-wrap gap-2 justify-center">
            <Tag variant="default" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              All Projects
            </Tag>
            {allTags.map((tag) => (
              <Tag
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {tag}
              </Tag>
            ))}
          </div>
        </Section>
      )}

      {/* Case Studies Grid */}
      <Section className="py-16">
        {caseStudies.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">{EMPTY_STATES.caseStudies.title}</h3>
            <p className="text-muted-foreground mb-6">{EMPTY_STATES.caseStudies.message}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <Link key={caseStudy.slug} href={`/work/${caseStudy.slug}`} className="group">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden bg-muted">
                    {caseStudy.coverImage || caseStudy.image ? (
                      <img
                        src={caseStudy.coverImage || caseStudy.image || ''}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/20">
                          {caseStudy.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {caseStudy.tags.map((tag) => (
                        <Tag key={tag} variant="outline" size="sm">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {caseStudy.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {caseStudy.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(caseStudy.publishedAt)}
                      </span>
                      <span className="text-sm font-medium text-primary group-hover:underline">
                        View case study →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Section>

      {/* CTA Section */}
      <Section className="py-24" background="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-picket-100 mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-ash-300 mb-8">
            Let's discuss how we can help you build scalable, reliable platform infrastructure.
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}
