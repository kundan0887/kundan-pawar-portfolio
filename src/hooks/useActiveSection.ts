import { useState, useEffect, RefObject } from 'react';

export function useActiveSection(containerRef?: RefObject<HTMLElement | null>) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = [
      'home',
      'about',
      'experience',
      'projects',
      'skills',
      'contact',
    ];

    const handleScroll = () => {
      const container = containerRef?.current;
      if (!container) return;

      // Use getBoundingClientRect so both measurements share the same
      // viewport coordinate space — offsetTop would be relative to
      // offsetParent (body), not the scroll container, causing mismatches.
      const containerTop = container.getBoundingClientRect().top;
      const threshold = 150; // px from the container's top edge

      let current = sections[0];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.getBoundingClientRect().top - containerTop;
          if (elementTop <= threshold) {
            current = sectionId;
          }
        }
      }

      setActiveSection(current);
    };

    const container = containerRef?.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef]);

  return activeSection;
}
