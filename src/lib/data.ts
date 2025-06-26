// ============================================================================
// PORTFOLIO DATA CONFIGURATION
// ============================================================================
// This file contains all the data for your portfolio.
// Update the values below to customize your portfolio content.
// ============================================================================

// Personal Information Interface
export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  bio: string;
  shortBio: string;
  resumeUrl: string;
  avatarUrl?: string;
  coverImageUrl?: string;
}

// Skill Category Interface
export interface SkillCategory {
  category: string;
  items: string[];
  icon?: string;
}

// Skill with Proficiency Interface
export interface Skill {
  name: string;
  level: number; // 0-100
  years: number;
  category: string;
  color: string;
}

// Work Experience Interface
export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

// Project Interface
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  category: string;
  featured: boolean;
}

// Contact Information Interface
export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  twitter?: string;
  website?: string;
  location: string;
  availability: string;
}

// ============================================================================
// PERSONAL INFORMATION
// ============================================================================
export const personalInfo: PersonalInfo = {
  name: 'Kundan Pawar',
  title: 'Senior Frontend Developer',
  location: 'San Francisco, CA',
  email: 'kundan.pawar@example.com',
  phone: '+1 (555) 123-4567',
  bio: "I'm a passionate Senior Frontend Developer with 12+ years of experience building scalable web applications. I specialize in React, TypeScript, and modern frontend technologies, with expertise in micro-frontends, performance optimization, and team leadership. I love creating intuitive user experiences and mentoring junior developers.",
  shortBio:
    'Senior Frontend Developer with 12+ years of experience in React, TypeScript, and modern web technologies. Passionate about creating scalable applications and mentoring teams.',
  resumeUrl: '/resume.pdf',
  avatarUrl: '/avatar.jpg',
  coverImageUrl: '/cover.jpg',
};

// ============================================================================
// SKILLS DATA
// ============================================================================
export const skills: SkillCategory[] = [
  {
    category: 'Frontend Development',
    items: [
      'React',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'Vue.js',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'SCSS',
      'Redux',
      'Zustand',
    ],
  },
  {
    category: 'Backend Development',
    items: [
      'Node.js',
      'Express.js',
      'Python',
      'FastAPI',
      'REST APIs',
      'GraphQL',
      'MongoDB',
      'PostgreSQL',
      'Redis',
      'Firebase',
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      'AWS',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Git',
      'GitHub Actions',
      'Vercel',
      'Netlify',
      'Micro-Frontends',
      'Serverless',
    ],
  },
  {
    category: 'Testing & Quality',
    items: [
      'Jest',
      'React Testing Library',
      'Cypress',
      'Playwright',
      'Unit Testing',
      'Integration Testing',
      'E2E Testing',
      'Performance Testing',
    ],
  },
  {
    category: 'Tools & Others',
    items: [
      'Webpack',
      'Vite',
      'ESLint',
      'Prettier',
      'Figma',
      'Adobe XD',
      'Agile',
      'Scrum',
      'JIRA',
      'Confluence',
    ],
  },
];

// Detailed Skills with Proficiency Levels
export const detailedSkills: Skill[] = [
  // Frontend Skills
  {
    name: 'React',
    level: 95,
    years: 8,
    category: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'TypeScript',
    level: 90,
    years: 6,
    category: 'Frontend',
    color: 'from-blue-600 to-blue-700',
  },
  {
    name: 'JavaScript',
    level: 95,
    years: 12,
    category: 'Frontend',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    name: 'Next.js',
    level: 88,
    years: 5,
    category: 'Frontend',
    color: 'from-black to-gray-800',
  },
  {
    name: 'Vue.js',
    level: 85,
    years: 4,
    category: 'Frontend',
    color: 'from-green-500 to-green-700',
  },
  {
    name: 'Tailwind CSS',
    level: 92,
    years: 4,
    category: 'Frontend',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    name: 'CSS3/SCSS',
    level: 90,
    years: 10,
    category: 'Frontend',
    color: 'from-pink-500 to-purple-600',
  },

  // Backend Skills
  {
    name: 'Node.js',
    level: 88,
    years: 7,
    category: 'Backend',
    color: 'from-green-500 to-green-700',
  },
  {
    name: 'Express.js',
    level: 85,
    years: 6,
    category: 'Backend',
    color: 'from-gray-600 to-gray-800',
  },
  {
    name: 'REST APIs',
    level: 92,
    years: 8,
    category: 'Backend',
    color: 'from-purple-500 to-purple-700',
  },
  {
    name: 'GraphQL',
    level: 80,
    years: 4,
    category: 'Backend',
    color: 'from-pink-600 to-purple-600',
  },
  {
    name: 'MongoDB',
    level: 85,
    years: 6,
    category: 'Backend',
    color: 'from-green-600 to-green-800',
  },
  {
    name: 'PostgreSQL',
    level: 82,
    years: 5,
    category: 'Backend',
    color: 'from-blue-500 to-blue-700',
  },

  // Cloud & DevOps Skills
  {
    name: 'AWS',
    level: 85,
    years: 6,
    category: 'Cloud',
    color: 'from-orange-500 to-orange-700',
  },
  {
    name: 'Docker',
    level: 80,
    years: 5,
    category: 'Cloud',
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'CI/CD',
    level: 88,
    years: 7,
    category: 'Cloud',
    color: 'from-green-500 to-green-700',
  },
  {
    name: 'Kubernetes',
    level: 75,
    years: 4,
    category: 'Cloud',
    color: 'from-blue-600 to-blue-800',
  },
  {
    name: 'Micro-Frontends',
    level: 85,
    years: 5,
    category: 'Cloud',
    color: 'from-purple-500 to-purple-700',
  },
  {
    name: 'Serverless',
    level: 78,
    years: 4,
    category: 'Cloud',
    color: 'from-red-500 to-red-700',
  },

  // Testing Skills
  {
    name: 'Unit Testing',
    level: 90,
    years: 8,
    category: 'Testing',
    color: 'from-green-500 to-green-700',
  },
  {
    name: 'Integration Testing',
    level: 85,
    years: 6,
    category: 'Testing',
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'E2E Testing',
    level: 80,
    years: 5,
    category: 'Testing',
    color: 'from-purple-500 to-purple-700',
  },
  {
    name: 'Jest',
    level: 88,
    years: 6,
    category: 'Testing',
    color: 'from-red-500 to-red-700',
  },
  {
    name: 'Cypress',
    level: 82,
    years: 4,
    category: 'Testing',
    color: 'from-green-600 to-green-800',
  },
  {
    name: 'Performance Testing',
    level: 78,
    years: 4,
    category: 'Testing',
    color: 'from-orange-500 to-orange-700',
  },
];

// ============================================================================
// WORK EXPERIENCE
// ============================================================================
export const experiences: Experience[] = [
  {
    company: 'TechCorp Solutions',
    role: 'Senior Frontend Developer',
    duration: '2022 - Present',
    location: 'San Francisco, CA',
    description:
      'Leading frontend development for enterprise applications with focus on performance and user experience. Managing a team of 5 developers and implementing best practices across multiple projects.',
    achievements: [
      'Led migration from Angular to React, improving performance by 40% and reducing bundle size by 60%',
      'Implemented micro-frontend architecture serving 2M+ users with 99.9% uptime',
      'Mentored 5 junior developers and established coding standards used across 15+ applications',
      'Reduced page load times by 50% through code splitting and optimization strategies',
      'Implemented automated testing achieving 95% code coverage',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'AWS',
      'Docker',
      'Jest',
      'Micro-Frontends',
    ],
    metrics: [
      { label: 'Performance Improvement', value: '40%' },
      { label: 'Bundle Size Reduction', value: '60%' },
      { label: 'Users Served', value: '2M+' },
      { label: 'Code Coverage', value: '95%' },
    ],
  },
  {
    company: 'InnovateTech',
    role: 'Frontend Team Lead',
    duration: '2020 - 2022',
    location: 'New York, NY',
    description:
      'Managed a team of 8 developers while building scalable web applications for fintech clients. Established development processes and mentored team members.',
    achievements: [
      'Built real-time trading dashboard processing 10K+ transactions/sec with WebSocket integration',
      'Implemented CI/CD pipeline reducing deployment time by 70% and improving reliability',
      'Established design system used across 15+ applications with 100% adoption rate',
      'Achieved 99.9% uptime for critical financial applications over 2 years',
      'Led successful migration from monolithic to microservices architecture',
    ],
    technologies: [
      'Vue.js',
      'TypeScript',
      'Node.js',
      'MongoDB',
      'Redis',
      'WebSocket',
      'Docker',
    ],
    metrics: [
      { label: 'Team Size', value: '8 Developers' },
      { label: 'Deployment Time', value: '70% Faster' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Applications', value: '15+' },
    ],
  },
  {
    company: 'StartupHub',
    role: 'Full Stack Developer',
    duration: '2018 - 2020',
    location: 'Austin, TX',
    description:
      'Built and scaled web applications from MVP to production for various startup clients. Worked across the entire stack and provided technical consulting.',
    achievements: [
      'Developed 12+ MVP applications with 90% client satisfaction and on-time delivery',
      'Implemented automated testing achieving 95% code coverage across all projects',
      'Optimized database queries reducing load times by 50% and improving user experience',
      'Built reusable component library used across 8 projects, reducing development time by 30%',
      'Provided technical consulting to 5+ startups on architecture and best practices',
    ],
    technologies: [
      'React',
      'Node.js',
      'PostgreSQL',
      'GraphQL',
      'Docker',
      'AWS',
      'Firebase',
    ],
    metrics: [
      { label: 'Projects Delivered', value: '12+' },
      { label: 'Code Coverage', value: '95%' },
      { label: 'Load Time Improvement', value: '50%' },
      { label: 'Client Satisfaction', value: '90%' },
    ],
  },
  {
    company: 'DigitalAgency',
    role: 'Frontend Developer',
    duration: '2016 - 2018',
    location: 'Chicago, IL',
    description:
      'Created responsive web applications and e-commerce solutions for diverse client portfolio. Focused on user experience and performance optimization.',
    achievements: [
      'Built 20+ responsive websites with 100% mobile compatibility and accessibility compliance',
      'Implemented PWA features increasing user engagement by 35% and session duration by 40%',
      'Optimized SEO resulting in 200% increase in organic traffic across all projects',
      'Reduced page load times by 45% through image optimization and lazy loading',
      'Established responsive design patterns used across 10+ client projects',
    ],
    technologies: [
      'JavaScript',
      'React',
      'CSS3',
      'HTML5',
      'Webpack',
      'Git',
      'PWA',
    ],
    metrics: [
      { label: 'Websites Built', value: '20+' },
      { label: 'User Engagement', value: '35% Increase' },
      { label: 'Organic Traffic', value: '200% Increase' },
      { label: 'Load Time Reduction', value: '45%' },
    ],
  },
];

// ============================================================================
// PROJECTS DATA
// ============================================================================
export const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing with Stripe, admin dashboard, and real-time inventory management. Handles 10K+ daily transactions with 99.9% uptime.',
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'Stripe',
      'AWS',
      'Docker',
      'Redis',
    ],
    githubUrl: 'https://github.com/kundan0887/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.com',
    category: 'Full Stack',
    featured: true,
  },
  {
    title: 'Real-time Chat Application',
    description:
      'Modern chat application built with React and Socket.io. Includes real-time messaging, file sharing, user presence indicators, and message encryption. Supports group chats and direct messaging with push notifications.',
    technologies: [
      'React',
      'Socket.io',
      'Node.js',
      'Express',
      'MongoDB',
      'WebRTC',
    ],
    githubUrl: 'https://github.com/kundan0887/chat-app',
    liveUrl: 'https://chat-demo.com',
    category: 'Full Stack',
    featured: true,
  },
  {
    title: 'Task Management Dashboard',
    description:
      'Comprehensive project management tool with drag-and-drop functionality, team collaboration features, and progress tracking. Includes kanban boards, time tracking, and reporting dashboards.',
    technologies: [
      'React',
      'TypeScript',
      'Firebase',
      'Tailwind CSS',
      'DnD Kit',
    ],
    githubUrl: 'https://github.com/kundan0887/task-dashboard',
    liveUrl: 'https://task-demo.com',
    category: 'Frontend',
    featured: false,
  },
  {
    title: 'Weather Forecast App',
    description:
      'Weather application with location-based forecasts, interactive maps, and detailed weather analytics. Features include 7-day forecasts, hourly predictions, and weather alerts with beautiful visualizations.',
    technologies: [
      'React',
      'OpenWeather API',
      'Mapbox',
      'Chart.js',
      'Geolocation',
    ],
    githubUrl: 'https://github.com/kundan0887/weather-app',
    liveUrl: 'https://weather-demo.com',
    category: 'Frontend',
    featured: false,
  },
  {
    title: 'Microservices API Gateway',
    description:
      'Scalable API gateway built with Node.js and Express. Handles authentication, rate limiting, service discovery, and load balancing. Supports multiple microservices with centralized logging and monitoring.',
    technologies: [
      'Node.js',
      'Express',
      'Redis',
      'Docker',
      'Kubernetes',
      'JWT',
    ],
    githubUrl: 'https://github.com/kundan0887/api-gateway',
    category: 'Backend',
    featured: true,
  },
  {
    title: 'Portfolio Website',
    description:
      'Modern portfolio website built with Next.js and Framer Motion. Features smooth animations, responsive design, and optimized performance. Includes blog functionality and contact form with validation.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Framer Motion',
      'Tailwind CSS',
      'React Hook Form',
    ],
    githubUrl: 'https://github.com/kundan0887/portfolio',
    liveUrl: 'https://kundan-pawar.com',
    category: 'Frontend',
    featured: false,
  },
  {
    title: 'Machine Learning Dashboard',
    description:
      'Interactive dashboard for visualizing machine learning models and data analytics with real-time updates. Features include model performance metrics, data visualization, and prediction interfaces.',
    technologies: [
      'React',
      'Python',
      'TensorFlow',
      'D3.js',
      'FastAPI',
      'WebSocket',
    ],
    githubUrl: 'https://github.com/kundan0887/ml-dashboard',
    liveUrl: 'https://ml-demo.com',
    category: 'Full Stack',
    featured: true,
  },
  {
    title: 'Social Media Analytics',
    description:
      'Analytics platform for social media monitoring with sentiment analysis and trend prediction. Tracks multiple social platforms, provides insights, and generates automated reports.',
    technologies: [
      'React',
      'Node.js',
      'PostgreSQL',
      'Redis',
      'AWS',
      'Chart.js',
    ],
    githubUrl: 'https://github.com/kundan0887/social-analytics',
    liveUrl: 'https://analytics-demo.com',
    category: 'Full Stack',
    featured: false,
  },
];

// ============================================================================
// CONTACT INFORMATION
// ============================================================================
export const contactInfo: ContactInfo = {
  email: 'kundan.pawar@example.com',
  linkedin: 'https://linkedin.com/in/kundan-pawar',
  github: 'https://github.com/kundan0887',
  twitter: 'https://twitter.com/kundan_pawar',
  website: 'https://kundan-pawar.com',
  location: 'San Francisco, CA',
  availability: 'Available for new opportunities',
};

// ============================================================================
// SOCIAL MEDIA LINKS
// ============================================================================
export const socialLinks = {
  github: 'https://github.com/kundan0887',
  linkedin: 'https://linkedin.com/in/kundan-pawar',
  twitter: 'https://twitter.com/kundan_pawar',
  email: 'mailto:kundan.pawar@example.com',
  website: 'https://kundan-pawar.com',
};

// ============================================================================
// SITE CONFIGURATION
// ============================================================================
export const siteConfig = {
  title: 'Kundan Pawar - Senior Frontend Developer',
  description:
    'Senior Frontend Developer with 12+ years of experience in React, TypeScript, and modern web technologies. Passionate about creating scalable applications and mentoring teams.',
  keywords: [
    'Frontend Developer',
    'React',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'UI/UX',
  ],
  author: 'Kundan Pawar',
  siteUrl: 'https://kundan-pawar.com',
  ogImage: '/og-image.jpg',
  favicon: '/favicon.ico',
};

// ============================================================================
// NAVIGATION MENU
// ============================================================================
export const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

// ============================================================================
// EXPORT ALL DATA
// ============================================================================
export default {
  personalInfo,
  skills,
  detailedSkills,
  experiences,
  projects,
  contactInfo,
  socialLinks,
  siteConfig,
  navigation,
};
