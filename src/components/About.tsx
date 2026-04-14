'use client';

import { motion } from 'framer-motion';
import {
  Download,
  Code,
  Cloud,
  Users,
  Target,
  Award,
  Database,
  Globe,
  Zap,
  Shield,
  GitBranch,
  MapPin,
  Mail,
  Calendar,
  GraduationCap,
  Languages,
  Trophy,
  Star,
} from 'lucide-react';
import { Button, Section, Card } from '@/components/ui';
import {
  personalInfo,
  education,
  languages,
  keyAchievements,
  keyStrengths,
} from '@/lib/data';

interface AboutProps {
  resumeUrl: string;
}

export default function About({ resumeUrl }: AboutProps) {
  const _stats = [
    {
      icon: Award,
      value: '12+',
      label: 'Years IT Experience',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: Target,
      value: '6+',
      label: 'Years Frontend Dev',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: Users,
      value: '10+',
      label: 'Developers Mentored',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const techStack = [
    { name: 'React.js', icon: Code, color: 'text-blue-500' },
    { name: 'AWS', icon: Cloud, color: 'text-orange-500' },
    { name: 'Micro-Frontend', icon: GitBranch, color: 'text-green-500' },
    { name: '.NET Core', icon: Database, color: 'text-purple-500' },
    { name: 'TypeScript', icon: Globe, color: 'text-indigo-500' },
    { name: 'CI/CD', icon: Zap, color: 'text-yellow-500' },
    { name: 'Testing', icon: Shield, color: 'text-red-500' },
    { name: 'AEM Headless', icon: Target, color: 'text-teal-500' },
  ];

  const _containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const _statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <Section id='about'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='text-center mb-16'
      >
        <h2 className='text-3xl font-bold text-center text-slate-900 dark:text-white mb-8'>
          About Me
        </h2>
        <p className='text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
          Get to know me better and understand my journey in software
          development
        </p>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='space-y-8'
        >
          <div>
            <h3 className='text-2xl font-bold text-slate-900 dark:text-white mb-4'>
              {personalInfo.name}
            </h3>
            <p className='text-lg text-slate-700 dark:text-slate-200 mb-4'>
              {personalInfo.title}
            </p>
            <p className='text-slate-600 dark:text-slate-300 leading-relaxed'>
              {personalInfo.bio}
            </p>
          </div>

          {/* Key Information */}
          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <MapPin className='w-5 h-5 text-blue-600 dark:text-blue-400' />
              <span className='text-slate-600 dark:text-slate-300'>
                {personalInfo.location}
              </span>
            </div>
            <div className='flex items-center gap-3'>
              <Mail className='w-5 h-5 text-blue-600 dark:text-blue-400' />
              <a
                href={`mailto:${personalInfo.email}`}
                className='text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
              >
                {personalInfo.email}
              </a>
            </div>
            {personalInfo.phone && (
              <div className='flex items-center gap-3'>
                <Calendar className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                <span className='text-slate-600 dark:text-slate-300'>
                  {personalInfo.phone}
                </span>
              </div>
            )}
          </div>

          {/* Education */}
          <div className='space-y-3'>
            <h4 className='text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2'>
              <GraduationCap className='w-5 h-5 text-blue-600 dark:text-blue-400' />
              Education
            </h4>
            <div className='bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg'>
              <p className='font-medium text-slate-900 dark:text-white'>
                {education.degree}
              </p>
              <p className='text-slate-600 dark:text-slate-300'>
                {education.institution} • {education.year}
              </p>
            </div>
          </div>

          {/* Languages */}
          <div className='space-y-3'>
            <h4 className='text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2'>
              <Languages className='w-5 h-5 text-blue-600 dark:text-blue-400' />
              Languages
            </h4>
            <div className='flex flex-wrap gap-2'>
              {languages.map(lang => (
                <span
                  key={`${lang.name}-${lang.level}`}
                  className='px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm'
                >
                  {lang.name} ({lang.level})
                </span>
              ))}
            </div>
          </div>

          <Button
            onClick={() => window.open(resumeUrl, '_blank')}
            className='flex items-center gap-2'
          >
            <Download className='w-4 h-4' />
            Download Resume
          </Button>
        </motion.div>

        {/* Right Side - Stats and Additional Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='space-y-8'
        >
          {/* Stats */}
          <div className='grid grid-cols-2 gap-6'>
            <Card variant='elevated' className='text-center p-6'>
              <div className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
                12+
              </div>
              <div className='text-slate-600 dark:text-slate-300'>
                Years IT Experience
              </div>
            </Card>
            <Card variant='elevated' className='text-center p-6'>
              <div className='text-3xl font-bold text-green-600 dark:text-green-400 mb-2'>
                6+
              </div>
              <div className='text-slate-600 dark:text-slate-300'>
                Years Frontend Dev
              </div>
            </Card>
            <Card variant='elevated' className='text-center p-6'>
              <div className='text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2'>
                10+
              </div>
              <div className='text-slate-600 dark:text-slate-300'>
                Developers Mentored
              </div>
            </Card>
            <Card variant='elevated' className='text-center p-6'>
              <div className='text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2'>
                95%+
              </div>
              <div className='text-slate-600 dark:text-slate-300'>
                Test Coverage
              </div>
            </Card>
          </div>

          {/* Key Strengths */}
          <div className='space-y-3'>
            <h4 className='text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2'>
              <Star className='w-5 h-5 text-blue-600 dark:text-blue-400' />
              Key Strengths
            </h4>
            <div className='grid grid-cols-2 gap-2'>
              {keyStrengths.map(strength => (
                <div
                  key={strength}
                  className='flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300'
                >
                  <div className='w-2 h-2 bg-blue-500 rounded-full' />
                  {strength}
                </div>
              ))}
            </div>
          </div>

          {/* Key Achievements */}
          <div className='space-y-3'>
            <h4 className='text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2'>
              <Trophy className='w-5 h-5 text-blue-600 dark:text-blue-400' />
              Key Achievements
            </h4>
            <div className='space-y-2'>
              {keyAchievements.slice(0, 4).map(achievement => (
                <div
                  key={achievement}
                  className='flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300'
                >
                  <div className='w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0' />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='mt-16'
      >
        <h3 className='text-2xl font-bold text-center text-slate-900 dark:text-white mb-8'>
          Technology Stack
        </h3>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {techStack.map(tech => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='text-center'
            >
              <Card
                variant='elevated'
                className='p-6 hover:shadow-lg transition-shadow'
              >
                <tech.icon className={`w-8 h-8 mx-auto mb-3 ${tech.color}`} />
                <h4 className='font-semibold text-slate-900 dark:text-white'>
                  {tech.name}
                </h4>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
