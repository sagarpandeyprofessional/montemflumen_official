// File path: src/lib/companyoverview.ts
// Purpose: Load + preprocess the Company Overview & Growth document from /content/blog (server-side).
// Connected files/modules: src/components/companyoverview/CompanyDocRenderer.tsx (renders the returned HTML/TOC).
// Responsibilities:
// - Read the .txt document from the repo (never hardcode absolute machine paths)
// - Convert special markers into safe HTML (H2/H3 anchors, {image} placeholders, optional page-break hr)
// - Produce a TOC (H2/H3) + HTML string for rendering

import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { IMAGE_PLACEHOLDER_HTML } from '@/components/companyoverview/ImagePlaceholder';

export type CompanyOverviewTocItem = {
  level: 2 | 3;
  id: string;
  text: string;
};

export type CompanyOverviewDoc = {
  raw: string;
  html: string;
  toc: CompanyOverviewTocItem[];
  title: string | null;
};

const companyOverviewFilePath = path.join(
  process.cwd(),
  'content',
  'blog',
  'Company Overview & Growth Document.txt'
);

/**
 * Basic, stable slugifier with collision handling via caller-managed map.
 */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/**
 * Convert markdown to HTML via remark.
 * Note: This content is local, repo-owned content; we avoid adding client-side hydration or extra libs.
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

/**
 * Read the raw company overview document from /content/blog.
 */
export function readCompanyOverviewRaw(): string {
  if (!fs.existsSync(companyOverviewFilePath)) return '';
  return fs.readFileSync(companyOverviewFilePath, 'utf8');
}

/**
 * Extract the first markdown H1 title (if any).
 */
export function extractCompanyOverviewTitle(raw: string): string | null {
  const match = raw.match(/^#\s+(.+)\s*$/m);
  return match?.[1]?.trim() ?? null;
}

/**
 * Preprocess the markdown-like text to:
 * - Replace exact "{image}" lines with a styled placeholder HTML block.
 * - Replace "--- PAGE BREAK ---" marker with an <hr> (formatting-only).
 * - Replace H2/H3 markdown headings with explicit <h2>/<h3> tags including id anchors for TOC scrolling.
 *   (We do this so we don't need additional remark plugins.)
 */
function preprocessCompanyOverview(raw: string): { markdown: string; toc: CompanyOverviewTocItem[] } {
  const lines = raw.split(/\r?\n/);
  const toc: CompanyOverviewTocItem[] = [];
  const slugCounts = new Map<string, number>();

  const nextUniqueId = (base: string) => {
    const current = slugCounts.get(base) ?? 0;
    const next = current + 1;
    slugCounts.set(base, next);
    return current === 0 ? base : `${base}-${next}`;
  };

  const out: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Exact placeholder line
    if (trimmed === '{image}') {
      out.push('');
      out.push(IMAGE_PLACEHOLDER_HTML);
      out.push('');
      continue;
    }

    // Optional page break marker (formatting-only; we do NOT split pages)
    if (trimmed === '--- PAGE BREAK ---') {
      out.push('');
      out.push('<hr class="my-12 border-ash-300/70 dark:border-ash-700" />');
      out.push('');
      continue;
    }

    // H2/H3 anchors (TOC uses only these)
    // Convert markdown headings into explicit HTML headings with IDs.
    const h2 = line.match(/^##\s+(.+)\s*$/);
    if (h2) {
      const text = h2[1].trim();
      const base = slugify(text) || 'section';
      const id = nextUniqueId(base);
      toc.push({ level: 2, id, text });

      out.push('');
      out.push(`<h2 id="${id}">${escapeHtml(text)}</h2>`);
      out.push('');
      continue;
    }

    const h3 = line.match(/^###\s+(.+)\s*$/);
    if (h3) {
      const text = h3[1].trim();
      const base = slugify(text) || 'subsection';
      const id = nextUniqueId(base);
      toc.push({ level: 3, id, text });

      out.push('');
      out.push(`<h3 id="${id}">${escapeHtml(text)}</h3>`);
      out.push('');
      continue;
    }

    out.push(line);
  }

  return { markdown: out.join('\n'), toc };
}

/**
 * Load and prepare the company overview doc for server rendering.
 */
export async function getCompanyOverviewDoc(): Promise<CompanyOverviewDoc> {
  const raw = readCompanyOverviewRaw();
  const title = extractCompanyOverviewTitle(raw);

  const { markdown, toc } = preprocessCompanyOverview(raw);

  // Convert to HTML
  const renderedHtml = await markdownToHtml(markdown);

  return {
    raw,
    html: renderedHtml,
    toc,
    title,
  };
}
