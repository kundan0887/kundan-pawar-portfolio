import React from 'react';

import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = 'default', size = 'md', children, ...props },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center font-medium rounded-full transition-colors';
    const variants = {
      default:
        'bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-200',
      primary:
        'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
      secondary:
        'bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-300',
      success:
        'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300',
      warning:
        'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300',
      error:
        'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export { Badge };
