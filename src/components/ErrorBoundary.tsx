'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // You can integrate with services like Sentry, LogRocket, etc.
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
    }

    this.setState({ error, errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 text-center'
          >
            <motion.div

              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className='w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4'
            >
              <AlertTriangle className='w-8 h-8 text-red-600 dark:text-red-400' />
            </motion.div> 

            <h1 className='text-2xl font-bold text-slate-900 dark:text-white mb-2'>
              Oops! Something went wrong
            </h1>

            <p className='text-slate-600 dark:text-slate-400 mb-6'>
              We encountered an unexpected error. Please try refreshing the page
              or go back to the home page.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='mb-6 text-left'>
                <summary className='cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 mb-2'>
                  Error Details (Development)
                </summary>
                <div className='bg-slate-100 dark:bg-slate-700 rounded p-3 text-xs font-mono text-slate-800 dark:text-slate-200 overflow-auto'>
                  <div className='mb-2'>
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className='whitespace-pre-wrap mt-1'>
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <Button
                onClick={this.handleRetry}
                className='flex items-center gap-2'
              >
                <RefreshCw className='w-4 h-4' />
                Try Again
              </Button>

              <Button
                variant='outline'
                onClick={this.handleGoHome}
                className='flex items-center gap-2'
              >
                <Home className='w-4 h-4' />
                Go Home
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  } 
}

// Hook for functional components
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Unhandled error:', event.error);
      setError(event.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      setError(new Error(event.reason));
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener(
        'unhandledrejection',
        handleUnhandledRejection,
      );
    };
  }, []);

  return error;
}

