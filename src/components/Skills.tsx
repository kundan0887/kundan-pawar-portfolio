'use client';

import { motion } from 'framer-motion';
import { Section, Card } from '@/components/ui';
import { detailedSkills, Skill as SkillType } from '@/lib/data';

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1,
        delay: 0.5,
      },
    }),
  };

  const counterVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (_years: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
      },
    }),
  };

  const getExperienceLevel = (_years: number): string => {
    if (_years >= 5) return 'Expert';
    if (_years >= 3) return 'Advanced';
    if (_years >= 1) return 'Intermediate';
    return 'Beginner';
  };

  const _getExperienceLevel = getExperienceLevel;

  return (
    <Section id='skills'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='text-center mb-16'
      >
        <h2 className='text-3xl font-bold text-center text-slate-900 dark:text-white mb-8'>
          Skills & Expertise
        </h2>
        <p className='text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
          My technical skills and proficiency levels across various technologies
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
      >
        {detailedSkills.map((skill: SkillType) => (
          <motion.div key={skill.name} variants={itemVariants}>
            <Card variant='elevated' className='p-6'>
              {/* Skill Header */}
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold text-slate-900 dark:text-white'>
                  {skill.name}
                </h3>
                <motion.div
                  custom={skill.years}
                  variants={counterVariants}
                  className='text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full'
                >
                  {skill.years} years
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className='mb-3'>
                <div className='flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-1'>
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className='w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden'>
                  <motion.div
                    custom={skill.level}
                    variants={progressVariants}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </div>

              {/* Category Badge */}
              <div className='flex justify-between items-center'>
                <span className='text-xs text-slate-500 dark:text-slate-400'>
                  {skill.category}
                </span>
                <div className='flex space-x-1'>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < Math.floor(skill.level / 20)
                          ? 'bg-blue-500'
                          : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='mt-16 text-center'
      >
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          <Card variant='elevated' className='text-center p-6'>
            <div className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
              {detailedSkills.length}
            </div>
            <div className='text-slate-600 dark:text-slate-300'>
              Technologies
            </div>
          </Card>
          <Card variant='elevated' className='text-center p-6'>
            <div className='text-3xl font-bold text-green-600 dark:text-green-400 mb-2'>
              {Math.max(...detailedSkills.map(s => s.years))}
            </div>
            <div className='text-slate-600 dark:text-slate-300'>
              Years Experience
            </div>
          </Card>
          <Card variant='elevated' className='text-center p-6'>
            <div className='text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2'>
              {Array.from(new Set(detailedSkills.map(s => s.category))).length}
            </div>
            <div className='text-slate-600 dark:text-slate-300'>Categories</div>
          </Card>
          <Card variant='elevated' className='text-center p-6'>
            <div className='text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2'>
              {Math.round(
                detailedSkills.reduce((acc, s) => acc + s.level, 0) /
                  detailedSkills.length,
              )}
              %
            </div>
            <div className='text-slate-600 dark:text-slate-300'>
              Avg Proficiency
            </div>
          </Card>
        </div>
      </motion.div>
    </Section>
  );
}
