export interface ProjectKPI {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ProjectCardProps {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  stack: string[];
  kpis: ProjectKPI[];
  repoUrl: string;
  requirementsUrl?: string;
  architectureUrl?: string;
  diagramPreview?: { src: string; alt: string };
  featured?: boolean;
}

export interface C4Layer {
  id: 'context' | 'container' | 'component';
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface C4ViewerProps {
  projectSlug: string;
  layers: C4Layer[];
  defaultLayer?: C4Layer['id'];
}
