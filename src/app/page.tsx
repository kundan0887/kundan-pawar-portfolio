'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import Hero from '@/components/Hero';
import About from '@/components/About';
import { personalInfo, skills, experiences, projects } from '@/lib/data';

export default function Home() {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <Hero
        onScrollToSection={handleScrollToSection}
        resumeUrl={personalInfo.resumeUrl}
      />

      {/* About Section */}
      <About resumeUrl={personalInfo.resumeUrl} />

      <div className="container mx-auto px-4 py-16">
        {/* Skills Section */}
        <motion.div
          id="skills"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map(skill => (
              <Card
                key={skill.category}
                className="hover:scale-105 transition-transform duration-200"
              >
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">
                    {skill.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map(item => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          id="experience"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">
            Work Experience
          </h2>
          <div className="space-y-6">
            {experiences.map(experience => (
              <Card
                key={experience.company + experience.role}
                className="hover:shadow-xl transition-shadow duration-200"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white">
                        {experience.role}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-slate-700 dark:text-slate-200">
                        {experience.company}
                      </CardDescription>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                      {experience.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-200">
                      {experience.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs font-medium border border-green-200 dark:border-green-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <Card
                key={project.title}
                className="h-full hover:shadow-xl transition-shadow duration-200"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900 dark:text-white">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-200 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs font-medium border border-purple-200 dark:border-purple-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Let&apos;s Connect
          </h2>
          <div className="flex justify-center gap-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              <Github className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              <Linkedin className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              <Mail className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
