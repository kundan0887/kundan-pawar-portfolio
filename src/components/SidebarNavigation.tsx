'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Code,
  Layers,
  MessageSquare,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
} from 'lucide-react';
import { personalInfo, socialLinks } from '@/lib/data';

interface SidebarNavigationProps {
  onNavigate: (sectionId: string) => void;
  currentSection: string;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'skills', label: 'Skills', icon: Layers },
  { id: 'contact', label: 'Contact', icon: MessageSquare },
];

export default function SidebarNavigation({
  onNavigate,
  currentSection,
}: SidebarNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className='fixed top-4 left-4 z-50 lg:hidden p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-white shadow-lg'
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Toggle navigation'
      >
        {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden'
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className='fixed left-0 top-0 h-full w-70 bg-slate-950 border-r border-slate-800 z-50 lg:hidden'
      >
        <SidebarContent
          currentSection={currentSection}
          onNavigate={handleNavigation}
        />
      </motion.aside>

      {/* Desktop Sidebar */}
      <aside className='hidden lg:block fixed left-0 top-0 h-full w-70 bg-slate-950 border-r border-slate-800 z-40'>
        <SidebarContent
          currentSection={currentSection}
          onNavigate={onNavigate}
        />
      </aside>
    </>
  );
}

function SidebarContent({
  currentSection,
  onNavigate,
}: {
  currentSection: string;
  onNavigate: (id: string) => void;
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (_) {}
  };

  return (
    <div className='flex flex-col h-full'>
      {/* Profile */}
      <div className='p-6 border-b border-slate-800'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-11 h-11 rounded-full overflow-hidden ring-2 ring-indigo-500/40 flex-shrink-0'>
            {personalInfo.avatarUrl ? (
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm'>
                {personalInfo.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </div>
            )}
          </div>
          <div className='min-w-0'>
            <p className='text-white font-semibold text-sm truncate leading-tight'>
              {personalInfo.name}
            </p>
            <p className='text-slate-400 text-xs truncate mt-0.5 leading-tight'>
              {personalInfo.title}
            </p>
          </div>
        </div>
        <div className='inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20'>
          <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0' />
          <span className='text-emerald-400 text-xs font-medium'>
            Open to opportunities
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 p-4 space-y-0.5'>
        {navigationItems.map(item => {
          const isActive = currentSection === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              aria-label={`Navigate to ${item.label}`}
            >
              {isActive && (
                <motion.span
                  layoutId='nav-active-indicator'
                  className='absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-500 rounded-r-full'
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
              <Icon className='w-4 h-4 flex-shrink-0' />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Social Links + Theme Toggle */}
      <div className='p-4 border-t border-slate-800 space-y-2'>
        <div className='flex items-center gap-1'>
          <a
            href={socialLinks.github}
            target='_blank'
            rel='noopener noreferrer'
            className='flex-1 flex items-center justify-center gap-1.5 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs font-medium'
          >
            <Github className='w-3.5 h-3.5' />
            GitHub
          </a>
          <a
            href={socialLinks.linkedin}
            target='_blank'
            rel='noopener noreferrer'
            className='flex-1 flex items-center justify-center gap-1.5 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs font-medium'
          >
            <Linkedin className='w-3.5 h-3.5' />
            LinkedIn
          </a>
          <a
            href={socialLinks.email}
            className='flex-1 flex items-center justify-center gap-1.5 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs font-medium'
          >
            <Mail className='w-3.5 h-3.5' />
            Email
          </a>
        </div>
        <button
          onClick={toggleTheme}
          className='w-full flex items-center justify-center gap-2 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs font-medium border border-slate-800 hover:border-slate-700'
          aria-label='Toggle dark mode'
        >
          {isDark ? (
            <>
              <Sun className='w-3.5 h-3.5' />
              Light Mode
            </>
          ) : (
            <>
              <Moon className='w-3.5 h-3.5' />
              Dark Mode
            </>
          )}
        </button>
      </div>
    </div>
  );
}
