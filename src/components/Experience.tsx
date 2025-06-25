'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface WorkExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

const experiences: WorkExperience[] = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    role: 'Senior Frontend Developer',
    duration: '2022 - Present',
    location: 'San Francisco, CA',
    description:
      'Leading frontend development for enterprise applications with focus on performance and user experience.',
    achievements: [
      'Led migration from Angular to React, improving performance by 40%',
      'Implemented micro-frontend architecture serving 2M+ users',
      'Mentored 5 junior developers and established coding standards',
      'Reduced bundle size by 60% through code splitting and optimization',
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'AWS', 'Docker', 'Jest'],
    metrics: [
      { label: 'Performance Improvement', value: '40%' },
      { label: 'Bundle Size Reduction', value: '60%' },
      { label: 'Users Served', value: '2M+' },
    ],
  },
  {
    id: '2',
    company: 'InnovateTech',
    role: 'Frontend Team Lead',
    duration: '2020 - 2022',
    location: 'New York, NY',
    description:
      'Managed a team of 8 developers while building scalable web applications for fintech clients.',
    achievements: [
      'Built real-time trading dashboard processing 10K+ transactions/sec',
      'Implemented CI/CD pipeline reducing deployment time by 70%',
      'Established design system used across 15+ applications',
      'Achieved 99.9% uptime for critical financial applications',
    ],
    technologies: [
      'Vue.js',
      'TypeScript',
      'Node.js',
      'MongoDB',
      'Redis',
      'WebSocket',
    ],
    metrics: [
      { label: 'Team Size', value: '8 Developers' },
      { label: 'Deployment Time', value: '70% Faster' },
      { label: 'Uptime', value: '99.9%' },
    ],
  },
  {
    id: '3',
    company: 'StartupHub',
    role: 'Full Stack Developer',
    duration: '2018 - 2020',
    location: 'Austin, TX',
    description:
      'Built and scaled web applications from MVP to production for various startup clients.',
    achievements: [
      'Developed 12+ MVP applications with 90% client satisfaction',
      'Implemented automated testing achieving 95% code coverage',
      'Optimized database queries reducing load times by 50%',
      'Built reusable component library used across 8 projects',
    ],
    technologies: [
      'React',
      'Node.js',
      'PostgreSQL',
      'GraphQL',
      'Docker',
      'AWS',
    ],
    metrics: [
      { label: 'Projects Delivered', value: '12+' },
      { label: 'Code Coverage', value: '95%' },
      { label: 'Load Time Improvement', value: '50%' },
    ],
  },
  {
    id: '4',
    company: 'DigitalAgency',
    role: 'Frontend Developer',
    duration: '2016 - 2018',
    location: 'Chicago, IL',
    description:
      'Created responsive web applications and e-commerce solutions for diverse client portfolio.',
    achievements: [
      'Built 20+ responsive websites with 100% mobile compatibility',
      'Implemented PWA features increasing user engagement by 35%',
      'Optimized SEO resulting in 200% increase in organic traffic',
      'Reduced page load times by 45% through image optimization',
    ],
    technologies: ['JavaScript', 'React', 'CSS3', 'HTML5', 'Webpack', 'Git'],
    metrics: [
      { label: 'Websites Built', value: '20+' },
      { label: 'User Engagement', value: '35% Increase' },
      { label: 'Organic Traffic', value: '200% Increase' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  hover: {
    y: -8,
    scale: 1.02,
  },
};

export default function Experience() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">
            Professional Experience
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A journey through my career milestones, achievements, and the
            technologies that shaped my expertise
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>

          <div className="space-y-8 lg:space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:gap-8`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Content card */}
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}
                >
                  <Card className="p-6 lg:p-8 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div onClick={() => toggleCard(experience.id)}>
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                            {experience.role}
                          </h3>
                          <p className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-1">
                            {experience.company}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <span>{experience.duration}</span>
                            <span>•</span>
                            <span>{experience.location}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 sm:mt-0 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                        >
                          {expandedCard === experience.id
                            ? 'Show Less'
                            : 'Show More'}
                        </Button>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                        {experience.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {experience.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Metrics */}
                      {experience.metrics && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                          {experience.metrics.map((metric, idx) => (
                            <div
                              key={idx}
                              className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                            >
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {metric.value}
                              </div>
                              <div className="text-xs text-slate-600 dark:text-slate-300">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Expandable achievements */}
                      <AnimatePresence>
                        {expandedCard === experience.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                                Key Achievements
                              </h4>
                              <ul className="space-y-2">
                                {experience.achievements.map(
                                  (achievement, idx) => (
                                    <motion.li
                                      key={idx}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                                    >
                                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                      <span>{achievement}</span>
                                    </motion.li>
                                  )
                                )}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
