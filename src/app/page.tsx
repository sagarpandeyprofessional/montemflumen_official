/**
 * File path: src/app/page.tsx
 * Role/responsibility: Home page with hero, features, case studies, team preview, and CTA
 * Connections:
 *  - Loads content from markdown files via src/lib/content.ts (getFeaturedCaseStudies, getFeaturedTeamMembers, getRecentBlogPosts)
 *  - Copy/config from src/lib/constants.ts (HOME_COPY)
 *  - Uses UI primitives from src/components/ui
 *
 * Hero background:
 *  - Uses public/images/banners/mainbanner.svg (served at /images/banners/mainbanner.svg)
 *
 * Images:
 *  - Featured Work cards use case study frontmatter `coverImage` (fallback: `image`)
 *  - Team cards use team member frontmatter `image` (square, rounded corners)
 */

import Link from 'next/link';
import Image from 'next/image';
import { Button, Section, SectionHeader, Card, CardContent, Tag } from '@/components/ui';
import { HOME_COPY } from '@/lib/constants';
import { getFeaturedCaseStudies, getFeaturedTeamMembers, getRecentBlogPosts } from '@/lib/content';
import { formatDate } from '@/lib/utils';

export default async function HomePage() {
  const [caseStudies, teamMembers, blogPosts] = await Promise.all([
    getFeaturedCaseStudies(3),
    getFeaturedTeamMembers(4),
    getRecentBlogPosts(3),
  ]);

  return (
    <>
      {/* Hero Section */}
      <Section className="relative overflow-hidden">
        {/* HERO BACKGROUND IMAGE */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/images/banners/mainbanner.svg"
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-right opacity-70 dark:opacity-55"
          />
          {/* Readability overlay (reduce /70 -> /45 to make the image stronger) */}
          <div className="absolute inset-0 bg-picket-100/70 dark:bg-forest-950/70" />
          {/* Optional gradient shaping (keeps text readable, leaves right side more visible) */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/30 via-forest-950/10 to-transparent dark:from-forest-950/45 dark:via-forest-950/15" />
        </div>

        <div className="py-12 md:py-20 lg:py-28">
          <div className="max-w-4xl">
            <h1 className="text-display-1 mb-6 animate-fade-in-up">
              {HOME_COPY.hero.headline}
            </h1>
            <p className="text-body-lg text-ash-600 dark:text-ash-400 mb-8 max-w-2xl animate-fade-in-up animation-delay-100">
              {HOME_COPY.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-200">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">{HOME_COPY.hero.cta.primary}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/work">{HOME_COPY.hero.cta.secondary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Bento Grid - What We Do */}
      <Section background="muted">
        <SectionHeader title={HOME_COPY.bento.title} subtitle={HOME_COPY.bento.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME_COPY.bento.items.map((item, index) => (
            <Card
              key={item.title}
              hoverable
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="mb-4 h-12 w-12 rounded-xl bg-forest-100 dark:bg-forest-800 flex items-center justify-center">
                  <span className="text-2xl">
                    {item.icon === 'build' && '🏗️'}
                    {item.icon === 'operate' && '⚙️'}
                    {item.icon === 'scale' && '📈'}
                    {item.icon === 'learn' && '📚'}
                  </span>
                </div>
                <h3 className="text-heading-2 mb-2">{item.title}</h3>
                <p className="text-body-sm text-ash-600 dark:text-ash-400">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Featured Case Studies */}
      {caseStudies.length > 0 && (
        <Section>
          <SectionHeader
            title={HOME_COPY.caseStudies.title}
            subtitle={HOME_COPY.caseStudies.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {caseStudies.map((study, index) => {
              const coverSrc = study.coverImage || study.image;

              return (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card hoverable className="h-full">
                    <div className="relative aspect-card rounded-t-xl overflow-hidden bg-gradient-to-br from-forest-100 to-ash-100 dark:from-forest-800 dark:to-forest-900">
                      {coverSrc ? (
                        <Image
                          src={coverSrc}
                          alt={study.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          priority={index === 0}
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/20 via-forest-950/0 to-forest-950/0 dark:from-forest-950/35" />
                    </div>

                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(study.tags || []).slice(0, 2).map((tag) => (
                          <Tag key={tag} size="sm">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                      <h3 className="text-heading-2 mb-2 group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-body-sm text-ash-600 dark:text-ash-400 mb-3">
                        {study.description}
                      </p>
                      <p className="text-body-sm text-forest-700 dark:text-forest-400 font-medium">
                        {study.outcome}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          <div className="text-center">
            <Button variant="secondary" asChild>
              <Link href="/work">{HOME_COPY.caseStudies.cta}</Link>
            </Button>
          </div>
        </Section>
      )}

      {/* Team Preview */}
      {teamMembers.length > 0 && (
        <Section background="muted">
          <SectionHeader
            title={HOME_COPY.team.title}
            subtitle={HOME_COPY.team.subtitle}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {teamMembers.map((member, index) => (
              <Link
                key={member.slug}
                href={`/team/${member.slug}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card hoverable className="text-center">
                  <CardContent>
                    <div className="relative w-24 aspect-square mx-auto mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-forest-200 to-ash-200 dark:from-forest-700 dark:to-forest-800">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : null}
                    </div>

                    <h3 className="text-heading-2 mb-1 group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-body-sm text-ash-600 dark:text-ash-400 mb-3">
                      {member.role}
                    </p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {(member.tags || []).slice(0, 2).map((tag) => (
                        <Tag key={tag} size="sm">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Button variant="secondary" asChild>
              <Link href="/team">{HOME_COPY.team.cta}</Link>
            </Button>
          </div>
        </Section>
      )}

      {/* Latest Insights */}
      {blogPosts.length > 0 && (
        <Section>
          <SectionHeader
            title={HOME_COPY.insights.title}
            subtitle={HOME_COPY.insights.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card hoverable className="h-full">
                  <CardContent>
                    <div className="flex items-center gap-3 text-body-sm text-ash-500 mb-3">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-heading-2 mb-2 group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-body-sm text-ash-600 dark:text-ash-400">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Button variant="secondary" asChild>
              <Link href="/insights">{HOME_COPY.insights.cta}</Link>
            </Button>
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section background="dark">
        <div className="text-center py-8">
          <h2 className="text-display-2 mb-4 text-picket-50">
            {HOME_COPY.cta.title}
          </h2>
          <p className="text-body-lg text-ash-400 mb-8 max-w-2xl mx-auto">
            {HOME_COPY.cta.subtitle}
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">{HOME_COPY.cta.button}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
