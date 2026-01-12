// File path: src/app/insights/page.tsx
// Role: Blog/insights listing page with filtering and search
// Connected files: content.ts (data), Card components (UI), constants.ts (copy)
// UI patterns: BLOG-03 Card Grid Magazine, CAT-03 Infinite Discovery
// Edge cases: Empty state handling, async data fetching
// Reference: PIT-56 (parallel fetching), ENT-PERF-4.1 (static generation)

import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { getAllBlogPosts } from '@/lib/content';
import { formatDate, calculateReadTime } from '@/lib/utils';
import { SITE_CONFIG, EMPTY_STATES } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Insights | ${SITE_CONFIG.name}`,
  description: 'Thoughts on engineering, technology, and building great software products.',
  openGraph: {
    title: `Insights | ${SITE_CONFIG.name}`,
    description: 'Thoughts on engineering, technology, and building great software products.',
  },
};

export default async function InsightsPage() {
  const posts = await getAllBlogPosts();

  // Group posts by category for filtering
  const categories = Array.from(new Set(posts.flatMap((p) => p.category ? [p.category] : [])));

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-32 pb-16" background="muted">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Insights
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts on engineering, technology, and building great software products.
            Written by our team from the trenches.
          </p>
        </div>
      </Section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <Section className="py-8 border-b">
          <div className="flex flex-wrap gap-2 justify-center">
            <Tag variant="default" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              All
            </Tag>
            {categories.map((category) => (
              <Tag
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {category}
              </Tag>
            ))}
          </div>
        </Section>
      )}

      {/* Posts Grid */}
      <Section className="py-16">
        {posts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">{EMPTY_STATES.blog.title}</h3>
            <p className="text-muted-foreground mb-6">{EMPTY_STATES.blog.message}</p>
          </div>
        ) : (
          <>
            {/* Featured Post (first post) */}
            {posts[0] && (
              <Link href={`/insights/${posts[0].slug}`} className="block mb-16 group">
                <Card variant="elevated" className="overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="aspect-video md:aspect-auto bg-muted relative overflow-hidden">
                      {posts[0].coverImage || posts[0].image ? (
                        <img
                          src={posts[0].coverImage || posts[0].image || ''}
                          alt={posts[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="text-6xl font-bold text-primary/20">
                            {posts[0].title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <Tag className="absolute top-4 left-4">Featured</Tag>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        {posts[0].category && <Tag variant="outline" size="sm">{posts[0].category}</Tag>}
                        {posts[0].category && <span>•</span>}
                        <span>{formatDate(posts[0].publishedAt)}</span>
                        <span>•</span>
                        <span>{calculateReadTime(posts[0].content)} min read</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {posts[0].title}
                      </h2>
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {posts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted" />
                        <div>
                          <p className="font-medium">{posts[0].author}</p>
                          {posts[0].authorRole && (
                            <p className="text-sm text-muted-foreground">{posts[0].authorRole}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            )}

            {/* Rest of Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map((post) => (
                <Link key={post.slug} href={`/insights/${post.slug}`} className="group">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video overflow-hidden bg-muted">
                      {post.coverImage || post.image ? (
                        <img
                          src={post.coverImage || post.image || ''}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary/20">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        {post.category && <Tag variant="outline" size="sm">{post.category}</Tag>}
                        {post.category && <span>•</span>}
                        <span>{calculateReadTime(post.content)} min</span>
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="text-sm font-medium text-primary group-hover:underline">
                          Read more →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </Section>

      {/* Newsletter CTA */}
      <Section className="py-24" background="muted">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-muted-foreground mb-8">
            Get our latest insights delivered straight to your inbox.
            No spam, just thoughtful engineering content.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our privacy policy.
          </p>
        </div>
      </Section>
    </main>
  );
}
