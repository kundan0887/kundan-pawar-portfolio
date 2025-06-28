'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Hero section skeleton
export function HeroSkeleton() {
  return (
    <div className='min-h-screen flex items-center justify-center p-8'>
      <div className='max-w-4xl w-full'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left side - Content */}
          <div className='space-y-6'>
            <motion.div
              className='h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            />
            <motion.div
              className='h-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            />
            <motion.div
              className='h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            />
            <motion.div
              className='h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            />
            <div className='flex gap-4 pt-4'>
              <motion.div
                className='h-12 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              />
              <motion.div
                className='h-12 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              />
            </div>
          </div>

          {/* Right side - Profile */}
          <motion.div
            className='flex justify-center'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className='w-64 h-64 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse' />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// About section skeleton
export function AboutSkeleton() {
  return (
    <div className='py-16 md:py-20 px-8'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          className='h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        />

        <div className='grid md:grid-cols-2 gap-12'>
          <div className='space-y-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              />
            ))}
          </div>

          <div className='space-y-4'>
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Experience section skeleton
export function ExperienceSkeleton() {
  return (
    <div className='py-16 md:py-20 px-8'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          className='h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-12'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        />

        <div className='space-y-8'>
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              className='border-l-4 border-slate-200 dark:border-slate-700 pl-8'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.2 }}
            >
              <div className='space-y-3'>
                <div className='h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2' />
                <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/3' />
                <div className='space-y-2'>
                  <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                  <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-5/6' />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Projects section skeleton
export function ProjectsSkeleton() {
  return (
    <div className='py-16 md:py-20 px-8'>
      <div className='max-w-6xl mx-auto'>
        <motion.div
          className='h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-12'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        />

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className='bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className='h-48 bg-slate-200 dark:bg-slate-700 animate-pulse' />
              <div className='p-6 space-y-3'>
                <div className='h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4' />
                <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                <div className='flex gap-2 pt-2'>
                  <div className='h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                  <div className='h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Skills section skeleton
export function SkillsSkeleton() {
  return (
    <div className='py-16 md:py-20 px-8'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          className='h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-12'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        />

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className='bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className='space-y-4'>
                <div className='h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                <div className='space-y-2'>
                  {Array.from({ length: 3 }).map((_, skillIndex) => (
                    <div key={skillIndex} className='space-y-1'>
                      <div className='flex justify-between'>
                        <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/3' />
                        <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-12' />
                      </div>
                      <div className='h-2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Contact section skeleton
export function ContactSkeleton() {
  return (
    <div className='py-16 md:py-20 px-8'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          className='h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-12'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        />

        <div className='grid md:grid-cols-2 gap-12'>
          {/* Contact info */}
          <div className='space-y-6'>
            <motion.div
              className='h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            />
            <div className='space-y-4'>
              {Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  className='flex items-center space-x-4'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className='w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                  <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse flex-1' />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className='space-y-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                className='h-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              />
            ))}
            <motion.div
              className='h-12 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Generic section skeleton
export function SectionSkeleton({
  title = true,
  contentLines = 3,
  className,
}: {
  title?: boolean;
  contentLines?: number;
  className?: string;
}) {
  return (
    <div className={cn('py-16 md:py-20 px-8', className)}>
      <div className='max-w-4xl mx-auto'>
        {title && (
          <motion.div
            className='h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-12'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          />
        )}

        <div className='space-y-4'>
          {Array.from({ length: contentLines }).map((_, index) => (
            <motion.div
              key={index}
              className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
