/**
 * File path: src/types/index.ts
 * Role/responsibility: Central type definitions for the entire application
 * Connections: Used by all components, pages, and utilities
 * Reference documents: PIT-TS-031-045 (TypeScript strictness)
 */

// =============================================================================
// CONTENT TYPES
// =============================================================================

/**
 * Team member data structure
 */
export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  tags: string[];
  linkedin?: string;
  github?: string;
  email?: string;
  order: number;
  featured: boolean;
  content: string;
}

/**
 * Team member frontmatter from markdown files
 */
export interface TeamMemberFrontmatter {
  name: string;
  role: string;
  bio: string;
  image?: string;
  tags: string[];
  linkedin?: string;
  github?: string;
  email?: string;
  order: number;
  featured: boolean;
}

/**
 * Case study data structure
 */
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  description: string;
  excerpt?: string;
  challenge: string;
  outcome: string;
  coverImage?: string;
  image?: string;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  industry?: string;
  duration?: string;
  services?: string[];
  metrics?: Array<{
    value: string;
    label: string;
  }>;
  technologies?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  content: string;
}

/**
 * Case study frontmatter from markdown files
 */
export interface CaseStudyFrontmatter {
  title: string;
  client: string;
  description: string;
  excerpt?: string;
  challenge: string;
  outcome: string;
  coverImage?: string;
  image?: string;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  industry?: string;
  duration?: string;
  services?: string[];
  metrics?: Array<{
    value: string;
    label: string;
  }>;
  technologies?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

/**
 * Blog post data structure
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  description?: string;
  author: string;
  authorRole?: string;
  publishedAt: string;
  date?: string;
  readTime: string;
  tags: string[];
  category?: string;
  coverImage?: string;
  image?: string;
  featured: boolean;
  content: string;
}

/**
 * Blog post frontmatter from markdown files
 */
export interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  description?: string;
  author: string;
  authorRole?: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  category?: string;
  coverImage?: string;
  image?: string;
  featured: boolean;
}

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

/**
 * Navigation item with optional children
 */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/**
 * Footer link section
 */
export interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

// =============================================================================
// FORM TYPES
// =============================================================================

/**
 * Contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

/**
 * Form field state
 */
export interface FormFieldState {
  value: string;
  error: string | null;
  touched: boolean;
}

/**
 * Form submission state
 */
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// =============================================================================
// UI TYPES
// =============================================================================

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

/**
 * Button sizes
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Card variants
 */
export type CardVariant = 'default' | 'outlined' | 'elevated';

/**
 * Section background variants
 */
export type SectionBackground = 'default' | 'muted' | 'dark' | 'accent' | 'primary';

// =============================================================================
// SEO TYPES
// =============================================================================

/**
 * SEO metadata
 */
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

// =============================================================================
// SITE CONFIGURATION
// =============================================================================

/**
 * Site-wide configuration
 */
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  email: string;
  contact?: {
    email: string;
    address: string;
  };
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}
