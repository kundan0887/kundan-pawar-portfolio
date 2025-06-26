import { useState, useEffect, RefObject } from 'react';

export function useActiveSection(containerRef?: RefObject<HTMLElement | null>) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const container = containerRef?.current;
      
      if (!container) return;
      
      const scrollPosition = container.scrollTop + 100; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const container = containerRef?.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial position

      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef]);

  return activeSection;
} 