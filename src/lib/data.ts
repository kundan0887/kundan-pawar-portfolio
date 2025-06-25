import type { PersonalInfo, Skill, Experience, Project } from '@/types';

export const personalInfo: PersonalInfo = {
  name: 'Kundan Pawar',
  title: 'Senior Frontend / Full Stack Developer',
  experience: '12+ years',
  location: 'Pune, India',
  bio: `Senior Frontend / Full Stack Developer with 12+ years of experience specializing in React, AWS, and Micro-Frontend architectures. Proven track record in leading teams, driving test coverage improvements, and delivering scalable, high-quality web applications. Expert in modern JavaScript frameworks, cloud solutions, and agile methodologies. Passionate about building robust, maintainable systems and mentoring engineering teams.`,
  email: 'kundan.pawar@email.com',
  linkedin: 'https://linkedin.com/in/kundanpawar',
  github: 'https://github.com/kundanpawar',
  resumeUrl: 'https://kundanpawar.com/resume.pdf',
};

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: [
      'React',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
    ],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'REST APIs', 'Database Management'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'CI/CD', 'Docker', 'Micro-Frontend Architecture'],
  },
  {
    category: 'Testing',
    items: [
      'Unit Testing',
      'Integration Testing',
      'Test Coverage Optimization',
    ],
  },
  {
    category: 'Tools',
    items: ['Git', 'Agile Methodologies', 'PDF Generation Systems'],
  },
];

export const experiences: Experience[] = [
  {
    company: 'Tech Innovators Pvt Ltd',
    role: 'Senior Frontend Developer',
    duration: '2021 - Present',
    achievements: [
      'Led a team of 8 engineers to deliver a scalable micro-frontend platform on AWS',
      'Improved test coverage from 60% to 95% across all frontend modules',
      'Architected and implemented CI/CD pipelines for rapid deployment',
    ],
    technologies: [
      'React',
      'TypeScript',
      'AWS',
      'Micro-Frontend Architecture',
      'Jest',
      'Docker',
    ],
  },
  {
    company: 'Cloud Solutions Inc.',
    role: 'Full Stack Developer',
    duration: '2017 - 2021',
    achievements: [
      'Developed and maintained RESTful APIs and frontend dashboards for enterprise clients',
      'Migrated legacy systems to modern JavaScript frameworks',
      'Mentored junior developers and conducted code reviews',
    ],
    technologies: ['Node.js', 'React', 'REST APIs', 'PostgreSQL', 'Jest'],
  },
  {
    company: 'Web Creators',
    role: 'Frontend Developer',
    duration: '2014 - 2017',
    achievements: [
      'Built responsive web applications for e-commerce and SaaS clients',
      'Collaborated with designers to deliver pixel-perfect UIs',
      'Introduced automated testing practices to the team',
    ],
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Jasmine', 'Git'],
  },
  {
    company: 'Startup Hub',
    role: 'Junior Web Developer',
    duration: '2012 - 2014',
    achievements: [
      'Assisted in the development of MVPs for multiple startups',
      'Maintained and updated company websites',
      'Learned and applied agile methodologies in fast-paced teams',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Agile'],
  },
];

export const projects: Project[] = [
  {
    title: 'Micro-Frontend Platform',
    description:
      'Designed and led the development of a scalable micro-frontend platform deployed on AWS, enabling independent team deployments and rapid feature delivery.',
    technologies: ['React', 'TypeScript', 'AWS', 'Docker', 'CI/CD'],
    github: 'https://github.com/kundanpawar/micro-frontend-platform',
    demo: 'https://microfrontends.kundanpawar.com',
    image: '/images/projects/microfrontend.png',
  },
  {
    title: 'Enterprise Dashboard',
    description:
      'Built a real-time analytics dashboard for enterprise clients, integrating REST APIs and advanced data visualization.',
    technologies: ['React', 'Node.js', 'REST APIs', 'D3.js'],
    github: 'https://github.com/kundanpawar/enterprise-dashboard',
    demo: 'https://dashboard.kundanpawar.com',
    image: '/images/projects/dashboard.png',
  },
  {
    title: 'PDF Generation System',
    description:
      'Developed a robust PDF generation system for automated report creation, supporting custom templates and high-volume processing.',
    technologies: ['Node.js', 'Express', 'PDFKit', 'AWS'],
    github: 'https://github.com/kundanpawar/pdf-generation-system',
    demo: 'https://pdfgen.kundanpawar.com',
    image: '/images/projects/pdfgen.png',
  },
  {
    title: 'E-commerce Storefront',
    description:
      'Created a modern, responsive e-commerce storefront with seamless checkout and product management features.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Stripe'],
    github: 'https://github.com/kundanpawar/ecommerce-storefront',
    demo: 'https://store.kundanpawar.com',
    image: '/images/projects/ecommerce.png',
  },
  {
    title: 'Team Collaboration Tool',
    description:
      'Engineered a real-time team collaboration tool with chat, file sharing, and task management capabilities.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com/kundanpawar/team-collab-tool',
    demo: 'https://collab.kundanpawar.com',
    image: '/images/projects/collab.png',
  },
];
