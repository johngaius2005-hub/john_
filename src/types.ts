export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  logo: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  stats?: { label: string; value: string };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
