'use client';

import { motion } from 'framer-motion';
import { Download, Eye, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  onScrollToSection?: (sectionId: string) => void;
  resumeUrl?: string;
}

export default function Hero({ onScrollToSection, resumeUrl }: HeroProps) {
  const handleScrollToSection = (sectionId: string) => {
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);
      }
    }
  };

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.2,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Side - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Greeting */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                Hi, I'm{' '}
                <span className="text-blue-600 dark:text-blue-400">
                  Kundan Pawar
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-700 dark:text-slate-200">
                Senior Frontend / Full Stack Developer
              </h2>
            </motion.div>

            {/* Experience and Value Proposition */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
                12+ years building scalable, tested applications
              </p>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                I specialize in creating high-performance web applications using
                modern technologies. From concept to deployment, I deliver
                robust solutions that drive business growth and provide
                exceptional user experiences.
              </p>
            </motion.div>

            {/* Key Highlights */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  12+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Years Experience
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  50+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Projects Delivered
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  15+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Technologies
                </div>
              </div>
            </motion.div>

            {/* Call-to-Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 sm:gap-4 pt-4"
            >
              {resumeUrl && (
                <Button
                  size="lg"
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 lg:px-8 py-3 text-sm sm:text-base lg:text-lg whitespace-nowrap min-w-0"
                  onClick={() => window.open(resumeUrl, '_blank')}
                >
                  <Download className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                  <span className="truncate">Download Resume</span>
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 lg:px-8 py-3 text-sm sm:text-base lg:text-lg whitespace-nowrap min-w-0"
                onClick={() => handleScrollToSection('projects')}
              >
                <Eye className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <span className="truncate">View Projects</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 lg:px-8 py-3 text-sm sm:text-base lg:text-lg whitespace-nowrap min-w-0"
                onClick={() => handleScrollToSection('contact')}
              >
                <Mail className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <span className="truncate">Contact Me</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Professional Headshot */}
          <motion.div
            variants={imageVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Professional Headshot Placeholder */}
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <div className="text-6xl md:text-8xl font-bold mb-4">KP</div>
                  <div className="text-lg md:text-xl font-medium opacity-90">
                    Professional Headshot
                  </div>
                  <div className="text-sm opacity-75 mt-2">(Placeholder)</div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-pink-400 rounded-full opacity-20 animate-pulse delay-500"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={scrollVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center mt-16"
        >
          <button
            onClick={() => handleScrollToSection('skills')}
            className="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
