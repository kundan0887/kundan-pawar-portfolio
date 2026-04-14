'use client';

import { motion } from 'framer-motion';
import { experience } from '@/lib/data';

export default function Experience() {
  return (
    <section id='experience' className='py-24 bg-white dark:bg-slate-950'>
      <div className='container mx-auto px-8 max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-14'
        >
          <p className='text-sm font-mono text-indigo-600 dark:text-indigo-400 mb-2 tracking-wide'>
            02 — Experience
          </p>
          <h2 className='text-4xl font-bold text-slate-900 dark:text-white tracking-tight'>
            Work History
          </h2>
        </motion.div>

        <div className='relative'>
          {/* Vertical timeline line */}
          <div className='absolute left-[5px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-800' />

          <div className='space-y-14'>
            {experience.map((job, index) => (
              <motion.div
                key={`${job.company}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className='pl-10 relative'
              >
                {/* Timeline dot */}
                <div className='absolute left-0 top-[7px] w-[11px] h-[11px] rounded-full bg-indigo-600 dark:bg-indigo-500 ring-4 ring-white dark:ring-slate-950' />

                {/* Header */}
                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 mb-3'>
                  <div>
                    <h3 className='text-xl font-bold text-slate-900 dark:text-white leading-tight'>
                      {job.role}
                    </h3>
                    <p className='text-indigo-600 dark:text-indigo-400 font-medium mt-0.5'>
                      {job.company}
                    </p>
                  </div>
                  <div className='flex flex-col sm:items-end gap-0.5 flex-shrink-0'>
                    <span className='text-sm text-slate-500 dark:text-slate-400 font-mono'>
                      {job.duration}
                    </span>
                    <span className='text-xs text-slate-400 dark:text-slate-500'>
                      {job.location}
                    </span>
                  </div>
                </div>

                <p className='text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4'>
                  {job.description}
                </p>

                {/* Achievements */}
                {job.achievements.length > 0 && (
                  <ul className='space-y-2 mb-5'>
                    {job.achievements.slice(0, 5).map((achievement, idx) => (
                      <li
                        key={idx}
                        className='flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300'
                      >
                        <span className='text-indigo-500 mt-0.5 flex-shrink-0 font-bold'>
                          ▸
                        </span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Metrics */}
                {job.metrics && job.metrics.length > 0 && (
                  <div className='flex flex-wrap gap-2.5 mb-5'>
                    {job.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className='inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-100 dark:border-indigo-900/50'
                      >
                        <span className='text-base font-bold text-indigo-600 dark:text-indigo-400'>
                          {metric.value}
                        </span>
                        <span className='text-xs text-slate-500 dark:text-slate-400'>
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech tags */}
                <div className='flex flex-wrap gap-1.5'>
                  {job.technologies.map(tech => (
                    <span
                      key={tech}
                      className='px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700 font-medium'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
