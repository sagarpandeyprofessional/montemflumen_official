/**
 * File path: src/app/sitemap.ts
 * Role/responsibility: Generate sitemap.xml for SEO with accurate lastModified dates
 * Connected files: content.ts (dynamic routes)
 * SEO: Provides search engines with accurate page update information
 * Reference: ENT-SEO (sitemap generation)
 */

import { MetadataRoute } from 'next';
import { getAllTeamMemberSlugs, getAllBlogPosts, getAllCaseStudies } from '@/lib/content';
import { SITE_CONFIG } from '@/lib/constants';

// Last update date for static pages (update this when you edit static pages)
const STATIC_PAGES_LAST_MODIFIED = new Date('2025-01-15');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Static pages with their priorities
  const staticPages = [
    { route: '', priority: 1.0, changeFreq: 'weekly' as const },
    { route: '/about', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/about/story', priority: 0.7, changeFreq: 'monthly' as const },
    { route: '/about/how-we-think', priority: 0.7, changeFreq: 'monthly' as const },
    { route: '/services', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/work', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/team', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/insights', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/contact', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/careers', priority: 0.7, changeFreq: 'weekly' as const },
    { route: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
  ];

  const staticRoutes = staticPages.map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: STATIC_PAGES_LAST_MODIFIED,
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));

  // Dynamic pages - Team members
  const teamSlugs = getAllTeamMemberSlugs();
  const teamRoutes = teamSlugs.map((slug) => ({
    url: `${baseUrl}/team/${slug}`,
    lastModified: STATIC_PAGES_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic pages - Case studies (with actual publish dates)
  const caseStudies = await getAllCaseStudies();
  const caseRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/work/${study.slug}`,
    lastModified: study.publishedAt ? new Date(study.publishedAt) : STATIC_PAGES_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic pages - Blog posts (with actual publish dates)
  const blogPosts = await getAllBlogPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : STATIC_PAGES_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...teamRoutes, ...caseRoutes, ...blogRoutes];
}
