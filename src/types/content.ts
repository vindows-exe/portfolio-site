import type { ProjectKPI } from './project';

export interface BlogPost {
  title: string;
  description: string;
  publishedAt: Date;
  draft?: boolean;
  tags?: string[];
}

export interface ProjectEntry {
  title: string;
  slug: string;
  problem: string;
  solution: string;
  stack: string[];
  kpis: ProjectKPI[];
  repoUrl: string;
  requirementsUrl?: string;
  architectureUrl?: string;
  featured?: boolean;
  order?: number;
}
