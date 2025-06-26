'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'custom';
  customColor?: string;
  className?: string;
  label?: string;
  showLabel?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const colorClasses = {
  primary: 'text-blue-600 dark:text-blue-400',
  secondary: 'text-slate-600 dark:text-slate-400',
  white: 'text-white',
  custom: '',
};

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  customColor,
  className,
  label = 'Loading...',
  showLabel = false,
}: LoadingSpinnerProps) {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear' as const,
      },
    },
  };

  const dotVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <div
      className={cn('flex flex-col items-center justify-center', className)}
      role="status"
      aria-label={label}
    >
      {/* Main Spinner */}
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        className={cn(
          'relative',
          sizeClasses[size],
          color === 'custom' ? '' : colorClasses[color]
        )}
        style={
          color === 'custom' && customColor ? { color: customColor } : undefined
        }
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-current border-t-transparent opacity-30" />

        {/* Inner spinning ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-current border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear' as const,
          }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={dotVariants}
          animate="animate"
        >
          <div className="w-1 h-1 rounded-full bg-current" />
        </motion.div>
      </motion.div>

      {/* Loading label */}
      {showLabel && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            'mt-2 text-sm font-medium',
            color === 'custom' ? '' : colorClasses[color],
            size === 'sm' ? 'text-xs' : 'text-sm'
          )}
          style={
            color === 'custom' && customColor
              ? { color: customColor }
              : undefined
          }
        >
          {label}
        </motion.p>
      )}

      {/* Screen reader text */}
      <span className="sr-only">{label}</span>
    </div>
  );
}

// Pulse loading variant
export function LoadingPulse({
  size = 'md',
  color = 'primary',
  customColor,
  className,
  label = 'Loading...',
  showLabel = false,
}: LoadingSpinnerProps) {
  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <div
      className={cn('flex flex-col items-center justify-center', className)}
      role="status"
      aria-label={label}
    >
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className={cn(
          'rounded-full bg-current',
          sizeClasses[size],
          color === 'custom' ? '' : colorClasses[color]
        )}
        style={
          color === 'custom' && customColor
            ? { backgroundColor: customColor }
            : undefined
        }
      />

      {showLabel && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            'mt-2 text-sm font-medium',
            color === 'custom' ? '' : colorClasses[color],
            size === 'sm' ? 'text-xs' : 'text-sm'
          )}
          style={
            color === 'custom' && customColor
              ? { color: customColor }
              : undefined
          }
        >
          {label}
        </motion.p>
      )}

      <span className="sr-only">{label}</span>
    </div>
  );
}

// Dots loading variant
export function LoadingDots({
  size = 'md',
  color = 'primary',
  customColor,
  className,
  label = 'Loading...',
  showLabel = false,
}: LoadingSpinnerProps) {
  const dots = [0, 1, 2];

  return (
    <div
      className={cn('flex flex-col items-center justify-center', className)}
      role="status"
      aria-label={label}
    >
      <div className="flex space-x-1">
        {dots.map((dot, index) => (
          <motion.div
            key={dot}
            className={cn(
              'w-2 h-2 rounded-full bg-current',
              color === 'custom' ? '' : colorClasses[color]
            )}
            style={
              color === 'custom' && customColor
                ? { backgroundColor: customColor }
                : undefined
            }
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: 'easeInOut' as const,
            }}
          />
        ))}
      </div>

      {showLabel && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            'mt-2 text-sm font-medium',
            color === 'custom' ? '' : colorClasses[color],
            size === 'sm' ? 'text-xs' : 'text-sm'
          )}
          style={
            color === 'custom' && customColor
              ? { color: customColor }
              : undefined
          }
        >
          {label}
        </motion.p>
      )}

      <span className="sr-only">{label}</span>
    </div>
  );
}

// Skeleton loading component
export function LoadingSkeleton({
  className,
  lines = 1,
  height = 'h-4',
}: {
  className?: string;
  lines?: number;
  height?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            'bg-slate-200 dark:bg-slate-700 rounded animate-pulse',
            height
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </div>
  );
}

// Page loading overlay
export function LoadingOverlay({
  isVisible,
  message = 'Loading...',
}: {
  isVisible: boolean;
  message?: string;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <LoadingSpinner size="xl" color="primary" showLabel />
            <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
