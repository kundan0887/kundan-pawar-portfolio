'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      children,
      loading = false,
      fullWidth = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-105 active:scale-95';

    const variants = {
      primary:
        'bg-primary text-white hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-lg hover:shadow-xl',
      secondary:
        'bg-secondary-200 text-secondary-900 hover:bg-secondary-300 dark:bg-secondary-700 dark:text-white dark:hover:bg-secondary-600 shadow-md hover:shadow-lg',
      outline:
        'border-2 border-border bg-background text-foreground hover:bg-secondary-50 dark:hover:bg-secondary-800 shadow-sm hover:shadow-md',
      ghost:
        'text-foreground hover:bg-secondary-100 dark:hover:bg-secondary-800 hover:shadow-sm',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          widthClass,
          className,
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2' />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
