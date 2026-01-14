// File path: src/components/companyoverview/CompanyDocRenderer.tsx
// Purpose: Render the Company Overview document as a premium, long-form policy/blog page with TOC.
// Connected files/modules:
// - src/lib/companyoverview.ts (content loading + TOC extraction + HTML generation)
// Responsibilities:
// - Display TOC (H2/H3) with stable anchors
// - Render server-produced HTML safely (no hydration required)
// - Apply policy-style, readable typography using local Tailwind utility selectors (no global changes)

import React from 'react';
import type { CompanyOverviewTocItem } from '@/lib/companyoverview';

type Props = {
  title: string | null;
  toc: CompanyOverviewTocItem[];
  html: string;
};

export function CompanyDocRenderer({ title, toc, html }: Props) {
  return (
    <div className="container-narrow py-12 md:py-16">
      <div className="rounded-3xl border border-ash-200 bg-white shadow-soft dark:border-forest-800 dark:bg-forest-950">
        <div className="px-6 py-10 sm:px-10">
          {/* Title (derived from document H1 if present) */}
          {title ? (
            <div className="mb-10">
              <h1 className="text-heading-1 md:text-display-2">{title}</h1>
              <p className="mt-3 text-body text-forest-700/80 dark:text-picket-100/70">
                A long-form, blog-style company overview rendered from your project content file.
              </p>
            </div>
          ) : null}

          {/* TOC */}
          {toc.length > 0 ? (
            <div className="mb-10 rounded-2xl border border-ash-200 bg-picket-100/60 p-6 dark:border-forest-800 dark:bg-forest-900/20">
              <div className="text-sm font-semibold text-forest-900 dark:text-picket-50">Contents</div>

              <div className="mt-4 grid gap-2">
                {toc.map((item) => (
                  <a
                    key={`${item.level}-${item.id}`}
                    href={`#${item.id}`}
                    className={[
                      'block rounded-lg px-3 py-2 text-sm transition-colors',
                      'hover:bg-ash-200/60 dark:hover:bg-forest-800/40',
                      item.level === 3 ? 'ml-3 text-forest-700/80 dark:text-picket-100/70' : 'text-forest-900 dark:text-picket-50',
                    ].join(' ')}
                  >
                    <span className="font-medium">{item.text}</span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {/* Article Content */}
          <article
            className={[
              'text-body text-forest-800 dark:text-picket-100',
              // Paragraphs & spacing
              '[&_p]:my-5 [&_p]:leading-relaxed',
              // Headings (H2/H3 are injected with ids server-side; style them here)
              '[&_h1]:my-10 [&_h1]:text-display-2 [&_h1]:md:text-display-1',
              '[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-heading-1',
              '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-heading-2',
              // Lists
              '[&_ul]:my-5 [&_ul]:ml-6 [&_ul]:list-disc [&_ul>li]:my-2',
              '[&_ol]:my-5 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol>li]:my-2',
              // Blockquotes (policy/callout feel)
              '[&_blockquote]:my-6 [&_blockquote]:rounded-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-forest-800',
              '[&_blockquote]:bg-picket-100/60 [&_blockquote]:px-5 [&_blockquote]:py-4',
              'dark:[&_blockquote]:border-forest-500 dark:[&_blockquote]:bg-forest-900/20',
              // Inline code
              '[&_code]:rounded-md [&_code]:bg-ash-200/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.95em]',
              'dark:[&_code]:bg-forest-800/50',
              // Horizontal rules
              '[&_hr]:my-10 [&_hr]:border-ash-200 dark:[&_hr]:border-forest-800',
              // Tables
              '[&_table]:my-8 [&_table]:w-full [&_table]:border-collapse',
              '[&_th]:border [&_th]:border-ash-200 [&_th]:bg-picket-100/80 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-sm',
              'dark:[&_th]:border-forest-800 dark:[&_th]:bg-forest-900/30',
              '[&_td]:border [&_td]:border-ash-200 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_td]:text-sm',
              'dark:[&_td]:border-forest-800',
              // Links
              '[&_a]:text-forest-800 [&_a]:underline [&_a]:decoration-ash-400 [&_a]:underline-offset-4',
              'hover:[&_a]:decoration-forest-800 dark:[&_a]:text-picket-50 dark:hover:[&_a]:decoration-picket-50',
            ].join(' ')}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
