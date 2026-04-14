'use client';

import { motion } from 'framer-motion';
import { Download, ArrowRight, MapPin } from 'lucide-react';
import { personalInfo } from '@/lib/data';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  resumeUrl: string;
}

const stats = [
  { value: '12+', label: 'Years in IT' },
  { value: '6+', label: 'Years Frontend' },
  { value: '10+', label: 'Devs Mentored' },
  { value: '95%+', label: 'Test Coverage' },
];

export default function Hero({ onScrollToSection, resumeUrl }: HeroProps) {
  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-slate-950'
    >
      {/* Dot grid background */}
      <div
        className='absolute inset-0 opacity-50 dark:opacity-20'
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Gradient fade top and bottom */}
      <div className='absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-slate-950 dark:via-transparent dark:to-slate-950' />

      {/* Subtle indigo glow top-right */}
      <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />

      <div className='relative z-10 w-full px-8 py-24'>
        <div className='grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto'>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.21, 1.11, 0.81, 0.99] }}
            className='order-2 lg:order-1'
          >
            <div className='flex items-center gap-2 mb-6'>
              <MapPin className='w-3.5 h-3.5 text-indigo-500' />
              <span className='text-sm text-slate-500 dark:text-slate-400'>
                {personalInfo.location}
              </span>
            </div>

            <h1 className='text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-white leading-[1.08] tracking-tight mb-5'>
              Hi, I&apos;m{' '}
              <span className='text-indigo-600 dark:text-indigo-400'>
                {personalInfo.name.split(' ')[0]}
              </span>
            </h1>

            <p className='text-xl lg:text-2xl font-medium text-slate-600 dark:text-slate-300 mb-5 leading-snug'>
              {personalInfo.title}
            </p>

            <p className='text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-lg'>
              {personalInfo.shortBio}
            </p>

            <div className='flex flex-wrap gap-3 mb-14'>
              <button
                onClick={() => onScrollToSection('contact')}
                className='inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm'
              >
                Get In Touch <ArrowRight className='w-4 h-4' />
              </button>
              <button
                onClick={() => window.open(resumeUrl, '_blank')}
                className='inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-lg font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm'
              >
                <Download className='w-4 h-4' />
                Resume
              </button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-4 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800'>
              {stats.map(stat => (
                <div key={stat.label}>
                  <div className='text-2xl font-bold text-slate-900 dark:text-white'>
                    {stat.value}
                  </div>
                  <div className='text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-tight'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className='order-1 lg:order-2 flex justify-center lg:justify-end'
          >
            <div className='relative'>
              {/* Decorative offset frame */}
              <div className='absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-indigo-500/25 -z-10' />
              <div className='absolute -bottom-8 -right-8 w-full h-full rounded-2xl border border-indigo-500/10 -z-20' />

              <div className='w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/80 dark:shadow-slate-900'>
                {personalInfo.avatarUrl ? (
                  <img
                    src={personalInfo.avatarUrl}
                    alt={`${personalInfo.name} — ${personalInfo.title}`}
                    className='w-full h-full object-cover'
                    loading='eager'
                  />
                ) : (
                  <div className='w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center'>
                    <span className='text-white font-bold text-6xl'>
                      {personalInfo.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
