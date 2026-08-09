export type SkillCategory = 'language' | 'framework' | 'infrastructure' | 'tool' | 'methodology' | 'quality-assurance';

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
  proficiency?: 'core' | 'proficient' | 'familiar';
  href?: string;
}

export interface SkillCategoryGroup {
  category: SkillCategory;
  skills: Skill[];
}
