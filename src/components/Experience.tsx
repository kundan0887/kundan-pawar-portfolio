'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Section, Card, Badge } from '@/components/ui';
import { experiences, Experience as ExperienceType } from '@/lib/data';

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <Section id='experience'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='text-center mb-16'
      >
        <h2 className='text-3xl font-bold text-center text-slate-900 dark:text-white mb-8'>
          Work Experience
        </h2>
        <p className='text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
          My professional journey in software development
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className='relative'
      >
        {/* Timeline Line */}
        <div className='absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-600 transform md:-translate-x-1/2'></div>

        <div className='space-y-12'>
          {experiences.map((job: ExperienceType, index: number) => (
            <motion.div
              key={`${job.company}-${job.role}`}
              variants={itemVariants}
              className={`relative flex items-start ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className='absolute left-4 md:left-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-slate-800 transform md:-translate-x-1/2 z-10'></div>

              {/* Content Card */}
              <div
                className={`ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}
              >
                <Card variant='elevated' className='p-6'>
                  {/* Header */}
                  <div className='mb-4'>
                    <h3 className='text-xl font-bold text-slate-900 dark:text-white mb-2'>
                      {job.role}
                    </h3>
                    <div className='flex items-center gap-4 text-slate-600 dark:text-slate-300 text-sm mb-3'>
                      <div className='flex items-center gap-1'>
                        <MapPin className='w-4 h-4' />
                        <span>{job.company}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        <span>{job.duration}</span>
                      </div>
                    </div>
                    {job.location && (
                      <p className='text-slate-500 dark:text-slate-400 text-sm'>
                        📍 {job.location}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className='text-slate-600 dark:text-slate-300 mb-4 leading-relaxed'>
                    {job.description}
                  </p>

                  {/* Achievements */}
                  {job.achievements && job.achievements.length > 0 && (
                    <div className='mb-4'>
                      <h4 className='font-semibold text-slate-900 dark:text-white mb-2'>
                        Key Achievements:
                      </h4>
                      <ul className='space-y-1'>
                        {job.achievements.map(
                          (achievement: string, idx: number) => (
                            <li
                              key={idx}
                              className='text-slate-600 dark:text-slate-300 text-sm flex items-start gap-2'
                            >
                              <span className='text-blue-600 dark:text-blue-400 mt-1'>
                                •
                              </span>
                              {achievement}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {job.technologies && job.technologies.length > 0 && (
                    <div className='mb-4'>
                      <h4 className='font-semibold text-slate-900 dark:text-white mb-2'>
                        Technologies:
                      </h4>
                      <div className='flex flex-wrap gap-2'>
                        {job.technologies.map((tech: string, idx: number) => (
                          <Badge key={idx} variant='primary' size='sm'>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metrics */}
                  {job.metrics && job.metrics.length > 0 && (
                    <div>
                      <h4 className='font-semibold text-slate-900 dark:text-white mb-2'>
                        Impact:
                      </h4>
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        {job.metrics.map((metric, idx: number) => (
                          <div
                            key={idx}
                            className='bg-slate-50 dark:bg-slate-700 p-3 rounded-lg'
                          >
                            <div className='text-lg font-bold text-blue-600 dark:text-blue-400'>
                              {metric.value}
                            </div>
                            <div className='text-xs text-slate-600 dark:text-slate-300'>
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
