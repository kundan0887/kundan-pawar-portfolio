'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/lib/data';

const categoryBadgeStyles: Record<string, string> = {
  Enterprise:
    'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50',
  'Web Application':
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50',
  'Legacy Modernization':
    'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-100 dark:border-amber-900/50',
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    ...Array.from(new Set(projects.map(p => p.category))),
  ];

  const filtered =
    selectedCategory === 'all'
      ? projects
      : projects.filter(p => p.category === selectedCategory);

  return (
    <section id='projects' className='py-24 bg-slate-50 dark:bg-slate-900'>
      <div className='container mx-auto px-8 max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-12'
        >
          <p className='text-sm font-mono text-indigo-600 dark:text-indigo-400 mb-2 tracking-wide'>
            03 — Projects
          </p>
          <h2 className='text-4xl font-bold text-slate-900 dark:text-white tracking-tight'>
            Featured Work
          </h2>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className='flex flex-wrap gap-2 mb-10'
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-950'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <AnimatePresence mode='popLayout'>
            {filtered.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <div className='h-full flex flex-col bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group'>
                  {/* Indigo top accent line */}
                  <div className='h-[3px] bg-indigo-600 dark:bg-indigo-500' />

                  <div className='p-6 flex flex-col flex-1'>
                    {/* Title + Featured badge */}
                    <div className='flex items-start justify-between gap-3 mb-3'>
                      <h3 className='font-bold text-slate-900 dark:text-white leading-snug text-sm'>
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className='flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full border border-amber-100 dark:border-amber-900/50'>
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Category badge */}
                    <span
                      className={`self-start text-xs font-medium px-2.5 py-1 rounded-full border mb-4 ${
                        categoryBadgeStyles[project.category] ||
                        'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      {project.category}
                    </span>

                    {/* Description */}
                    <p className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-5'>
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className='flex flex-wrap gap-1.5 mb-4'>
                      {project.technologies.slice(0, 5).map(tech => (
                        <span
                          key={tech}
                          className='px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-700/70 text-slate-600 dark:text-slate-400 rounded-md border border-slate-200 dark:border-slate-600 font-medium'
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className='px-2 py-0.5 text-xs text-slate-400 dark:text-slate-500'>
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    {(project.githubUrl !== '#' ||
                      (project.liveUrl && project.liveUrl !== '#')) && (
                      <div className='flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/60'>
                        {project.githubUrl && project.githubUrl !== '#' && (
                          <a
                            href={project.githubUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium'
                          >
                            <Github className='w-3.5 h-3.5' />
                            Code
                          </a>
                        )}
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <a
                            href={project.liveUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium'
                          >
                            <ExternalLink className='w-3.5 h-3.5' />
                            Live Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
