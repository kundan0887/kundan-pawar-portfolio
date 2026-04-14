'use client';

import { motion } from 'framer-motion';
import { skills } from '@/lib/data';

const categoryEmoji: Record<string, string> = {
  'Frontend Development': '⚡',
  'Backend Development': '⚙️',
  Databases: '🗄️',
  'Cloud & DevOps': '☁️',
  'Testing & Quality': '🧪',
  'Architecture & Tools': '🏗️',
};

export default function Skills() {
  return (
    <section id='skills' className='py-24 bg-white dark:bg-slate-950'>
      <div className='container mx-auto px-8 max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-14'
        >
          <p className='text-sm font-mono text-indigo-600 dark:text-indigo-400 mb-2 tracking-wide'>
            04 — Skills
          </p>
          <h2 className='text-4xl font-bold text-slate-900 dark:text-white tracking-tight'>
            Tech Stack
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {skills.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className='p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors'
            >
              <div className='flex items-center gap-2.5 mb-4'>
                <span className='text-xl leading-none'>
                  {categoryEmoji[category.category] || '🔧'}
                </span>
                <h3 className='font-semibold text-slate-900 dark:text-white text-sm'>
                  {category.category}
                </h3>
              </div>
              <div className='flex flex-wrap gap-2'>
                {category.items.map(item => (
                  <span
                    key={item}
                    className='px-2.5 py-1 text-xs bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 font-medium hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-default'
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className='mt-10 p-6 bg-indigo-600 dark:bg-indigo-600/90 rounded-xl flex flex-wrap items-center justify-around gap-6 text-center'
        >
          <div>
            <div className='text-3xl font-bold text-white'>
              {skills.reduce((acc, cat) => acc + cat.items.length, 0)}+
            </div>
            <div className='text-indigo-200 text-sm mt-1'>Technologies</div>
          </div>
          <div className='w-px h-10 bg-indigo-500 hidden sm:block' />
          <div>
            <div className='text-3xl font-bold text-white'>12</div>
            <div className='text-indigo-200 text-sm mt-1'>Years Experience</div>
          </div>
          <div className='w-px h-10 bg-indigo-500 hidden sm:block' />
          <div>
            <div className='text-3xl font-bold text-white'>{skills.length}</div>
            <div className='text-indigo-200 text-sm mt-1'>Skill Categories</div>
          </div>
          <div className='w-px h-10 bg-indigo-500 hidden sm:block' />
          <div>
            <div className='text-3xl font-bold text-white'>95%+</div>
            <div className='text-indigo-200 text-sm mt-1'>Test Coverage</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
