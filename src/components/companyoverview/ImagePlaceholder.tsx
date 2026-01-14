// File path: src/components/blog/ImagePlaceholder.tsx
// Purpose: Policy-style image placeholder + server-side HTML generators.
// Connected files/modules:
// - src/components/blog/BlogDocRenderer.tsx (uses renderImageBlockHtml/renderAwardRowHtml)
// Responsibilities:
// - Provide consistent placeholder blocks for "{image}" lines.
// - Provide Awards row layout (image left, text right) using existing repo images when available.

import React from 'react';

export type ImageBlockSpec =
  | {
      variant: 'placeholder';
      label?: string;
      note?: string;
    }
  | {
      variant: 'image';
      src: string;
      alt: string;
      caption?: string;
    };

export function ImagePlaceholder({
  label = 'Image placeholder',
  note = 'Replace this {image} in the content file with your image URL/path later.',
}: {
  label?: string;
  note?: string;
}) {
  return (
    <div className="not-prose my-8 rounded-xl border border-dashed border-border bg-blue-50/60 p-6 dark:bg-blue-950/30">
      <div className="text-sm font-semibold text-forest-900 dark:text-picket-50">{label}</div>
      <div className="mt-2 text-sm text-muted-foreground">{note}</div>
    </div>
  );
}

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export const IMAGE_PLACEHOLDER_HTML = `
<figure class="my-8 overflow-hidden rounded-2xl border border-dashed border-ash-300 bg-picket-100/60 dark:border-ash-700 dark:bg-forest-900/20">
  <div class="aspect-video w-full bg-ash-200/60 dark:bg-ash-800/40">
    <img
      src="https://placehold.co/1600x900/png?text=Replace+This+Image"
      alt="Placeholder"
      class="h-full w-full object-cover"
      loading="lazy"
    />
  </div>
  <figcaption class="p-5">
    <div class="text-sm font-semibold text-forest-900 dark:text-picket-50">Image placeholder</div>
    <div class="mt-1 text-sm text-forest-700/80 dark:text-picket-100/70">
      Replace this <span class="font-mono">{image}</span> in the content file with your image URL/path later.
    </div>
  </figcaption>
</figure>
`.trim();

export function renderAwardRowHtml(args: { title: string; imageSrc: string }): string {
  const title = escapeHtml(args.title || 'Award');
  const imageSrc = escapeHtml(args.imageSrc || '/images/banners/plantbanner.png');
  return `
<div class="not-prose my-8">
  <div class="flex flex-col gap-5 rounded-2xl border border-border bg-background p-5 sm:flex-row sm:items-start">
    <div class="w-full sm:w-64">
      <div class="aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted/20">
        <img src="${imageSrc}" alt="${title}" class="h-full w-full object-cover" />
      </div>
      <div class="mt-3 text-[11px] text-muted-foreground">
        Replace this award image later by updating the document content file.
      </div>
    </div>
    <div class="min-w-0 flex-1">
      <div class="text-base font-semibold text-forest-900 dark:text-picket-50">${title}</div>
      <div class="mt-4 rounded-xl bg-yellow-50/60 p-4 dark:bg-yellow-950/20">
        <div class="border-l-4 border-yellow-500 pl-4 text-sm text-muted-foreground">
          Award details are rendered from the surrounding text in the document.
        </div>
      </div>
    </div>
  </div>
</div>
`.trim();
}