/**
 * File path: src/app/work/[slug]/page.tsx
 * Role/responsibility: Individual case study detail page with SEO
 * SEO: Article JSON-LD schema, og:image, canonical URL, breadcrumbs
 * Connected files: content.ts (data), Section components (UI)
 * UI patterns: PORT-02 Case Study Narrative, BLOG-02 Multimedia Story
 * Edge cases: notFound handling, generateStaticParams for SSG
 * Reference: PIT-12 (static params), PIT-16 (notFound)
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/ui/Section';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo';
import { getAllCaseStudies, getAllCaseStudySlugs } from '@/lib/content';
import { SITE_CONFIG } from '@/lib/constants';

// Generate static params for all case studies (PIT-12)
export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each case study
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const caseStudies = await getAllCaseStudies();
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);

  if (!caseStudy) {
    return {
      title: `Case Study Not Found | ${SITE_CONFIG.name}`,
    };
  }

  const pageUrl = `${SITE_CONFIG.url}/work/${params.slug}/`;
  const ogImage = caseStudy.coverImage
    ? `${SITE_CONFIG.url}${caseStudy.coverImage}`
    : `${SITE_CONFIG.url}/images/banners/mainbanner.svg`;

  return {
    title: caseStudy.title,
    description: caseStudy.excerpt || caseStudy.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'article',
      title: caseStudy.title,
      description: caseStudy.excerpt || caseStudy.description,
      url: pageUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.excerpt || caseStudy.description,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseStudies = await getAllCaseStudies();
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);

  // Handle not found (PIT-16)
  if (!caseStudy) {
    notFound();
  }

  // Get other case studies for navigation
  const otherCaseStudies = caseStudies
    .filter((cs) => cs.slug !== caseStudy.slug)
    .slice(0, 2);

  const pageUrl = `${SITE_CONFIG.url}/work/${caseStudy.slug}/`;

  // Breadcrumb items
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Work', url: `${SITE_CONFIG.url}/work/` },
    { name: caseStudy.title, url: pageUrl },
  ];

  return (
    <main className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <ArticleSchema
        title={caseStudy.title}
        description={caseStudy.excerpt || caseStudy.description}
        author={SITE_CONFIG.name}
        publishedAt={caseStudy.publishedAt}
        image={caseStudy.coverImage}
        url={pageUrl}
        section={caseStudy.industry || 'Case Study'}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Section */}
      <Section className="pt-32 pb-16" background="muted">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/work" className="hover:text-foreground transition-colors">
              Work
            </Link>
            <span>/</span>
            <span>{caseStudy.client}</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {caseStudy.tags.map((tag) => (
              <Tag key={tag} variant="outline">
                {tag}
              </Tag>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {caseStudy.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8">
            {caseStudy.excerpt || caseStudy.description}
          </p>

          {/* Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-background rounded-xl border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Client</p>
              <p className="font-medium">{caseStudy.client}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Industry</p>
              <p className="font-medium">{caseStudy.industry || 'Technology'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Duration</p>
              <p className="font-medium">{caseStudy.duration || 'Ongoing'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Services</p>
              <p className="font-medium">{caseStudy.services?.join(', ') || 'Full Stack'}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Cover Image */}
      {caseStudy.coverImage && (
        <Section className="py-0">
          <div className="max-w-6xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
              <img
                src={caseStudy.coverImage}
                alt={caseStudy.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Section>
      )}

      {/* Challenge & Outcome */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                The Challenge
              </h2>
              <p className="text-lg text-muted-foreground">
                {caseStudy.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                The Outcome
              </h2>
              <p className="text-lg text-muted-foreground">
                {caseStudy.outcome}
              </p>
            </div>
          </div>

          {/* Results/Metrics */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <div className="p-8 bg-muted rounded-2xl mb-16">
              <h2 className="text-sm font-medium text-primary uppercase tracking-wider mb-8 text-center">
                Key Results
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {caseStudy.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {metric.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <article
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: caseStudy.content }}
          />

          {/* Technologies Used */}
          {caseStudy.technologies && caseStudy.technologies.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech) => (
                  <Tag key={tech} variant="outline">
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Testimonial */}
      {caseStudy.testimonial && caseStudy.testimonial.quote && (
        <Section className="py-16" background="muted">
          <div className="max-w-3xl mx-auto text-center">
            <svg className="w-12 h-12 text-primary/20 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl md:text-2xl font-medium mb-6">
              &ldquo;{caseStudy.testimonial.quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold">{caseStudy.testimonial.author}</p>
              <p className="text-muted-foreground">{caseStudy.testimonial.role}</p>
            </div>
          </div>
        </Section>
      )}

      {/* Other Case Studies */}
      {otherCaseStudies.length > 0 && (
        <Section className="py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">More Case Studies</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {otherCaseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/work/${cs.slug}`}
                  className="group"
                >
                  <article className="bg-muted rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video bg-card relative overflow-hidden">
                      {cs.coverImage ? (
                        <img
                          src={cs.coverImage}
                          alt={cs.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary/20">
                            {cs.client.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">{cs.client}</p>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {cs.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="py-16" background="primary">
        <div className="text-center max-w-3xl mx-auto text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Let&apos;s discuss how we can help you achieve similar results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Start a Conversation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/work">View All Work</Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
