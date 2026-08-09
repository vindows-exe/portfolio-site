import type { SkillCategoryGroup } from '@/types/skill';

export const SKILLS: SkillCategoryGroup[] = [
  {
    category: 'language',
    skills: [
      { name: 'Java', category: 'language', proficiency: 'core' },
      { name: 'Go', category: 'language', proficiency: 'core' },
      { name: 'TypeScript', category: 'language', proficiency: 'proficient' },
    ],
  },
  {
    category: 'framework',
    skills: [{ name: 'Spring Boot', category: 'framework', proficiency: 'core' }],
  },
  {
    category: 'infrastructure',
    skills: [
      { name: 'Docker', category: 'infrastructure', proficiency: 'core' },
      { name: 'Kubernetes', category: 'infrastructure', proficiency: 'core' },
      { name: 'Terraform', category: 'infrastructure', proficiency: 'proficient' },
      { name: 'AWS', category: 'infrastructure', proficiency: 'core' },
    ],
  },
  {
    category: 'quality-assurance',
    skills: [
      { name: 'Testcontainers', category: 'quality-assurance', proficiency: 'proficient' },
      { name: 'JUnit', category: 'quality-assurance', proficiency: 'core' },
      { name: 'k6', category: 'quality-assurance', proficiency: 'familiar' },
    ],
  },
];
