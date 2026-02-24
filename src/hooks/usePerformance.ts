'use client';

import { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToFirstByte: number;
}

interface PreloadOptions {
  href: string;
  as?: 'script' | 'style' | 'image' | 'font' | 'fetch';
  type?: string;
  crossorigin?: string;
}

// Extended interface for first-input performance entry
interface FirstInputPerformanceEntry extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Preload resources
  const preloadResource = useCallback((options: PreloadOptions) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = options.href;

    if (options.as) link.as = options.as;
    if (options.type) link.type = options.type;
    if (options.crossorigin) link.crossOrigin = options.crossorigin;

    document.head.appendChild(link);
  }, []);

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    // Preload critical fonts
    preloadResource({
      href: '/fonts/inter-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    });

    // Preload critical images
    preloadResource({
      href: '/profile-placeholder.jpg',
      as: 'image',
    });

    // Preload critical CSS
    preloadResource({
      href: '/globals.css',
      as: 'style',
    });
  }, [preloadResource]);

  // Measure performance metrics
  const measurePerformance = useCallback(() => {
    if (typeof window === 'undefined') return;

    const navigationEntry = performance.getEntriesByType( 
      'navigation',
    )[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(
      entry => entry.name === 'first-contentful-paint',
    );
    const fpEntry = paintEntries.find(entry => entry.name === 'first-paint');

    const metrics: PerformanceMetrics = {
      loadTime:
        navigationEntry?.loadEventEnd - navigationEntry?.loadEventStart || 0,
      domContentLoaded:
        navigationEntry?.domContentLoadedEventEnd -
          navigationEntry?.domContentLoadedEventStart || 0,
      firstPaint: fpEntry?.startTime || 0,
      firstContentfulPaint: fcpEntry?.startTime || 0,
      largestContentfulPaint: 0,
      firstInputDelay: 0,
      cumulativeLayoutShift: 0,
      timeToFirstByte:
        navigationEntry?.responseStart - navigationEntry?.requestStart || 0,
    };

    // Measure LCP
    new PerformanceObserver(list => {
      const entries = list.getEntries();
      const lcp = entries[entries.length - 1];
      if (lcp) {
        setMetrics(prev =>
          prev ? { ...prev, largestContentfulPaint: lcp.startTime } : null,
        );
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Measure FID
    new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        const firstInputEntry = entry as FirstInputPerformanceEntry;
        if (firstInputEntry.processingStart && firstInputEntry.startTime) {
          const fid =
            firstInputEntry.processingStart - firstInputEntry.startTime;
          setMetrics(prev => (prev ? { ...prev, firstInputDelay: fid } : null));
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // Measure CLS
    let clsValue = 0;
    new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          setMetrics(prev =>
            prev ? { ...prev, cumulativeLayoutShift: clsValue } : null,
          );
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });

    setMetrics(metrics);
    setIsLoading(false);
  }, []);

  // Initialize performance monitoring
  useEffect(() => {
    preloadCriticalResources();
    measurePerformance();
  }, [preloadCriticalResources, measurePerformance]);

  // Lazy load images
  const lazyLoadImage = useCallback((img: HTMLImageElement, src: string) => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    observer.observe(img);
  }, []);

  // Prefetch resources
  const prefetchResource = useCallback((url: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }, []);

  // Monitor bundle size
  const getBundleSize = useCallback(() => {
    if (typeof window === 'undefined') return 0;

    const scripts = document.querySelectorAll('script[src]');
    let totalSize = 0;

    scripts.forEach(script => {
      const src = script.getAttribute('src');
      if (src && src.includes('_next')) {
        // Rough estimation
        totalSize += 100; // KB
      }
    });

    return totalSize;
  }, []);

  // Performance budget check
  const checkPerformanceBudget = useCallback(
    (budget: number) => {
      if (!metrics) return { isOverBudget: false, percentage: 0 };

      const currentLoadTime = metrics.loadTime;
      const percentage = (currentLoadTime / budget) * 100;
      const isOverBudget = percentage > 100;

      return { isOverBudget, percentage };
    },
    [metrics],
  );

  return {
    metrics,
    isLoading,
    preloadResource,
    preloadCriticalResources,
    lazyLoadImage,
    prefetchResource,
    getBundleSize,
    checkPerformanceBudget,
  };
}

// Hook for monitoring component performance
export function useComponentPerformance(componentName: string) {
  const [renderTime, setRenderTime] = useState<number>(0);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      setRenderTime(duration);
      setIsRendered(true);

      // Log performance in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);
      }
    };
  }, [componentName]);

  return { renderTime, isRendered };
}

// Hook for intersection observer with performance optimization
export function useIntersectionObserver(
  options: IntersectionObserverInit = {},
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsIntersecting(entry.isIntersecting);
            if (entry.isIntersecting && !hasIntersected) {
              setHasIntersected(true);
            }
          },
          {
            threshold: 0.1,
            rootMargin: '50px',
            ...options,
          },
        );

        observer.observe(node);
      }
    },
    [hasIntersected, options],
  );

  return { ref, isIntersecting, hasIntersected };
}

