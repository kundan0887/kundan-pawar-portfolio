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
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AboutProps {
  resumeUrl?: string;
}

export default function About({ resumeUrl }: AboutProps) {
  const stats = [
    {
      icon: Award,
      value: '12+',
      label: 'Years Experience',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: Target,
      value: '50+',
      label: 'Projects Completed',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: Users,
      value: '15+',
      label: 'Team Members Led',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const techStack = [
    { name: 'React', icon: Code, color: 'text-blue-500' },
    { name: 'AWS', icon: Cloud, color: 'text-orange-500' },
    { name: 'Micro-Frontend', icon: GitBranch, color: 'text-green-500' },
    { name: 'Database', icon: Database, color: 'text-purple-500' },
    { name: 'Web Services', icon: Globe, color: 'text-indigo-500' },
    { name: 'Performance', icon: Zap, color: 'text-yellow-500' },
    { name: 'Security', icon: Shield, color: 'text-red-500' },
    { name: 'Testing', icon: Target, color: 'text-teal-500' },
  ];

  const containerVariants = {
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

  const statsVariants = {
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
    <section id="about" className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-16"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full"></div>
          </motion.div>

          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Text Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Professional Summary */}
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed">
                  With over{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    12 years of experience
                  </span>{' '}
                  in software development, I've established myself as a Senior
                  Frontend Developer with deep expertise in modern web
                  technologies.
                </p>

                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed">
                  I specialize in{' '}
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    React ecosystems
                  </span>{' '}
                  and
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {' '}
                    AWS cloud services
                  </span>
                  , with particular focus on building scalable{' '}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    Micro-Frontend architectures
                  </span>
                  that enable teams to work independently while maintaining
                  cohesive user experiences.
                </p>

                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed">
                  My leadership experience includes driving{' '}
                  <span className="font-semibold text-teal-600 dark:text-teal-400">
                    test coverage improvements
                  </span>
                  from 60% to 85%, implementing comprehensive testing
                  strategies, and mentoring development teams to deliver
                  high-quality, maintainable code.
                </p>

                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed">
                  I believe in the power of{' '}
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    collaborative development
                  </span>
                  and have successfully led cross-functional teams, fostering
                  environments where innovation thrives and technical excellence
                  is the standard.
                </p>
              </div>

              {/* Tech Stack Overview */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  Tech Stack & Expertise
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      variants={statsVariants}
                      className="flex flex-col items-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <tech.icon className={`w-8 h-8 ${tech.color} mb-2`} />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 text-center">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Download Resume Button */}
              {resumeUrl && (
                <motion.div variants={itemVariants} className="pt-4">
                  <Button
                    size="lg"
                    className="flex items-center gap-2 px-8 py-3 text-lg"
                    onClick={() => window.open(resumeUrl, '_blank')}
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Right Column - Statistics & Image */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Key Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={statsVariants}
                    className={`${stat.bgColor} p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-200`}
                  >
                    <stat.icon
                      className={`w-8 h-8 ${stat.color} mx-auto mb-3`}
                    />
                    <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Professional Image Placeholder */}
              <motion.div variants={statsVariants} className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white">
                    <div className="text-6xl font-bold mb-4">KP</div>
                    <div className="text-xl font-medium opacity-90">
                      Professional Photo
                    </div>
                    <div className="text-sm opacity-75 mt-2">(Placeholder)</div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 -right-6 w-12 h-12 bg-pink-400 rounded-full opacity-20 animate-pulse delay-500"></div>
              </motion.div>

              {/* Additional Highlights */}
              <motion.div
                variants={statsVariants}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm"
              >
                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Key Achievements
                </h4>
                <ul className="space-y-3 text-slate-700 dark:text-slate-200">
                  <li className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Increased test coverage from 60% to 85%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Led development teams of 15+ members</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Improved application performance by 40%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Implemented security best practices</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
