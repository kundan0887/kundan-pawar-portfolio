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
  title: 'Senior Frontend / Full Stack Developer',
  location: 'Berlin, Germany',
  email: 'kundanpawar2987@gmail.com',
  phone: '+49 15237367909',
  bio: "Senior Frontend Developer with 12+ years of IT experience and 6+ years in modern frontend development. Specialized in building scalable, high-performance applications using React, TypeScript, Node.js, and .NET. Proven success in micro-frontend architectures, CI/CD automation, and AWS serverless solutions for enterprise-grade systems. Passionate about clean code, test automation, and mentoring development teams.",
  shortBio:
    'Senior Frontend Developer with 12+ years of IT experience and 6+ years in modern frontend development. Specialized in React, TypeScript, Node.js, and .NET with expertise in micro-frontend architectures and AWS serverless solutions.',
  resumeUrl: '/assets/documents/kundan_resume.pdf',
  avatarUrl: '/assets/images/Pic_Kundan.jpg',
  coverImageUrl: '/cover.jpg',
};

// ============================================================================
// SKILLS DATA
// ============================================================================
export const skills: SkillCategory[] = [
  {
    category: 'Frontend Development',
    items: [
      'React.js',
      'Redux',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3',
      'SASS',
      'Bootstrap',
    ],
  },
  {
    category: 'Backend Development',
    items: [
      'Node.js',
      'Express.js',
      '.NET Core',
      'C#',
      'RESTful APIs',
      'GraphQL',
    ],
  },
  {
    category: 'Databases',
    items: [
      'MongoDB',
      'SQL Server',
      'PostgreSQL',
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      'AWS (S3, Lambda)',
      'Azure',
      'Docker',
      'CI/CD (GitHub Actions, Bitbucket Pipelines)',
    ],
  },
  {
    category: 'Testing & Quality',
    items: [
      'Jest',
      'Cypress',
      'React Testing Library',
      'Unit Testing',
      'E2E Testing',
    ],
  },
  {
    category: 'Architecture & Tools',
    items: [
      'Micro-Frontend (Feature Hub)',
      'Headless CMS (AEM)',
      'Responsive Design',
      'Progressive Web Apps',
    ],
  },
];

// Detailed Skills with Proficiency Levels
export const detailedSkills: Skill[] = [
  // Frontend Skills
  {
    name: 'React.js',
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
    name: 'JavaScript (ES6+)',
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
    name: 'Redux',
    level: 85,
    years: 6,
    category: 'Frontend',
    color: 'from-purple-500 to-purple-700',
  },
  {
    name: 'HTML5/CSS3',
    level: 95,
    years: 12,
    category: 'Frontend',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'SASS',
    level: 90,
    years: 8,
    category: 'Frontend',
    color: 'from-pink-500 to-purple-500',
  },
  {
    name: 'Bootstrap',
    level: 85,
    years: 7,
    category: 'Frontend',
    color: 'from-purple-500 to-purple-600',
  },

  // Backend Skills
  {
    name: 'Node.js',
    level: 85,
    years: 6,
    category: 'Backend',
    color: 'from-green-500 to-green-700',
  },
  {
    name: 'Express.js',
    level: 80,
    years: 5,
    category: 'Backend',
    color: 'from-gray-600 to-gray-800',
  },
  {
    name: '.NET Core',
    level: 90,
    years: 10,
    category: 'Backend',
    color: 'from-purple-600 to-purple-800',
  },
  {
    name: 'C#',
    level: 92,
    years: 12,
    category: 'Backend',
    color: 'from-purple-500 to-purple-700',
  },
  {
    name: 'RESTful APIs',
    level: 90,
    years: 8,
    category: 'Backend',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'GraphQL',
    level: 75,
    years: 4,
    category: 'Backend',
    color: 'from-pink-600 to-purple-600',
  },

  // Database Skills
  {
    name: 'MongoDB',
    level: 80,
    years: 5,
    category: 'Database',
    color: 'from-green-600 to-green-800',
  },
  {
    name: 'SQL Server',
    level: 85,
    years: 10,
    category: 'Database',
    color: 'from-red-600 to-red-800',
  },
  {
    name: 'PostgreSQL',
    level: 75,
    years: 4,
    category: 'Database',
    color: 'from-blue-600 to-blue-800',
  },

  // Cloud & DevOps Skills
  {
    name: 'AWS (S3, Lambda)',
    level: 80,
    years: 4,
    category: 'Cloud',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    name: 'Azure',
    level: 75,
    years: 3,
    category: 'Cloud',
    color: 'from-blue-600 to-blue-700',
  },
  {
    name: 'Docker',
    level: 80,
    years: 4,
    category: 'DevOps',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'CI/CD',
    level: 85,
    years: 5,
    category: 'DevOps',
    color: 'from-green-500 to-green-600',
  },

  // Testing Skills
  {
    name: 'Jest',
    level: 90,
    years: 5,
    category: 'Testing',
    color: 'from-red-500 to-red-600',
  },
  {
    name: 'Cypress',
    level: 85,
    years: 4,
    category: 'Testing',
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'React Testing Library',
    level: 88,
    years: 4,
    category: 'Testing',
    color: 'from-blue-500 to-blue-600',
  },

  // Architecture Skills
  {
    name: 'Micro-Frontend',
    level: 85,
    years: 3,
    category: 'Architecture',
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'AEM Headless',
    level: 80,
    years: 3,
    category: 'Architecture',
    color: 'from-gray-600 to-gray-800',
  },
  {
    name: 'Responsive Design',
    level: 95,
    years: 10,
    category: 'Architecture',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Progressive Web Apps',
    level: 80,
    years: 4,
    category: 'Architecture',
    color: 'from-green-500 to-green-600',
  },
];

// ============================================================================
// WORK EXPERIENCE
// ============================================================================
export const experience: Experience[] = [
  {
    company: 'Accenture',
    role: 'Senior Frontend Developer',
    duration: 'Mar 2022 – Present',
    location: 'Berlin, Germany',
    description: 'Leading frontend development for enterprise automotive applications with focus on micro-frontend architecture and modern React development.',
    achievements: [
      'Migrated legacy AEM components to headless CMS, enhancing performance by 40%',
      'Built micro-frontend architecture using React, Redux, and Feature Apps',
      'Led test automation strategy using Jest and React Testing Library',
      'Created Lambda functions to dynamically generate PDFs for quotations and vehicle details',
      'Implemented E2E and unit test coverage using Cypress and Jest',
      'Maintained CI/CD pipelines and managed AWS S3 containers for frontend assets',
    ],
    technologies: ['React.js', 'TypeScript', 'Redux', 'AEM Headless', 'AWS', 'Jest', 'CI/CD', 'Feature Hub', 'Cypress'],
    metrics: [
      { label: 'Performance Improvement', value: '40%' },
      { label: 'Test Coverage', value: '95%+' },
    ],
  },
  {
    company: 'Go Deed Inc.',
    role: 'Full Stack Developer',
    duration: 'Jan 2022 – Feb 2022',
    location: 'Remote',
    description: 'Developed microservices-based corporate donation platform handling high concurrent user loads.',
    achievements: [
      'Developed a microservices-based corporate donation platform (web & mobile)',
      'Built scalable infrastructure handling 10,000+ concurrent users',
      'Integrated CI/CD pipelines for rapid deployment with Docker and GitHub Actions',
      'Established reusable test architecture with Jest for all components',
    ],
    technologies: ['React.js', 'TypeScript', 'Node.js', 'MongoDB', 'Docker', 'Jest', 'CI/CD'],
    metrics: [
      { label: 'Concurrent Users', value: '10,000+' },
    ],
  },
  {
    company: 'Infinity Share GmbH',
    role: 'Senior Consultant',
    duration: 'Jul 2020 – Dec 2021',
    location: 'Berlin, Germany',
    description: 'Delivered full-stack inventory solution and mentored development team for German automotive client.',
    achievements: [
      'Delivered full-stack inventory solution with responsive React frontend and C# backend',
      'Managed and mentored a 2-member dev team, driving project delivery',
      'Created advanced dynamic forms for real-time inventory data updates',
      'Wrote automated unit tests ensuring >95% test coverage',
    ],
    technologies: ['React.js', 'Redux', 'C#', 'SQL Server', 'Jest', 'Responsive Design'],
    metrics: [
      { label: 'Test Coverage', value: '>95%' },
    ],
  },
  {
    company: 'ICT Solutions AG',
    role: 'Software Developer',
    duration: 'Jan 2019 – May 2020',
    location: 'Berlin, Germany',
    description: 'Built and maintained enterprise intranet applications with modern web technologies.',
    achievements: [
      'Built and maintained enterprise intranet apps with React and .NET Core',
      'Developed internal component libraries used across 5+ internal platforms',
      'Led the design and implementation of performance testing strategies',
      'Agile delivery using SCRUM and cross-functional collaboration',
    ],
    technologies: ['React.js', '.NET Core', 'Component Libraries', 'Performance Testing', 'Agile/Scrum'],
  },
  {
    company: 'Previous Company',
    role: '.NET / SharePoint Developer',
    duration: '2012 – 2019',
    location: 'India',
    description: 'Specialized in SharePoint migrations and enterprise customization across multiple versions.',
    achievements: [
      'Successfully led end-to-end migrations: SharePoint 2010 → 2013 → 2016 → Online (M365) with zero data loss',
      'Developed robust intranet and enterprise applications using C#, .NET Framework, and SharePoint Server APIs',
      'Transitioned legacy apps to modern web technologies using React and SPFx (SharePoint Framework)',
      'Built custom APIs using .NET Core to integrate SharePoint with external business systems',
      'Collaborated with infrastructure teams to optimize deployment, permissions, and governance across SharePoint environments',
    ],
    technologies: ['C#', '.NET Core', 'SharePoint 2010/2013/2016/Online', 'React', 'JavaScript', 'SQL Server', 'SPFx'],
  },
];

// ============================================================================
// PROJECTS DATA
// ============================================================================
export const projects: Project[] = [
  {
    title: 'German Automotive - Product Details & Specification Journey',
    description: 'Migrated legacy AEM components to headless CMS architecture, enhancing performance by 40%. Built micro-frontend architecture using React, Redux, and Feature Apps with comprehensive test automation.',
    technologies: ['React.js', 'TypeScript', 'Redux', 'AEM Headless', 'AWS', 'Jest', 'CI/CD'],
    githubUrl: '#',
    liveUrl: '#',
    imageUrl: '/projects/automotive-product.jpg',
    category: 'Enterprise',
    featured: true,
  },
  {
    title: 'German Automotive - Customizer / Bottom Bar',
    description: 'Built persistent micro-frontend UI for real-time vehicle customization experience. Developed state tracking logic across multi-step journeys using Redux and created Lambda functions for PDF generation.',
    technologies: ['React.js', 'TypeScript', 'Feature Hub', 'AWS (S3, Lambda)', 'Cypress', 'Jest', 'AEM'],
    githubUrl: '#',
    liveUrl: '#',
    imageUrl: '/projects/automotive-customizer.jpg',
    category: 'Enterprise',
    featured: true,
  },
  {
    title: 'Corporate Donation Platform',
    description: 'Developed microservices-based corporate donation platform handling 10,000+ concurrent users. Built scalable infrastructure with comprehensive CI/CD pipelines and test automation.',
    technologies: ['React.js', 'TypeScript', 'Node.js', 'MongoDB', 'Docker', 'Jest', 'CI/CD'],
    githubUrl: '#',
    liveUrl: '#',
    imageUrl: '/projects/donation-platform.jpg',
    category: 'Web Application',
    featured: true,
  },
  {
    title: 'Inventory Management System',
    description: 'Delivered full-stack inventory solution with responsive React frontend and C# backend. Created advanced dynamic forms for real-time inventory data updates with >95% test coverage.',
    technologies: ['React.js', 'Redux', 'C#', 'SQL Server', 'Jest', 'Responsive Design'],
    githubUrl: '#',
    liveUrl: '#',
    imageUrl: '/projects/inventory-system.jpg',
    category: 'Enterprise',
    featured: false,
  },
  {
    title: 'Enterprise Intranet Applications',
    description: 'Built and maintained enterprise intranet apps with React and .NET Core. Developed internal component libraries used across 5+ internal platforms with performance optimization.',
    technologies: ['React.js', '.NET Core', 'Component Libraries', 'Performance Testing', 'Agile/Scrum'],
    githubUrl: '#',
    liveUrl: '#',
    imageUrl: '/projects/intranet-apps.jpg',
    category: 'Enterprise',
    featured: false,
  },
  {
    title: 'SharePoint Migration & Modernization',
    description: 'Successfully led end-to-end SharePoint migrations (2010 → 2013 → 2016 → Online) with zero data loss. Transitioned legacy apps to modern web technologies using React and SPFx.',
    technologies: ['C#', '.NET Core', 'SharePoint', 'React', 'JavaScript', 'SQL Server', 'SPFx'],
    githubUrl: '#',
    liveUrl: '#',
    imageUrl: '/projects/sharepoint-migration.jpg',
    category: 'Legacy Modernization',
    featured: false,
  },
];

// ============================================================================
// CONTACT INFORMATION
// ============================================================================
export const contactInfo: ContactInfo = {
  email: 'kundanpawar2987@gmail.com',
  linkedin: 'https://in.linkedin.com/in/kundanpawar87',
  github: 'https://github.com/kundanpawar',
  twitter: 'https://twitter.com/kundanpawar',
  website: 'https://kundanpawar.com',
  location: 'Berlin, Germany',
  availability: 'Available for Remote, Hybrid & On-site roles',
};

// ============================================================================
// ADDITIONAL INFORMATION
// ============================================================================
export const education = {
  degree: 'Master of Computer Science',
  institution: 'Pune University, Maharashtra, India',
  year: '2010',
};

export const languages = [
  { name: 'English', level: 'Fluent' },
  { name: 'German', level: 'A1 (Learning)' },
  { name: 'Hindi', level: 'Native' },
  { name: 'Marathi', level: 'Native' },
];

export const keyAchievements = [
  'Reduced app load times by 40% via optimization & AEM decoupling',
  'Implemented 95%+ automated test coverage using Jest & Cypress',
  'Built AWS Lambda-based PDF generation tool for custom vehicle quotes',
  'Delivered fully offline workforce planning tool using React and D3.js',
  'Mentored 10+ junior developers and introduced clean coding practices',
  'Optimized CI/CD pipelines for faster and error-free deployments',
];

export const keyStrengths = [
  'React Ecosystem',
  'Micro-Frontend Architecture',
  'AWS & CI/CD Pipelines',
  'Testing Automation',
  'Team Leadership',
  'Legacy Modernization',
];

// ============================================================================
// SOCIAL MEDIA LINKS
// ============================================================================
export const socialLinks = {
  github: 'https://github.com/kundanpawar',
  linkedin: 'https://in.linkedin.com/in/kundanpawar87',
  twitter: 'https://twitter.com/kundanpawar',
  email: 'mailto:kundanpawar2987@gmail.com',
  website: 'https://kundanpawar.com',
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
  siteUrl: 'https://kundanpawar.com',
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
  experience,
  projects,
  contactInfo,
  socialLinks,
  siteConfig,
  navigation,
  education,
  languages,
  keyAchievements,
  keyStrengths,
};
