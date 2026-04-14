'use client';

import { motion } from 'framer-motion';
import { Download, MapPin, Mail, GraduationCap } from 'lucide-react';
import {
  personalInfo,
  education,
  languages,
  keyStrengths,
  keyAchievements,
} from '@/lib/data';

interface AboutProps {
  resumeUrl: string;
}

const stats = [
  {
    value: '12+',
    label: 'Years in IT',
    color: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    value: '6+',
    label: 'Years Frontend',
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    value: '10+',
    label: 'Devs Mentored',
    color: 'text-violet-600 dark:text-violet-400',
  },
  {
    value: '95%+',
    label: 'Test Coverage',
    color: 'text-amber-600 dark:text-amber-400',
  },
];

export default function About({ resumeUrl }: AboutProps) {
  return (
    <section id='about' className='py-24 bg-slate-50 dark:bg-slate-900'>
      <div className='container mx-auto px-8 max-w-6xl'>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-14'
        >
          <p className='text-sm font-mono text-indigo-600 dark:text-indigo-400 mb-2 tracking-wide'>
            01 — About
          </p>
          <h2 className='text-4xl font-bold text-slate-900 dark:text-white tracking-tight'>
            Who I am
          </h2>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className='grid grid-cols-2 md:grid-cols-4 gap-0 mb-14 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden'
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`p-8 text-center ${
                index < stats.length - 1
                  ? 'border-r border-slate-200 dark:border-slate-700'
                  : ''
              }`}
            >
              <div className={`text-4xl font-bold mb-1.5 ${stat.color}`}>
                {stat.value}
              </div>
              <div className='text-sm text-slate-500 dark:text-slate-400'>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-14'>
          {/* Left — Bio + Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='space-y-8'
          >
            <p className='text-slate-600 dark:text-slate-300 leading-relaxed text-lg'>
              {personalInfo.bio}
            </p>

            <div className='space-y-3.5'>
              <div className='flex items-center gap-3 text-slate-600 dark:text-slate-300'>
                <MapPin className='w-4 h-4 text-indigo-500 flex-shrink-0' />
                <span className='text-sm'>{personalInfo.location}</span>
              </div>
              <div className='flex items-center gap-3 text-slate-600 dark:text-slate-300'>
                <Mail className='w-4 h-4 text-indigo-500 flex-shrink-0' />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className='text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className='flex items-start gap-3 text-slate-600 dark:text-slate-300'>
                <GraduationCap className='w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5' />
                <span className='text-sm'>
                  {education.degree}, {education.institution} ({education.year})
                </span>
              </div>
            </div>

            <div>
              <h4 className='text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-widest mb-3'>
                Languages
              </h4>
              <div className='flex flex-wrap gap-2'>
                {languages.map(lang => (
                  <span
                    key={lang.name}
                    className='px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs border border-slate-200 dark:border-slate-700'
                  >
                    {lang.name}{' '}
                    <span className='text-slate-400 dark:text-slate-500'>
                      · {lang.level}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => window.open(resumeUrl, '_blank')}
              className='inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm'
            >
              <Download className='w-4 h-4' />
              Download Resume
            </button>
          </motion.div>

          {/* Right — Strengths + Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='space-y-8'
          >
            <div>
              <h4 className='text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-widest mb-4'>
                Key Strengths
              </h4>
              <div className='flex flex-wrap gap-2'>
                {keyStrengths.map(strength => (
                  <span
                    key={strength}
                    className='px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm border border-indigo-100 dark:border-indigo-900/50'
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className='text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-widest mb-4'>
                Key Achievements
              </h4>
              <ul className='space-y-3'>
                {keyAchievements.map(achievement => (
                  <li
                    key={achievement}
                    className='flex items-start gap-3 text-slate-600 dark:text-slate-300'
                  >
                    <span className='w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0' />
                    <span className='text-sm leading-relaxed'>
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
