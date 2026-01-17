/**
 * File path: src/components/seo/JsonLd.tsx
 * Role/responsibility: Reusable JSON-LD structured data components for SEO
 * Connections: Used by layout.tsx, team/[slug], insights/[slug], work/[slug]
 * Reference: https://schema.org, Google Structured Data Guidelines
 */

import { SITE_CONFIG } from '@/lib/constants';

// =============================================================================
// TYPES
// =============================================================================

interface OrganizationSchemaProps {
  url?: string;
  logo?: string;
}

interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  email?: string;
  url: string;
  sameAs?: string[];
  worksFor?: {
    name: string;
    url: string;
  };
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  modifiedAt?: string;
  image?: string;
  url: string;
  section?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
}

// =============================================================================
// ORGANIZATION SCHEMA
// =============================================================================

/**
 * Organization schema for the company
 * Used on: Every page (via layout.tsx)
 * Enables: Knowledge Panel, Company info in search results
 */
export function OrganizationSchema({ 
  url = SITE_CONFIG.url,
  logo = `${SITE_CONFIG.url}/images/banners/montemflumen-logo.svg`
}: OrganizationSchemaProps = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: url,
    logo: logo,
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.email,
      contactType: 'customer service',
    },
    address: SITE_CONFIG.contact ? {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.contact.address,
    } : undefined,
    sameAs: [
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.github,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// =============================================================================
// PERSON SCHEMA
// =============================================================================

/**
 * Person schema for team member pages
 * Used on: /team/[slug] pages
 * Enables: Rich snippets with photo, job title; Knowledge Panel eligibility
 */
export function PersonSchema({
  name,
  jobTitle,
  description,
  image,
  email,
  url,
  sameAs = [],
  worksFor = { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
}: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    jobTitle: jobTitle,
    description: description,
    image: image ? (image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`) : undefined,
    email: email ? `mailto:${email}` : undefined,
    url: url,
    worksFor: {
      '@type': 'Organization',
      name: worksFor.name,
      url: worksFor.url,
    },
    sameAs: sameAs.filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// =============================================================================
// ARTICLE SCHEMA
// =============================================================================

/**
 * Article schema for blog posts and case studies
 * Used on: /insights/[slug], /work/[slug] pages
 * Enables: Rich snippets with publish date, author, read time
 */
export function ArticleSchema({
  title,
  description,
  author,
  publishedAt,
  modifiedAt,
  image,
  url,
  section,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/banners/montemflumen-logo.svg`,
      },
    },
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    image: image ? (image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`) : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: section,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// =============================================================================
// BREADCRUMB SCHEMA
// =============================================================================

/**
 * BreadcrumbList schema for navigation hierarchy
 * Used on: All pages with breadcrumb navigation
 * Enables: Breadcrumb trail in search results
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// =============================================================================
// WEBPAGE SCHEMA
// =============================================================================

/**
 * WebPage schema for general pages
 * Used on: Static pages like About, Services, Contact
 * Enables: Better page understanding by search engines
 */
export function WebPageSchema({
  title,
  description,
  url,
  image,
}: WebPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    image: image ? (image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`) : undefined,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// =============================================================================
// WEBSITE SCHEMA
// =============================================================================

/**
 * WebSite schema with search action
 * Used on: Home page
 * Enables: Sitelinks search box in Google
 */
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
