export type Language = 'en' | 'de';

export type ProjectCategory = 'all' | 'automotive' | 'embedded' | 'power_electronics' | 'robotics' | 'iot_hardware';

export interface Project {
  id: string;
  title: string;
  subtitle: {
    en: string;
    de: string;
  };
  category: ProjectCategory;
  tags: string[];
  summary: {
    en: string;
    de: string;
  };
  challenge: {
    en: string;
    de: string;
  };
  solution: {
    en: string;
    de: string;
  };
  architecture: string[];
  hardwareSpecs: Array<{ label: string; value: string }>;
  protocols: string[];
  standards: string[];
  metrics: Array<{ label: string; value: string }>;
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: {
    en: string;
    de: string;
  };
  organization: string;
  location: string;
  period: {
    en: string;
    de: string;
  };
  type: 'industry' | 'academic' | 'competition' | 'internship';
  description: {
    en: string;
    de: string;
  };
  highlights: {
    en: string[];
    de: string[];
  };
  techStack: string[];
  standards?: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  note: {
    en: string;
    de: string;
  };
  tags: string[];
}

export interface SkillCategory {
  id: string;
  title: {
    en: string;
    de: string;
  };
  iconName: string;
  skills: SkillItem[];
}

export interface AwardItem {
  id: string;
  title: {
    en: string;
    de: string;
  };
  event: string;
  organizer: string;
  year: string;
  description: {
    en: string;
    de: string;
  };
  badge: string;
}

export interface ArticleItem {
  id: string;
  title: {
    en: string;
    de: string;
  };
  summary: {
    en: string;
    de: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  keyTakeaways: {
    en: string[];
    de: string[];
  };
}

export interface CANFrame {
  id: string;
  name: string;
  dlc: number;
  data: string[];
  cycleTimeMs: number;
  decoded: {
    signal: string;
    value: number | string;
    unit: string;
  }[];
  timestamp: string;
  count: number;
}
