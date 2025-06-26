'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button, Section } from '@/components/ui';
import { personalInfo } from '@/lib/data';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  resumeUrl: string;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <Section
      id="home"
      variant="hero"
      spacing="xl"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
            Hi, I'm{' '}
            <span className="text-blue-600 dark:text-blue-400">
              {personalInfo.name}
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
            {personalInfo.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            {personalInfo.shortBio}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={() => onScrollToSection('contact')}
            size="lg"
            className="text-lg px-8 py-3"
          >
            Get In Touch
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open(personalInfo.resumeUrl, '_blank')}
            className="text-lg px-8 py-3"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
