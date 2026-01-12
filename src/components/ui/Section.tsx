/**
 * File path: src/components/ui/Section.tsx
 * Role/responsibility: Consistent section wrapper with title, subtitle, and spacing
 * Connections: Used throughout all pages for consistent section layout
 * Reference documents: UI Pattern Collection (section spacing)
 */

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { SectionBackground } from '@/types';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Background variant */
  background?: SectionBackground;
  /** Use narrow container */
  narrow?: boolean;
  /** Remove top padding */
  noTopPadding?: boolean;
  /** Remove bottom padding */
  noBottomPadding?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      background = 'default',
      narrow = false,
      noTopPadding = false,
      noBottomPadding = false,
      children,
      ...props
    },
    ref
  ) => {
    const backgroundStyles: Record<SectionBackground, string> = {
      default: '',
      muted: 'bg-ash-100 dark:bg-forest-900',
      dark: 'bg-forest-900 text-picket-100 dark:bg-forest-950',
      accent: 'bg-forest-800 text-picket-100',
      primary: 'bg-forest-800 text-picket-100',
    };

    return (
      <section
        ref={ref}
        className={cn(
          'section',
          noTopPadding && 'pt-0',
          noBottomPadding && 'pb-0',
          backgroundStyles[background],
          className
        )}
        {...props}
      >
        <div className={cn(narrow ? 'container-narrow' : 'container-wide')}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

// =============================================================================
// SECTION HEADER
// =============================================================================

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle?: string;
  /** Center align */
  centered?: boolean;
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, subtitle, centered = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mb-12',
          centered && 'text-center',
          className
        )}
        {...props}
      >
        <h2 className="text-display-2 mb-4">{title}</h2>
        {subtitle && (
          <p className="text-body-lg max-w-2xl text-ash-600 dark:text-ash-400">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export { Section, SectionHeader };
