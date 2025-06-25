export interface PersonalInfo {
  name: string;
  title: string;
  experience: string;
  location: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  resumeUrl?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  achievements: string[];
  technologies: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export interface Contact {
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
