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
        'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
      primary:
        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      secondary:
        'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      success:
        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      warning:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
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
