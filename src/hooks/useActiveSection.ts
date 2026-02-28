import { useState, useEffect, RefObject } from 'react';

export function useActiveSection(containerRef?: RefObject<HTMLElement | null>) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'about',
        'experience',
        'projects',
        'skills',
        'contact',
      ];
      const container = containerRef?.current;

      if (!container) return;

      const scrollPosition = container.scrollTop + 100;

      let currentActiveSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            currentActiveSection = section;
            break;
          }
        }
      }

      setActiveSection(currentActiveSection);
    };

    const container = containerRef?.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);

      // Initial check
      handleScroll();
      // Multiple checks to ensure sections are loaded
      setTimeout(handleScroll, 500);
      setTimeout(handleScroll, 1000);
      setTimeout(handleScroll, 2000);

      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef]);

  return activeSection;
}

