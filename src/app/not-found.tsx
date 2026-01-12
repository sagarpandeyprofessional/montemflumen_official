// File path: src/app/not-found.tsx
// Role: Custom 404 page with helpful navigation
// Connected files: constants.ts (ERROR_STATES)
// UI patterns: UTIL-03 404 Error Page with humor
// Reference: PIT-16 (notFound handling)

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ERROR_STATES } from '@/lib/constants';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <span className="text-[12rem] md:text-[16rem] font-bold text-primary/10 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-24 h-24 md:w-32 md:h-32 text-primary animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {ERROR_STATES.notFound.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {ERROR_STATES.notFound.message}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Or try one of these pages:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/services"
              className="text-sm text-primary hover:underline"
            >
              Services
            </Link>
            <Link
              href="/work"
              className="text-sm text-primary hover:underline"
            >
              Work
            </Link>
            <Link
              href="/team"
              className="text-sm text-primary hover:underline"
            >
              Team
            </Link>
            <Link
              href="/insights"
              className="text-sm text-primary hover:underline"
            >
              Insights
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
