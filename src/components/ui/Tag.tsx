/**
 * File path: src/components/ui/Tag.tsx
 * Role/responsibility: Reusable tag/badge component for categories and labels
 * Connections: Used in cards, team members, case studies, blog posts
 * Reference documents: UI Pattern Collection
 */

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tag variant */
  variant?: 'default' | 'primary' | 'outline';
  /** Tag size */
  size?: 'sm' | 'md';
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variantStyles = {
      default: 'tag',
      primary: 'tag-primary',
      outline:
        'inline-flex items-center rounded-full border border-ash-400 bg-transparent px-3 py-1 text-xs font-medium text-forest-700 dark:border-forest-600 dark:text-ash-300',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-[10px]',
      md: 'px-3 py-1 text-xs',
    };

    return (
      <span
        ref={ref}
        className={cn(variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export { Tag };
