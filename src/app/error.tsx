// File path: src/app/error.tsx
// Role: Global error boundary for runtime errors
// Connected files: constants.ts (ERROR_STATES)
// UI patterns: UX-ERR-02 Contextual Error Messages
// Edge cases: Error recovery, retry logic
// Reference: PIT-44 (try-catch error type)

'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ERROR_STATES } from '@/lib/constants';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // In production, errors should be sent to an error reporting service
    // For development, we log to console
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Application error:', error);
    }
    // In production, you would send to Sentry/LogRocket/etc here
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-10 h-10 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        {/* Content */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {ERROR_STATES.serverError.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          {ERROR_STATES.serverError.message}
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-muted rounded-lg text-left">
            <p className="text-sm font-mono text-muted-foreground break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-muted-foreground mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} size="lg">
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </Button>
        </div>

        {/* Support */}
        <p className="mt-8 text-sm text-muted-foreground">
          If this problem persists, please{' '}
          <a href="/contact" className="text-primary hover:underline">
            contact our support team
          </a>
          .
        </p>
      </div>
    </main>
  );
}
