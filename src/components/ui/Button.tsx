/**
 * File path: src/components/ui/Button.tsx
 * Role/responsibility: Reusable button component with multiple variants
 * Connections: Used throughout the application for CTAs and actions
 * UI/UX patterns: [UX-PSY-02] Micro-Interaction Feedback, [UX-INPUT-01] disabled states
 * Edge cases: Loading state, disabled state, keyboard navigation
 * Reference documents: PIT-4 (onClick in Server Component), PIT-99 (Double Submit)
 */

'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { ButtonVariant, ButtonSize } from '@/types';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Shows loading spinner and disables button */
  isLoading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Render as child element */
  asChild?: boolean;
}

/**
 * Button component with multiple variants and states
 * (PIT-99: Double Submit Prevention - disable during loading)
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
      outline: 'btn-outline',
    };

    // Size styles
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    };

    const buttonClasses = cn(
      'btn',
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      isLoading && 'cursor-wait',
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(buttonClasses, children.props.className),
        ref,
        disabled: disabled || isLoading,
        'aria-disabled': disabled || isLoading,
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Left icon */}
        {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}

        {/* Children */}
        <span>{children}</span>

        {/* Right icon */}
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
