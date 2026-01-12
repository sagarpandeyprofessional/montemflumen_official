/**
 * File path: src/components/ui/Card.tsx
 * Role/responsibility: Reusable card component with header, content, and footer sections
 * Connections: Used for team members, case studies, blog posts, and features
 * UI/UX patterns: [LP-06] Bento Grid, card-hover interaction
 * Reference documents: PIT-21 (HTML Nesting Rules)
 */

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { CardVariant } from '@/types';

// =============================================================================
// CARD ROOT
// =============================================================================

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card variant */
  variant?: CardVariant;
  /** Enable hover effects */
  hoverable?: boolean;
  /** Make the card a link container */
  asChild?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverable = false, children, ...props }, ref) => {
    const variantStyles: Record<CardVariant, string> = {
      default: 'card',
      outlined:
        'rounded-xl border border-ash-300 bg-transparent dark:border-forest-700',
      elevated: 'card shadow-medium',
    };

    return (
      <div
        ref={ref}
        className={cn(
          variantStyles[variant],
          hoverable && 'card-hover cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// =============================================================================
// CARD HEADER
// =============================================================================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove default padding */
  noPadding?: boolean;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, noPadding = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(!noPadding && 'p-6 pb-0', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// =============================================================================
// CARD CONTENT
// =============================================================================

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove default padding */
  noPadding?: boolean;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, noPadding = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(!noPadding && 'p-6', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

// =============================================================================
// CARD FOOTER
// =============================================================================

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove default padding */
  noPadding?: boolean;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, noPadding = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(!noPadding && 'p-6 pt-0', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// =============================================================================
// CARD IMAGE
// =============================================================================

export interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source */
  src?: string;
  /** Alt text */
  alt?: string;
  /** Aspect ratio class */
  aspectRatio?: 'hero' | 'card' | 'square';
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, src, alt, aspectRatio = 'card', children, ...props }, ref) => {
    const aspectStyles = {
      hero: 'aspect-hero',
      card: 'aspect-card',
      square: 'aspect-square',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-t-xl',
          aspectStyles[aspectRatio],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || ''}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-ash-200 to-ash-300 dark:from-forest-800 dark:to-forest-700" />
        )}
        {children}
      </div>
    );
  }
);

CardImage.displayName = 'CardImage';

export { Card, CardHeader, CardContent, CardFooter, CardImage };
