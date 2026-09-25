export interface PersonalData {
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  location: string;
  license: string;
  gender: string;
  nationality: string;
  civilStatus: string;
  portfolio: string;
  portfolioUrl: string;
  github: string;
  githubUrl: string;
}

export interface SkillItem {
  id: string;
  name: string;
  rating: number; // 1-5
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'hardware' | 'cloud';
}

export interface EducationItem {
  id: string;
  title: string;
  period: string;
  institution: string;
  description?: string;
  certificateLink?: string;
  certificateId?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  period: string;
  location: string;
  description: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  period: string;
  issuer: string;
  duration?: string;
  description: string;
  link: string;
  category: 'web-development' | 'telecom' | 'agile' | 'ai' | 'hardware';
  code?: string;
  imageUrl: string;
}

export interface ProjectTechnology {
  name: string;
  category?: 'frontend' | 'backend' | 'database' | 'tool';
}

export interface ProjectImageSection {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  sections: ProjectImageSection[];
  technologies: ProjectTechnology[];
  role: string;
  period: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface CVData {
  personal: PersonalData;
  profileSummary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  certificates: CertificateItem[];
  skills: SkillItem[];
  hobbies: string[];
  aptitudes: string[];
  consentNote: string;
  projects?: ProjectItem[];
}
