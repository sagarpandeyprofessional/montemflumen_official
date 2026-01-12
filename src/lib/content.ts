/**
 * File path: src/lib/content.ts
 * Role/responsibility: Markdown content loading and parsing for team, case studies, and blog
 * Connections: Used by page components to load content from markdown files
 * Data/copy source: content/ directory markdown files
 * Reference documents: PIT-5 (fs module), PIT-87 (JSON Parse Error - try-catch)
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type {
  TeamMember,
  TeamMemberFrontmatter,
  CaseStudy,
  CaseStudyFrontmatter,
  BlogPost,
  BlogPostFrontmatter,
} from '@/types';

// =============================================================================
// DIRECTORY PATHS
// =============================================================================

const contentDirectory = path.join(process.cwd(), 'content');
const teamDirectory = path.join(contentDirectory, 'team');
const caseStudiesDirectory = path.join(contentDirectory, 'case-studies');
const blogDirectory = path.join(contentDirectory, 'blog');

// =============================================================================
// MARKDOWN PROCESSING
// =============================================================================

/**
 * Convert markdown content to HTML
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

/**
 * Read all markdown files from a directory
 */
function getMarkdownFiles(directory: string): string[] {
  try {
    if (!fs.existsSync(directory)) {
      return [];
    }
    return fs.readdirSync(directory).filter((file) => file.endsWith('.md'));
  } catch {
    return [];
  }
}

/**
 * Parse frontmatter and content from a markdown file
 */
function parseMarkdownFile<T>(
  filePath: string
): { frontmatter: T; content: string; slug: string } | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = path.basename(filePath, '.md');
    return {
      frontmatter: data as T,
      content,
      slug,
    };
  } catch {
    return null;
  }
}

// =============================================================================
// TEAM MEMBERS
// =============================================================================

/**
 * Get all team members sorted by order
 */
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const files = getMarkdownFiles(teamDirectory);
  const members: TeamMember[] = [];

  for (const file of files) {
    const filePath = path.join(teamDirectory, file);
    const parsed = parseMarkdownFile<TeamMemberFrontmatter>(filePath);

    if (parsed) {
      const htmlContent = await markdownToHtml(parsed.content);
      members.push({
        slug: parsed.slug,
        ...parsed.frontmatter,
        content: htmlContent,
      });
    }
  }

  return members.sort((a, b) => a.order - b.order);
}

/**
 * Get featured team members
 */
export async function getFeaturedTeamMembers(limit?: number): Promise<TeamMember[]> {
  const allMembers = await getAllTeamMembers();
  const featured = allMembers.filter((member) => member.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get a single team member by slug
 */
export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  const filePath = path.join(teamDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const parsed = parseMarkdownFile<TeamMemberFrontmatter>(filePath);

  if (!parsed) {
    return null;
  }

  const htmlContent = await markdownToHtml(parsed.content);
  return {
    slug: parsed.slug,
    ...parsed.frontmatter,
    content: htmlContent,
  };
}

/**
 * Get all team member slugs for static generation
 * (PIT-12: Static Params Limit - return strings)
 */
export function getAllTeamMemberSlugs(): string[] {
  const files = getMarkdownFiles(teamDirectory);
  return files.map((file) => path.basename(file, '.md'));
}

// =============================================================================
// CASE STUDIES
// =============================================================================

/**
 * Get all case studies sorted by date
 */
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const files = getMarkdownFiles(caseStudiesDirectory);
  const studies: CaseStudy[] = [];

  for (const file of files) {
    const filePath = path.join(caseStudiesDirectory, file);
    const parsed = parseMarkdownFile<CaseStudyFrontmatter>(filePath);

    if (parsed) {
      const htmlContent = await markdownToHtml(parsed.content);
      studies.push({
        slug: parsed.slug,
        ...parsed.frontmatter,
        content: htmlContent,
      });
    }
  }

  return studies.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get featured case studies
 */
export async function getFeaturedCaseStudies(limit?: number): Promise<CaseStudy[]> {
  const allStudies = await getAllCaseStudies();
  const featured = allStudies.filter((study) => study.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get a single case study by slug
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const filePath = path.join(caseStudiesDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const parsed = parseMarkdownFile<CaseStudyFrontmatter>(filePath);

  if (!parsed) {
    return null;
  }

  const htmlContent = await markdownToHtml(parsed.content);
  return {
    slug: parsed.slug,
    ...parsed.frontmatter,
    content: htmlContent,
  };
}

/**
 * Get all case study slugs for static generation
 */
export function getAllCaseStudySlugs(): string[] {
  const files = getMarkdownFiles(caseStudiesDirectory);
  return files.map((file) => path.basename(file, '.md'));
}

// =============================================================================
// BLOG POSTS
// =============================================================================

/**
 * Get all blog posts sorted by date
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = getMarkdownFiles(blogDirectory);
  const posts: BlogPost[] = [];

  for (const file of files) {
    const filePath = path.join(blogDirectory, file);
    const parsed = parseMarkdownFile<BlogPostFrontmatter>(filePath);

    if (parsed) {
      const htmlContent = await markdownToHtml(parsed.content);
      posts.push({
        slug: parsed.slug,
        ...parsed.frontmatter,
        content: htmlContent,
      });
    }
  }

  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get recent blog posts
 */
export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.slice(0, limit);
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(limit?: number): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  const featured = allPosts.filter((post) => post.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const parsed = parseMarkdownFile<BlogPostFrontmatter>(filePath);

  if (!parsed) {
    return null;
  }

  const htmlContent = await markdownToHtml(parsed.content);
  return {
    slug: parsed.slug,
    ...parsed.frontmatter,
    content: htmlContent,
  };
}

/**
 * Get all blog post slugs for static generation
 */
export function getAllBlogPostSlugs(): string[] {
  const files = getMarkdownFiles(blogDirectory);
  return files.map((file) => path.basename(file, '.md'));
}
