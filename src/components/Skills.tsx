'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';

interface Skill {
  name: string;
  level: number; // 0-100
  years: number;
  icon?: string;
  color: string;
}

interface SkillCategory {
  name: string;
  description: string;
  skills: Skill[];
  icon: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend Development',
    description:
      'Modern web technologies and frameworks for building responsive user interfaces',
    icon: '🎨',
    skills: [
      {
        name: 'React',
        level: 95,
        years: 8,
        color: 'from-blue-500 to-cyan-500',
      },
      {
        name: 'TypeScript',
        level: 90,
        years: 6,
        color: 'from-blue-600 to-blue-700',
      },
      {
        name: 'JavaScript',
        level: 95,
        years: 12,
        color: 'from-yellow-400 to-yellow-600',
      },
      { name: 'Next.js', level: 88, years: 5, color: 'from-black to-gray-800' },
      {
        name: 'Tailwind CSS',
        level: 92,
        years: 4,
        color: 'from-cyan-400 to-blue-500',
      },
      {
        name: 'CSS3/SCSS',
        level: 90,
        years: 10,
        color: 'from-pink-500 to-purple-600',
      },
    ],
  },
  {
    name: 'Backend Development',
    description:
      'Server-side technologies and database management for scalable applications',
    icon: '⚙️',
    skills: [
      {
        name: 'Node.js',
        level: 88,
        years: 7,
        color: 'from-green-500 to-green-700',
      },
      {
        name: 'Express.js',
        level: 85,
        years: 6,
        color: 'from-gray-600 to-gray-800',
      },
      {
        name: 'REST APIs',
        level: 92,
        years: 8,
        color: 'from-purple-500 to-purple-700',
      },
      {
        name: 'GraphQL',
        level: 80,
        years: 4,
        color: 'from-pink-600 to-purple-600',
      },
      {
        name: 'MongoDB',
        level: 85,
        years: 6,
        color: 'from-green-600 to-green-800',
      },
      {
        name: 'PostgreSQL',
        level: 82,
        years: 5,
        color: 'from-blue-500 to-blue-700',
      },
    ],
  },
  {
    name: 'Cloud & DevOps',
    description: 'Cloud infrastructure, deployment, and development operations',
    icon: '☁️',
    skills: [
      {
        name: 'AWS',
        level: 85,
        years: 6,
        color: 'from-orange-500 to-orange-700',
      },
      {
        name: 'Docker',
        level: 80,
        years: 5,
        color: 'from-blue-500 to-blue-700',
      },
      {
        name: 'CI/CD',
        level: 88,
        years: 7,
        color: 'from-green-500 to-green-700',
      },
      {
        name: 'Kubernetes',
        level: 75,
        years: 4,
        color: 'from-blue-600 to-blue-800',
      },
      {
        name: 'Micro-Frontends',
        level: 85,
        years: 5,
        color: 'from-purple-500 to-purple-700',
      },
      {
        name: 'Serverless',
        level: 78,
        years: 4,
        color: 'from-red-500 to-red-700',
      },
    ],
  },
  {
    name: 'Testing & Quality',
    description:
      'Comprehensive testing strategies and quality assurance practices',
    icon: '🧪',
    skills: [
      {
        name: 'Unit Testing',
        level: 90,
        years: 8,
        color: 'from-green-500 to-green-700',
      },
      {
        name: 'Integration Testing',
        level: 85,
        years: 6,
        color: 'from-blue-500 to-blue-700',
      },
      {
        name: 'E2E Testing',
        level: 80,
        years: 5,
        color: 'from-purple-500 to-purple-700',
      },
      { name: 'Jest', level: 88, years: 6, color: 'from-red-500 to-red-700' },
      {
        name: 'Cypress',
        level: 82,
        years: 4,
        color: 'from-green-600 to-green-800',
      },
      {
        name: 'Performance Testing',
        level: 78,
        years: 4,
        color: 'from-orange-500 to-orange-700',
      },
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

const categoryVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  hover: {
    y: -5,
    scale: 1.02,
  },
};

const progressVariants = {
  hidden: { width: 0 },
  visible: (level: number) => ({
    width: `${level}%`,
  }),
};

const counterVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [counters, setCounters] = useState<{ [key: string]: number }>({});

  // Animate counters
  useEffect(() => {
    const timer = setTimeout(() => {
      skillCategories.forEach(category => {
        category.skills.forEach(skill => {
          setCounters(prev => ({
            ...prev,
            [`${skill.name}-years`]: 0,
          }));

          let current = 0;
          const target = skill.years;
          const increment = target / 50;

          const counterTimer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(counterTimer);
            }
            setCounters(prev => ({
              ...prev,
              [`${skill.name}-years`]: Math.floor(current),
            }));
          }, 20);
        });
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="skills"
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
            Skills & Technologies
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and years of
            experience across various technologies
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {skillCategories.map(category => (
            <motion.div
              key={category.name}
              variants={categoryVariants}
              whileHover="hover"
              onHoverStart={() => setSelectedCategory(category.name)}
              onHoverEnd={() => setSelectedCategory(null)}
              className="h-full"
            >
              <Card className="h-full p-6 lg:p-8 hover:shadow-xl transition-all duration-300">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{category.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map(skill => (
                    <motion.div
                      key={skill.name}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {skill.name}
                          </span>
                          <motion.span
                            variants={counterVariants}
                            className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full"
                          >
                            {counters[`${skill.name}-years`] || 0} years
                          </motion.span>
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          custom={skill.level}
                          variants={progressVariants}
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-sm`}
                        />

                        {/* Hover Effect */}
                        <AnimatePresence>
                          {selectedCategory === category.name && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-white/20 rounded-full"
                            />
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Skill Level Indicator */}
                      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Advanced</span>
                        <span>Expert</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Category Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700"
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {category.skills.length}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        Technologies
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {Math.round(
                          category.skills.reduce(
                            (acc, skill) => acc + skill.level,
                            0
                          ) / category.skills.length
                        )}
                        %
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        Avg. Proficiency
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {Math.round(
                          category.skills.reduce(
                            (acc, skill) => acc + skill.years,
                            0
                          ) / category.skills.length
                        )}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        Avg. Years
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {skillCategories.reduce(
                  (acc, cat) => acc + cat.skills.length,
                  0
                )}
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Total Skills
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                12+
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                4
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Categories
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                85%
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Avg. Proficiency
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
