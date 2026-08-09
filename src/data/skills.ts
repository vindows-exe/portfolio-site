import type { SkillCategoryGroup } from '@/types/skill';

export const SKILLS: SkillCategoryGroup[] = [
  {
    category: 'language',
    skills: [
      { name: 'Java (SE)', category: 'language', proficiency: 'core' },
      { name: 'TypeScript', category: 'language', proficiency: 'proficient' },
      { name: 'Python', category: 'language', proficiency: 'proficient' },
    ],
  },
  {
    category: 'framework',
    skills: [
      { name: 'Spring Boot', category: 'framework', proficiency: 'core' },
      { name: 'Angular', category: 'framework', proficiency: 'familiar' },
      { name: 'React', category: 'framework', proficiency: 'familiar' },
      { name: 'adSCAILE', category: 'framework', proficiency: 'proficient' },
    ],
  },
  {
    category: 'infrastructure',
    skills: [
      { name: 'Docker', category: 'infrastructure', proficiency: 'proficient' },
      { name: 'Kubernetes', category: 'infrastructure', proficiency: 'familiar' },
      { name: 'MySQL', category: 'infrastructure', proficiency: 'proficient' },
      { name: 'ArcGIS Enterprise', category: 'infrastructure', proficiency: 'proficient' },
    ],
  },
  {
    category: 'tool',
    skills: [
      { name: 'Claude Code', category: 'tool', proficiency: 'core' },
      { name: 'Claude', category: 'tool', proficiency: 'core' },
      { name: 'KI-Agenten', category: 'tool', proficiency: 'core' },
      { name: 'OpenCode', category: 'tool', proficiency: 'proficient' },
      { name: 'Vibe Coding', category: 'tool', proficiency: 'proficient' },
      { name: 'Cesium', category: 'tool', proficiency: 'familiar' },
      { name: 'OpenLayers', category: 'tool', proficiency: 'familiar' },
    ],
  },
  {
    category: 'methodology',
    skills: [
      { name: 'Data Spaces', category: 'methodology', proficiency: 'proficient' },
      { name: 'Requirements Engineering (IREB)', category: 'methodology', proficiency: 'proficient' },
    ],
  },
];
