import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';

// Setup MSW server for API mocking
export const server = setupServer(...handlers);

// Extend Jest matchers
import '@testing-library/jest-dom';

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <div id='test-root'>{children}</div>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Test data helpers
export const mockPersonalInfo = {
  name: 'Kundan Pawar',
  title: 'Senior Frontend Developer',
  email: 'kundan@example.com',
  phone: '+1234567890',
  location: 'San Francisco, CA',
  shortBio:
    'Crafting exceptional digital experiences with modern web technologies.',
  longBio:
    'Experienced frontend developer with expertise in React, TypeScript, and modern web development.',
  resumeUrl: '/resume.pdf',
  github: 'https://github.com/kundanpawar',
  linkedin: 'https://linkedin.com/in/kundanpawar',
  twitter: 'https://twitter.com/kundanpawar',
};

export const mockProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with Next.js and Stripe',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    image: '/project-1.jpg',
    githubUrl: 'https://github.com/kundanpawar/ecommerce',
    liveUrl: 'https://ecommerce.example.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    image: '/project-2.jpg',
    githubUrl: 'https://github.com/kundanpawar/task-app',
    liveUrl: 'https://task-app.example.com',
    featured: false,
  },
];

export const mockSkills = [
  {
    name: 'React',
    level: 90,
    category: 'Frontend',
    yearsOfExperience: 5,
    icon: 'react',
  },
  {
    name: 'TypeScript',
    level: 85,
    category: 'Language',
    yearsOfExperience: 4,
    icon: 'typescript',
  },
  {
    name: 'Next.js',
    level: 80,
    category: 'Framework',
    yearsOfExperience: 3,
    icon: 'nextjs',
  },
];

export const mockExperience = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    period: '2022 - Present',
    description: 'Leading frontend development for web applications',
    technologies: ['React', 'TypeScript', 'Next.js'],
    achievements: [
      'Led development of 3 major web applications',
      'Improved performance by 40%',
      'Mentored 5 junior developers',
    ],
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Startup Inc',
    period: '2020 - 2022',
    description: 'Developed responsive web applications',
    technologies: ['React', 'JavaScript', 'CSS'],
    achievements: [
      'Built 10+ responsive web applications',
      'Reduced bundle size by 30%',
      'Implemented CI/CD pipeline',
    ],
  },
];

// Mock functions
export const mockOnScrollToSection = jest.fn();
export const mockOnSubmit = jest.fn();

// Test environment setup
beforeAll(() => {
  // Start MSW server
  server.listen();

  // Mock IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  } as any;

  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  };

  // Mock PerformanceObserver
  global.PerformanceObserver = class PerformanceObserver {
    constructor() {}
    observe() {}
    disconnect() {}
    static supportedEntryTypes: readonly string[] = [];
  } as any;
});

afterEach(() => {
  // Reset MSW handlers
  server.resetHandlers();

  // Clear all mocks
  jest.clearAllMocks();
});

afterAll(() => {
  // Stop MSW server
  server.close();
});
