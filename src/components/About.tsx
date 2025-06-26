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
} from 'lucide-react';
import { Button, Section, Card } from '@/components/ui';
import { personalInfo } from '@/lib/data';

interface AboutProps {
  resumeUrl: string;
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
    <Section id="about">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">
          About Me
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Get to know me better and understand my journey in software
          development
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {personalInfo.name}
            </h3>
            <p className="text-lg text-slate-700 dark:text-slate-200 mb-4">
              {personalInfo.title}
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Key Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-slate-600 dark:text-slate-300">
                {personalInfo.location}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {personalInfo.email}
              </a>
            </div>
            {personalInfo.phone && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-slate-600 dark:text-slate-300">
                  {personalInfo.phone}
                </span>
              </div>
            )}
          </div>

          <Button
            onClick={() => window.open(resumeUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </Button>
        </motion.div>

        {/* Right Side - Stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-6"
        >
          <Card variant="elevated" className="text-center p-6">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              12+
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              Years Experience
            </div>
          </Card>
          <Card variant="elevated" className="text-center p-6">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              50+
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              Projects Delivered
            </div>
          </Card>
          <Card variant="elevated" className="text-center p-6">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              24
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              Technologies
            </div>
          </Card>
          <Card variant="elevated" className="text-center p-6">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              15+
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              Team Members Led
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
