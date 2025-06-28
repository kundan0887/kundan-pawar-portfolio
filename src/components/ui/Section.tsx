import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
  variant?: 'default' | 'alternate' | 'hero';
  container?: boolean;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      id,
      children,
      variant = 'default',
      container = true,
      spacing = 'lg',
      ...props
    },
    ref,
  ) => {
    const baseStyles = 'w-full';

    const variants = {
      default: 'bg-transparent',
      alternate: 'bg-white dark:bg-slate-900',
      hero: 'bg-transparent',
    };

    const spacingStyles = {
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16',
      lg: 'py-16 md:py-20',
      xl: 'py-20 md:py-24',
    };

    const content = container ? (
      <div className='container mx-auto px-4'>{children}</div>
    ) : (
      children
    );

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          baseStyles,
          variants[variant],
          spacingStyles[spacing],
          className,
        )}
        {...props}
      >
        {content}
      </section>
    );
  },
);

Section.displayName = 'Section';

export { Section };
