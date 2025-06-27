'use client';

import React from 'react';
import { useRef, useState, useEffect, Suspense, lazy } from 'react';
import SidebarNavigation from '@/components/SidebarNavigation';
import SplashScreen from '@/components/SplashScreen';
import {
  HeroSkeleton,
  AboutSkeleton,
  ExperienceSkeleton,
  ProjectsSkeleton,
  SkillsSkeleton,
  ContactSkeleton,
} from '@/components/SkeletonLoaders';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import { personalInfo } from '@/lib/data';
import { useActiveSection } from '@/hooks/useActiveSection';

// Lazy load components with dynamic imports
const Hero = lazy(() => import('@/components/Hero'));
const About = lazy(() => import('@/components/About'));
const Experience = lazy(() => import('@/components/Experience'));
const Projects = lazy(() => import('@/components/Projects'));
const Skills = lazy(() => import('@/components/Skills'));
const Contact = lazy(() => import('@/components/Contact'));

export default function Home() {
  const mainContentRef = useRef<HTMLElement>(null);
  const activeSection = useActiveSection(mainContentRef);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());
  const [_isNavigating, setIsNavigating] = useState(false);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setIsLoading(false);
  };

  // Preload critical sections
  useEffect(() => {
    if (!isLoading) {
      // Load all sections immediately when splash screen completes
      setLoadedSections(
        new Set([
          'hero',
          'about',
          'experience',
          'projects',
          'skills',
          'contact',
        ]),
      );
    }
  }, [isLoading]);

  const handleScrollToSection = async (sectionId: string) => {
    setIsNavigating(true);

    // Ensure section is loaded
    if (!loadedSections.has(sectionId)) {
      setLoadedSections(prev => new Set([...prev, sectionId]));
      // Small delay to allow component to load
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const element = document.getElementById(sectionId);
    if (element && mainContentRef.current) {
      // Calculate the offset relative to the main content area
      const mainContentTop = mainContentRef.current.offsetTop;
      const elementTop = element.offsetTop;
      const scrollTop = elementTop - mainContentTop - 20; // 20px offset for better spacing

      mainContentRef.current.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    }

    // Reset navigation state after scroll completes
    setTimeout(() => setIsNavigating(false), 1000);
  };

  // Show splash screen on initial load
  if (isLoading) {
    return <SplashScreen onComplete={handleSplashComplete} duration={500} />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
      {/* Performance Monitor (only in development) */}
      <PerformanceMonitor />

      {/* Sidebar Navigation */}
      <SidebarNavigation
        onNavigate={handleScrollToSection}
        currentSection={activeSection}
      />

      {/* Main Content - Fixed offset */}
      <main ref={mainContentRef} className='lg:ml-70 h-screen overflow-y-auto'>
        {/* Hero Section */}
        <Suspense fallback={<HeroSkeleton />}>
          {loadedSections.has('hero') && (
            <Hero
              onScrollToSection={handleScrollToSection}
              resumeUrl={personalInfo.resumeUrl}
            />
          )}
        </Suspense>

        {/* About Section */}
        <Suspense fallback={<AboutSkeleton />}>
          {loadedSections.has('about') && (
            <About resumeUrl={personalInfo.resumeUrl} />
          )}
        </Suspense>

        {/* Experience Section */}
        <Suspense fallback={<ExperienceSkeleton />}>
          {loadedSections.has('experience') && <Experience />}
        </Suspense>

        {/* Projects Section */}
        <Suspense fallback={<ProjectsSkeleton />}>
          {loadedSections.has('projects') && <Projects />}
        </Suspense>

        {/* Skills Section */}
        <Suspense fallback={<SkillsSkeleton />}>
          {loadedSections.has('skills') && <Skills />}
        </Suspense>

        {/* Contact Section */}
        <Suspense fallback={<ContactSkeleton />}>
          {loadedSections.has('contact') && <Contact />}
        </Suspense>
      </main>
    </div>
  );
}
