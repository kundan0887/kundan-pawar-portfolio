'use client';

import { useRef } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import SidebarNavigation from '@/components/SidebarNavigation';
import { personalInfo } from '@/lib/data';
import { useActiveSection } from '@/hooks/useActiveSection';

export default function Home() {
  const mainContentRef = useRef<HTMLElement>(null);
  const activeSection = useActiveSection(mainContentRef);

  const handleScrollToSection = (sectionId: string) => {
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Sidebar Navigation */}
      <SidebarNavigation
        onNavigate={handleScrollToSection}
        currentSection={activeSection}
      />

      {/* Main Content - Fixed offset */}
      <main ref={mainContentRef} className="lg:ml-70 h-screen overflow-y-auto">
        {/* Hero Section */}
        <Hero
          onScrollToSection={handleScrollToSection}
          resumeUrl={personalInfo.resumeUrl}
        />

        {/* About Section */}
        <About resumeUrl={personalInfo.resumeUrl} />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Skills Section */}
        <Skills />

        {/* Contact Section */}
        <Contact />
      </main>
    </div>
  );
}
