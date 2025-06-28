'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Mail } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFoundContent() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='max-w-lg w-full text-center'
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', damping: 10 }}
          className='text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4'
        >
          404
        </motion.div>

        {/* Error Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='text-3xl font-bold text-slate-900 dark:text-white mb-4'
        >
          Page Not Found
        </motion.h1>

        <p className='text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto'>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Navigation Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='space-y-4'
        >
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/'>
              <Button className='flex items-center gap-2 w-full sm:w-auto'>
                <Home className='w-4 h-4' />
                Go to Homepage
              </Button>
            </Link>

            <Button
              variant='outline'
              onClick={() => window.history.back()}
              className='flex items-center gap-2 w-full sm:w-auto'
            >
              <ArrowLeft className='w-4 h-4' />
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className='mt-8 pt-8 border-t border-slate-200 dark:border-slate-700'>
            <h3 className='text-sm font-medium text-slate-700 dark:text-slate-300 mb-4'>
              Quick Navigation
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <Link
                href='/#about'
                className='flex items-center gap-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300'
              >
                <Search className='w-4 h-4' />
                About Me
              </Link>
              <Link
                href='/#contact'
                className='flex items-center gap-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300'
              >
                <Mail className='w-4 h-4' />
                Contact
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Background Decoration */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-20 left-20 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl' />
          <div className='absolute bottom-20 right-20 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl' />
        </div>
      </motion.div>
    </div>
  );
}
