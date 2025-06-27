'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button, Section } from '@/components/ui';
import LoadingSpinner from './LoadingSpinner';
import { personalInfo } from '@/lib/data';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  resumeUrl: string;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <Section
      id='home'
      variant='hero'
      spacing='xl'
      className='min-h-screen flex items-center justify-center relative overflow-hidden'
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5 dark:opacity-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20' />
        <div className='absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full blur-3xl' />
        <div className='absolute bottom-20 right-20 w-40 h-40 bg-purple-600 rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-600 rounded-full blur-3xl' />
      </div>

      <div className='relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto px-4 sm:px-8'>
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center lg:text-left order-2 lg:order-1'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-4'
          >
            <span className='inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium'>
              Available for Remote, Hybrid & On-site roles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-white mb-4 lg:mb-6'
          >
            Hi, I'm{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400'>
              {personalInfo.name}
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-4 lg:mb-6'
          >
            {personalInfo.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-6 lg:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0'
          >
            {personalInfo.shortBio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'
          >
            <Button
              onClick={() => onScrollToSection('contact')}
              size='lg'
              className='text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            >
              Get In Touch
            </Button>
            <Button
              variant='outline'
              size='lg'
              onClick={() => window.open(personalInfo.resumeUrl, '_blank')}
              className='text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 hover:bg-slate-50 dark:hover:bg-slate-800'
            >
              <Download className='w-4 h-4 sm:w-5 sm:h-5 mr-2' />
              Download Resume
            </Button>
          </motion.div>

          {/* Tech Stack Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className='mt-6 lg:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4'
          >
            <span className='text-sm text-slate-500 dark:text-slate-400'>
              Tech Stack:
            </span>
            <div className='flex flex-wrap justify-center lg:justify-start gap-2'>
              {['React.js', 'TypeScript', '.NET Core', 'AWS'].map(
                (tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className='px-2 sm:px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs sm:text-sm font-medium'
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='flex justify-center order-1 lg:order-2 mb-8 lg:mb-0'
        >
          <div className='relative'>
            {/* Profile Image with Progressive Loading */}
            <div className='relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96'>
              {/* Background gradient */}
              <div className='absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-full opacity-20 blur-xl' />

              {/* Main circle container */}
              <div className='relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800'>
                {/* Profile Image */}
                {personalInfo.avatarUrl ? (
                  <img
                    src={personalInfo.avatarUrl}
                    alt={`${personalInfo.name} - ${personalInfo.title}`}
                    className='w-full h-full object-cover'
                    loading='eager'
                  />
                ) : (
                  /* Fallback to initials if no image */
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-center'>
                      <div className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg'>
                        <span className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white'>
                          {personalInfo.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </span>
                      </div>
                      <p className='text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-slate-700 dark:text-slate-300'>
                        {personalInfo.name}
                      </p>
                      <p className='text-xs sm:text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1'>
                        {personalInfo.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Tech Cards - Hidden on mobile, visible on larger screens */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className='hidden md:block absolute -top-4 -left-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 border border-slate-200 dark:border-slate-700'
            >
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center'>
                  <span className='text-blue-600 dark:text-blue-400 font-bold text-sm'>
                    R
                  </span>
                </div>
                <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                  React.js
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className='hidden md:block absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 border border-slate-200 dark:border-slate-700'
            >
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center'>
                  <span className='text-purple-600 dark:text-purple-400 font-bold text-sm'>
                    T
                  </span>
                </div>
                <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                  TypeScript
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, -3, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
              className='hidden lg:block absolute top-1/2 -right-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 border border-slate-200 dark:border-slate-700'
            >
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center'>
                  <span className='text-green-600 dark:text-green-400 font-bold text-sm'>
                    A
                  </span>
                </div>
                <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                  AWS
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 3,
              }}
              className='hidden lg:block absolute top-1/2 -left-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 border border-slate-200 dark:border-slate-700'
            >
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded flex items-center justify-center'>
                  <span className='text-orange-600 dark:text-orange-400 font-bold text-sm'>
                    N
                  </span>
                </div>
                <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                  .NET
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
