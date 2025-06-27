'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  bundleSize: number | null;
  loadTime: number | null;
}

interface WebVitals {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  threshold: { good: number; poor: number };
}

const getRating = (
  value: number,
  good: number,
  poor: number,
): 'good' | 'needs-improvement' | 'poor' => {
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
};

const getRatingColor = (rating: 'good' | 'needs-improvement' | 'poor') => {
  switch (rating) {
    case 'good':
      return 'text-green-600 dark:text-green-400';
    case 'needs-improvement':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'poor':
      return 'text-red-600 dark:text-red-400';
  }
};

const getRatingBg = (rating: 'good' | 'needs-improvement' | 'poor') => {
  switch (rating) {
    case 'good':
      return 'bg-green-100 dark:bg-green-900/20';
    case 'needs-improvement':
      return 'bg-yellow-100 dark:bg-yellow-900/20';
    case 'poor':
      return 'bg-red-100 dark:bg-red-900/20';
  }
};

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    bundleSize: null,
    loadTime: null,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Only show in development or when explicitly enabled
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NEXT_PUBLIC_SHOW_PERFORMANCE === 'true'
    ) {
      setIsVisible(true);
    }

    // Measure initial load time
    const loadTime = performance.now();
    setMetrics(prev => ({ ...prev, loadTime }));

    // Web Vitals measurement
    const measureWebVitals = () => {
      if ('PerformanceObserver' in window) {
        // First Contentful Paint
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          const fcp = entries[entries.length - 1];
          if (fcp) {
            setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
          }
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          if (lcp) {
            setMetrics(prev => ({ ...prev, lcp: lcp.startTime }));
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            const firstInputEntry = entry as any;
            if (firstInputEntry.processingStart && firstInputEntry.startTime) {
              const fid =
                firstInputEntry.processingStart - firstInputEntry.startTime;
              setMetrics(prev => ({ ...prev, fid }));
            }
          });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        }).observe({ entryTypes: ['layout-shift'] });

        // Time to First Byte
        const navigationEntry = performance.getEntriesByType(
          'navigation',
        )[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          setMetrics(prev => ({
            ...prev,
            ttfb: navigationEntry.responseStart - navigationEntry.requestStart,
          }));
        }
      }
    };

    measureWebVitals();

    // Estimate bundle size (simplified)
    const estimateBundleSize = () => {
      if (typeof document !== 'undefined') {
        const scripts = document.querySelectorAll('script[src]');
        let totalSize = 0;
        scripts.forEach(script => {
          const src = script.getAttribute('src');
          if (src && src.includes('_next')) {
            // Rough estimation - in real app you'd get actual sizes
            totalSize += 100; // KB
          }
        });
        setMetrics(prev => ({ ...prev, bundleSize: totalSize }));
      }
    };

    // Delay bundle size estimation to allow scripts to load
    setTimeout(estimateBundleSize, 1000);
  }, []);

  const webVitals: WebVitals[] = [
    {
      name: 'FCP',
      value: metrics.fcp || 0,
      rating: getRating(metrics.fcp || 0, 1800, 3000),
      threshold: { good: 1800, poor: 3000 },
    },
    {
      name: 'LCP',
      value: metrics.lcp || 0,
      rating: getRating(metrics.lcp || 0, 2500, 4000),
      threshold: { good: 2500, poor: 4000 },
    },
    {
      name: 'FID',
      value: metrics.fid || 0,
      rating: getRating(metrics.fid || 0, 100, 300),
      threshold: { good: 100, poor: 300 },
    },
    {
      name: 'CLS',
      value: metrics.cls || 0,
      rating: getRating(metrics.cls || 0, 0.1, 0.25),
      threshold: { good: 0.1, poor: 0.25 },
    },
    {
      name: 'TTFB',
      value: metrics.ttfb || 0,
      rating: getRating(metrics.ttfb || 0, 800, 1800),
      threshold: { good: 800, poor: 1800 },
    },
  ];

  const overallScore = webVitals.reduce((score, vital) => {
    if (vital.rating === 'good') return score + 20;
    if (vital.rating === 'needs-improvement') return score + 10;
    return score;
  }, 0);

  const overallRating =
    overallScore >= 80
      ? 'good'
      : overallScore >= 60
        ? 'needs-improvement'
        : 'poor';

  if (!isVisible) return null;

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <AnimatePresence>
        {showDetails ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className='bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-6 w-80'
          >
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-slate-900 dark:text-white'>
                Performance Monitor
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className='text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Overall Score */}
            <div
              className={cn('p-4 rounded-lg mb-4', getRatingBg(overallRating))}
            >
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                  Overall Score
                </span>
                <span
                  className={cn(
                    'text-2xl font-bold',
                    getRatingColor(overallRating),
                  )}
                >
                  {overallScore}/100
                </span>
              </div>
            </div>

            {/* Web Vitals */}
            <div className='space-y-3 mb-4'>
              <h4 className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                Web Vitals
              </h4>
              {webVitals.map(vital => (
                <div
                  key={vital.name}
                  className='flex items-center justify-between'
                >
                  <span className='text-sm text-slate-600 dark:text-slate-400'>
                    {vital.name}
                  </span>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        getRatingColor(vital.rating),
                      )}
                    >
                      {vital.value.toFixed(1)}
                      {vital.name === 'CLS' ? '' : 'ms'}
                    </span>
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full',
                        getRatingColor(vital.rating).replace('text-', 'bg-'),
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Metrics */}
            <div className='space-y-3'>
              <h4 className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                Additional Metrics
              </h4>
              {metrics.loadTime && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-slate-600 dark:text-slate-400'>
                    Load Time
                  </span>
                  <span className='text-sm font-medium text-slate-900 dark:text-white'>
                    {metrics.loadTime.toFixed(0)}ms
                  </span>
                </div>
              )}
              {metrics.bundleSize && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-slate-600 dark:text-slate-400'>
                    Bundle Size
                  </span>
                  <span className='text-sm font-medium text-slate-900 dark:text-white'>
                    ~{metrics.bundleSize}KB
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setShowDetails(true)}
            className={cn(
              'p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700',
              'bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow',
              'flex items-center justify-center',
            )}
            title='Performance Monitor'
          >
            <div className='relative'>
              <svg
                className='w-6 h-6 text-slate-600 dark:text-slate-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
              <div
                className={cn(
                  'absolute -top-1 -right-1 w-3 h-3 rounded-full',
                  getRatingColor(overallRating).replace('text-', 'bg-'),
                )}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// Performance budget alert component
export function PerformanceBudgetAlert({
  budget,
  current,
}: {
  budget: number;
  current: number;
}) {
  const percentage = (current / budget) * 100;
  const isOverBudget = percentage > 100;

  if (!isOverBudget) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='fixed top-4 right-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-sm'
    >
      <div className='flex items-start space-x-3'>
        <div className='flex-shrink-0'>
          <svg
            className='w-5 h-5 text-red-600 dark:text-red-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        </div>
        <div>
          <h3 className='text-sm font-medium text-red-800 dark:text-red-200'>
            Performance Budget Exceeded
          </h3>
          <p className='text-sm text-red-700 dark:text-red-300 mt-1'>
            Current: {current}ms | Budget: {budget}ms ({percentage.toFixed(1)}%)
          </p>
        </div>
      </div>
    </motion.div>
  );
}
