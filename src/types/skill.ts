export type SkillCategory = 'language' | 'framework' | 'infrastructure' | 'quality-assurance';

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
  proficiency?: 'core' | 'proficient' | 'familiar';
  href?: string;
}

export interface SkillCategoryGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
}
