// Analytics and Performance Monitoring
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
}

// Type declarations for global objects
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    Sentry: {
      captureException: (error: Error, context?: any) => void;
    };
  }
}

class Analytics {
  private isProduction = process.env.NODE_ENV === 'production';
  private isClient = typeof window !== 'undefined';

  // Google Analytics
  trackPageView(url: string) {
    if (!this.isClient || !this.isProduction) return;

    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        page_path: url,
      });
    }
  }

  trackEvent(event: AnalyticsEvent) {
    if (!this.isClient || !this.isProduction) return;

    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
  }

  // Performance Monitoring
  trackPerformance(metric: PerformanceMetric) {
    if (!this.isClient) return;

    // Send to analytics
    this.trackEvent({
      action: 'performance',
      category: 'metrics',
      label: metric.name,
      value: Math.round(metric.value),
    });

    // Log to console in development
    if (!this.isProduction) {
      console.log(
        `Performance: ${metric.name} = ${metric.value}${metric.unit}`,
      );
    }
  }

  // Error Tracking
  trackError(error: Error, context?: Record<string, any>) {
    if (!this.isClient) return;

    this.trackEvent({
      action: 'error',
      category: 'errors',
      label: error.message,
    });

    // Log to console in development
    if (!this.isProduction) {
      console.error('Error tracked:', error, context);
    }

    // Send to error monitoring service in production
    if (this.isProduction && typeof window.Sentry !== 'undefined') {
      window.Sentry.captureException(error, {
        contexts: { additional: context },
      });
    }
  }

  // User Interaction Tracking
  trackNavigation(section: string) {
    this.trackEvent({
      action: 'navigate',
      category: 'navigation',
      label: section,
    });
  }

  trackContact(method: string) {
    this.trackEvent({
      action: 'contact',
      category: 'engagement',
      label: method,
    });
  }

  trackDownload(type: string) {
    this.trackEvent({
      action: 'download',
      category: 'engagement',
      label: type,
    });
  }

  // Performance Metrics Collection
  collectWebVitals() {
    if (!this.isClient) return;

    // Core Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            this.trackPerformance({
              name: 'LCP',
              value: entry.startTime,
              unit: 'ms',
            });
          } else if (entry.entryType === 'first-input') {
            const firstInputEntry = entry as any;
            this.trackPerformance({
              name: 'FID',
              value:
                firstInputEntry.processingStart - firstInputEntry.startTime,
              unit: 'ms',
            });
          } else if (entry.entryType === 'layout-shift') {
            this.trackPerformance({
              name: 'CLS',
              value: (entry as any).value,
              unit: '',
            });
          }
        }
      });

      observer.observe({
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
      });
    }
  }

  // Initialize analytics
  init() {
    if (!this.isClient) return;

    // Track initial page view
    this.trackPageView(window.location.pathname);

    // Start collecting performance metrics
    this.collectWebVitals();

    // Track navigation changes
    if ('history' in window) {
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      history.pushState = function (...args) {
        originalPushState.apply(history, args);
        analytics.trackPageView(window.location.pathname);
      };

      history.replaceState = function (...args) {
        originalReplaceState.apply(history, args);
        analytics.trackPageView(window.location.pathname);
      };
    }
  }
}

// Global analytics instance
export const analytics = new Analytics();

// Initialize on client side
if (typeof window !== 'undefined') {
  analytics.init();
}
