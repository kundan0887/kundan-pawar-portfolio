'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Eye } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  category: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, admin dashboard, and real-time inventory management.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Docker'],
    githubUrl: 'https://github.com/username/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.com',
    category: 'Full Stack',
    featured: true,
  },
  {
    id: '2',
    title: 'Real-time Chat Application',
    description:
      'Modern chat application built with React and Socket.io. Includes real-time messaging, file sharing, user presence, and message encryption.',
    technologies: ['React', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/username/chat-app',
    liveUrl: 'https://chat-demo.com',
    category: 'Full Stack',
    featured: true,
  },
  {
    id: '3',
    title: 'Task Management Dashboard',
    description:
      'Comprehensive project management tool with drag-and-drop functionality, team collaboration, and progress tracking.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/username/task-dashboard',
    liveUrl: 'https://task-demo.com',
    category: 'Frontend',
    featured: false,
  },
  {
    id: '4',
    title: 'Weather Forecast App',
    description:
      'Weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
    technologies: ['React', 'OpenWeather API', 'Mapbox', 'Chart.js'],
    githubUrl: 'https://github.com/username/weather-app',
    liveUrl: 'https://weather-demo.com',
    category: 'Frontend',
    featured: false,
  },
  {
    id: '5',
    title: 'Microservices API Gateway',
    description:
      'Scalable API gateway built with Node.js and Express. Handles authentication, rate limiting, and service discovery.',
    technologies: ['Node.js', 'Express', 'Redis', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/username/api-gateway',
    category: 'Backend',
    featured: true,
  },
  {
    id: '6',
    title: 'Portfolio Website',
    description:
      'Modern portfolio website built with Next.js and Framer Motion. Features smooth animations and responsive design.',
    technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    githubUrl: 'https://github.com/username/portfolio',
    liveUrl: 'https://portfolio-demo.com',
    category: 'Frontend',
    featured: false,
  },
  {
    id: '7',
    title: 'Machine Learning Dashboard',
    description:
      'Interactive dashboard for visualizing machine learning models and data analytics with real-time updates.',
    technologies: ['React', 'Python', 'TensorFlow', 'D3.js', 'FastAPI'],
    githubUrl: 'https://github.com/username/ml-dashboard',
    liveUrl: 'https://ml-demo.com',
    category: 'Full Stack',
    featured: true,
  },
  {
    id: '8',
    title: 'Social Media Analytics',
    description:
      'Analytics platform for social media monitoring with sentiment analysis and trend prediction.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    githubUrl: 'https://github.com/username/social-analytics',
    liveUrl: 'https://analytics-demo.com',
    category: 'Full Stack',
    featured: false,
  },
];

const categories = ['All', 'Frontend', 'Backend', 'Full Stack'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  hover: {
    y: -8,
    scale: 1.02,
  },
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    console.log('Filtering projects for category:', selectedCategory);
    if (selectedCategory === 'All') {
      return projects;
    }
    const filtered = projects.filter(
      project => project.category === selectedCategory
    );
    console.log('Filtered projects:', filtered.length);
    return filtered;
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    console.log('Changing category to:', category);
    setSelectedCategory(category);
  };

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            A collection of my recent work showcasing various technologies and
            solutions
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                size="sm"
                onClick={e => {
                  e.preventDefault();
                  console.log('Button clicked:', category);
                  handleCategoryChange(category);
                }}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Filter Status */}
          <div className="text-sm text-slate-600 dark:text-slate-300 mb-8">
            Showing {filteredProjects.length} project
            {filteredProjects.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </div>
        </motion.div>

        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="h-full"
              >
                <Card className="h-full p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  {/* Project Image Placeholder */}
                  <div className="relative mb-6 overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 h-48">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Eye className="w-12 h-12 text-blue-600 dark:text-blue-400 opacity-60" />
                    </div>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/20 flex items-center justify-center"
                      >
                        <div className="flex gap-3">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                          >
                            <Github className="w-5 h-5 text-slate-800" />
                          </a>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                            >
                              <ExternalLink className="w-5 h-5 text-slate-800" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="space-y-4">
                    {/* Title and Category */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded border border-slate-200 dark:border-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              No projects found for the selected category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
