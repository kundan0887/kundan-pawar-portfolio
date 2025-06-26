'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Card, Button, Section, Badge, CardContent } from '@/components/ui';
import { projects, Project as ProjectType } from '@/lib/data';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] =
    useState<ProjectType[]>(projects);

  // Get unique categories from projects
  const categories = [
    'all',
    ...Array.from(new Set(projects.map(project => project.category))),
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const filtered =
      category === 'all'
        ? projects
        : projects.filter(project => project.category === category);
    setFilteredProjects(filtered);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <Section id="projects">
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
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          A showcase of my recent work and technical expertise
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'outline'}
            onClick={() => handleCategoryChange(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project: ProjectType) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              layout
              className="group"
            >
              <Card variant="elevated" className="h-full overflow-hidden">
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">
                          {project.title.charAt(0)}
                        </div>
                        <div className="text-sm opacity-75">
                          Project Preview
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>

                {/* Project Content */}
                <CardContent>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies
                      .slice(0, 4)
                      .map((tech: string, idx: number) => (
                        <Badge key={idx} variant="primary" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="default" size="sm">
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      className="flex items-center gap-2 flex-1"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </Button>
                    {project.liveUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                        className="flex items-center gap-2 flex-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
