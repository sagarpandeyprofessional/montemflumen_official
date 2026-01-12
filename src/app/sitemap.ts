// File path: src/app/sitemap.ts
// Role: Generate sitemap.xml for SEO
// Connected files: content.ts (dynamic routes)
// Reference: ENT-SEO (sitemap generation)

import { MetadataRoute } from 'next';
import { getAllTeamMemberSlugs, getAllCaseStudySlugs, getAllBlogPostSlugs } from '@/lib/content';
import { SITE_CONFIG } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/about/story',
    '/about/how-we-think',
    '/services',
    '/work',
    '/team',
    '/insights',
    '/contact',
    '/careers',
    '/privacy',
    '/terms',
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic pages - Team members
  const teamSlugs = await getAllTeamMemberSlugs();
  const teamRoutes = teamSlugs.map((slug) => ({
    url: `${baseUrl}/team/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic pages - Case studies
  const caseSlugs = await getAllCaseStudySlugs();
  const caseRoutes = caseSlugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic pages - Blog posts
  const blogSlugs = await getAllBlogPostSlugs();
  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...teamRoutes, ...caseRoutes, ...blogRoutes];
}
