// File path: src/app/insights/[slug]/page.tsx
// Role: Individual blog post detail page with rich content rendering
// Reference: PIT-4 (onClick -> Client Component), PIT-12 (static params), PIT-16 (notFound)

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/ui/Section';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { CopyLinkButton } from '@/components/ui/CopyLinkButton';
import { getAllBlogPosts, getAllBlogPostSlugs } from '@/lib/content';
import { formatDate, calculateReadTime } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

export async function generateStaticParams() {
  const slugs = getAllBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return { title: `Post Not Found | ${SITE_CONFIG.name}` };
  }

  return {
    title: `${post.title} | ${SITE_CONFIG.name}`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const readTime = calculateReadTime(post.content);
  const shareUrl = `${SITE_CONFIG.url}/insights/${post.slug}`;
  const postTags = post.tags || [];

  return (
    <main className="min-h-screen">
      <Section className="pt-32 pb-16" background="muted">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/insights" className="hover:text-foreground transition-colors">
              Insights
            </Link>
            <span>/</span>
            <span>{post.category || 'Article'}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.category && <Tag variant="default">{post.category}</Tag>}
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{formatDate(post.publishedAt)}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {post.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium">{post.author}</p>
              {post.authorRole && (
                <p className="text-sm text-muted-foreground">{post.authorRole}</p>
              )}
            </div>
          </div>
        </div>
      </Section>

      {post.coverImage && (
        <Section className="py-0">
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Section>
      )}

      <Section className="py-16">
        <div className="max-w-3xl mx-auto">
          <article
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {postTags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h4 className="text-sm font-medium text-muted-foreground mb-4">Topics</h4>
              <div className="flex flex-wrap gap-2">
                {postTags.map((tag) => (
                  <Tag key={tag} variant="outline">{tag}</Tag>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 pt-8 border-t">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Share this article</h4>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Share on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <CopyLinkButton
                url={shareUrl}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              />
            </div>
          </div>

          <div className="mt-12 p-6 bg-muted rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-2xl font-semibold text-primary">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-lg">{post.author}</p>
                {post.authorRole && (
                  <p className="text-muted-foreground mb-2">{post.authorRole}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Building great software at Montemflumen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {relatedPosts.length > 0 && (
        <Section className="py-16" background="muted">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/insights/${relatedPost.slug}`} className="group">
                  <article className="bg-background rounded-xl p-6 h-full hover:shadow-lg transition-shadow">
                    {relatedPost.category && (
                      <Tag variant="outline" size="sm" className="mb-4">{relatedPost.category}</Tag>
                    )}
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(relatedPost.publishedAt)}
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section className="py-12">
        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/insights">Back to All Insights</Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}
