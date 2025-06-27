'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  Code,
  Award,
  Mail,
  Menu,
  X,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { personalInfo, socialLinks } from '@/lib/data';

interface SidebarNavigationProps {
  onNavigate: (sectionId: string) => void;
  currentSection: string;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: Home, href: '#home' },
  { id: 'about', label: 'About', icon: User, href: '#about' },
  {
    id: 'experience',
    label: 'Experience',
    icon: Briefcase,
    href: '#experience',
  },
  { id: 'projects', label: 'Projects', icon: Code, href: '#projects' },
  { id: 'skills', label: 'Skills', icon: Award, href: '#skills' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
];

export default function SidebarNavigation({
  onNavigate,
  currentSection,
}: SidebarNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [portfolioProgress, setPortfolioProgress] = useState(85); // Mock progress

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile overlay click
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  // Handle navigation
  const handleNavigation = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigation(sectionId);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='fixed top-4 left-4 z-50 lg:hidden p-3 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-lg hover:bg-slate-800/80 transition-all duration-300'
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div
              key='close'
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className='w-6 h-6 text-white' />
            </motion.div>
          ) : (
            <motion.div
              key='menu'
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className='w-6 h-6 text-white' />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden'
            onClick={handleOverlayClick}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className='fixed left-0 top-0 h-full w-70 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 shadow-2xl backdrop-blur-xl z-50 lg:hidden'
      >
        <SidebarContent
          currentSection={currentSection}
          onNavigate={handleNavigation}
        />
      </motion.aside>

      {/* Desktop Sidebar - Fixed */}
      <aside className='hidden lg:block fixed left-0 top-0 h-full w-70 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 shadow-2xl backdrop-blur-xl z-40'>
        <SidebarContent
          currentSection={currentSection}
          onNavigate={onNavigate}
        />
      </aside>
    </>
  );
}

// Separate component for sidebar content
interface SidebarContentProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

function SidebarContent({ currentSection, onNavigate }: SidebarContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [portfolioProgress, setPortfolioProgress] = useState(85); // Mock progress

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNavigate(sectionId);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      {/* Header */}
      <div className='p-6 border-b border-slate-700/50'>
        <div className='flex items-center gap-4'>
          {/* Avatar */}
          <div className='relative flex-shrink-0'>
            {personalInfo.avatarUrl ? (
              <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 shadow-lg'>
                <img
                  src={personalInfo.avatarUrl}
                  alt={`${personalInfo.name} - ${personalInfo.title}`}
                  className='w-full h-full object-cover'
                />
              </div>
            ) : (
              <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg'>
                {personalInfo.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </div>
            )}
            {/* Online Status */}
            <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 shadow-lg'>
              <div className='w-full h-full bg-green-400 rounded-full animate-pulse'></div>
            </div>
          </div>

          {/* Brand Info - Elegant Two-Line Solution */}
          <div className='flex-1 min-w-0'>
            <h2 className='text-lg font-bold text-white truncate'>
              {personalInfo.name}
            </h2>
            <p className='text-sm text-slate-300 truncate'>
              {personalInfo.title}
            </p>
            <p className='text-xs text-slate-400 mt-1'>
              Available for Remote, Hybrid & On-site
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 p-4 space-y-2'>
        {navigationItems.map(item => {
          const isActive = currentSection === item.id;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => onNavigate(item.id)}
                onKeyDown={e => handleKeyDown(e, item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
                tabIndex={0}
                role='button'
                aria-label={`Navigate to ${item.label} section`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId='activeIndicator'
                    className='absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full'
                    initial={false}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  />
                )}

                {/* Icon */}
                <div
                  className={`relative z-10 ${
                    isActive
                      ? 'text-blue-400'
                      : 'text-slate-400 group-hover:text-blue-400'
                  }`}
                >
                  <Icon className='w-5 h-5' />
                </div>

                {/* Label */}
                <span className='font-medium relative z-10'>{item.label}</span>

                {/* Hover Glow Effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg' />

                {/* Arrow for active item */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className='ml-auto'
                  >
                    <ChevronRight className='w-4 h-4 text-blue-400' />
                  </motion.div>
                )}
              </button>
            </motion.div>
          );
        })}
      </nav>

      {/* Progress Section */}
      <div className='p-4 border-t border-slate-700/50'>
        <div className='space-y-3'>
          {/* Scroll Progress */}
          <div>
            <div className='flex justify-between text-sm text-slate-400 mb-1'>
              <span>Scroll Progress</span>
              <span>{Math.round(scrollProgress)}%</span>
            </div>
            <div className='w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden'>
              <motion.div
                className='h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'
                style={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Portfolio Progress */}
          <div>
            <div className='flex justify-between text-sm text-slate-400 mb-1'>
              <span>Portfolio Complete</span>
              <span>{portfolioProgress}%</span>
            </div>
            <div className='w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden'>
              <motion.div
                className='h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full'
                initial={{ width: 0 }}
                animate={{ width: `${portfolioProgress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className='p-4 border-t border-slate-700/50'>
        <div className='flex justify-center gap-3'>
          <motion.a
            href={socialLinks.github}
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-300 group'
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className='w-5 h-5 text-slate-400 group-hover:text-white transition-colors' />
          </motion.a>

          <motion.a
            href={socialLinks.linkedin}
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-300 group'
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className='w-5 h-5 text-slate-400 group-hover:text-white transition-colors' />
          </motion.a>

          <motion.a
            href={socialLinks.email}
            className='p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-300 group'
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className='w-5 h-5 text-slate-400 group-hover:text-white transition-colors' />
          </motion.a>
        </div>
      </div>
    </div>
  );
}
