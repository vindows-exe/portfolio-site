import type { SkillCategoryGroup } from '@/types/skill';

export const SKILLS: SkillCategoryGroup[] = [
  {
    category: 'language',
    label: 'Languages',
    skills: [
      { name: 'Java', category: 'language', proficiency: 'core' },
      { name: 'Go', category: 'language', proficiency: 'core' },
      { name: 'TypeScript', category: 'language', proficiency: 'proficient' },
    ],
  },
  {
    category: 'framework',
    label: 'Frameworks',
    skills: [{ name: 'Spring Boot', category: 'framework', proficiency: 'core' }],
  },
  {
    category: 'infrastructure',
    label: 'Infrastructure',
    skills: [
      { name: 'Docker', category: 'infrastructure', proficiency: 'core' },
      { name: 'Kubernetes', category: 'infrastructure', proficiency: 'core' },
      { name: 'Terraform', category: 'infrastructure', proficiency: 'proficient' },
      { name: 'AWS', category: 'infrastructure', proficiency: 'core' },
    ],
  },
  {
    category: 'quality-assurance',
    label: 'Quality Assurance',
    skills: [
      { name: 'Testcontainers', category: 'quality-assurance', proficiency: 'proficient' },
      { name: 'JUnit', category: 'quality-assurance', proficiency: 'core' },
      { name: 'k6', category: 'quality-assurance', proficiency: 'familiar' },
    ],
  },
];
