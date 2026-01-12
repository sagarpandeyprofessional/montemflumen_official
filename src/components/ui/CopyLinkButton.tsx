/**
 * File path: src/components/ui/CopyLinkButton.tsx
 * Role/responsibility: Copy link to clipboard button (Client Component)
 * Connections: Used in insights/[slug]/page.tsx for sharing
 * Reference: PIT-4 (onClick in Server Component - must be client)
 */

'use client';

import { useState } from 'react';

interface CopyLinkButtonProps {
  url: string;
  className?: string;
}

export function CopyLinkButton({ url, className }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={className}
      aria-label={copied ? 'Link copied!' : 'Copy link'}
      title={copied ? 'Copied!' : 'Copy link'}
    >
      {copied ? (
        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      )}
    </button>
  );
}
