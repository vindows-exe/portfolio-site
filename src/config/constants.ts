export const GITHUB_USERNAME = 'vindows';
export const GITHUB_CACHE_TTL_MS = 1000 * 60 * 60; // 1h
export const SITE_URL = 'https://REPLACE-WITH-FINAL-DOMAIN.dev';
export const NAV_ITEMS = [
  { id: 'projects', label: 'Projects', labelKey: 'nav.projects', href: '/#projects' as const },
  { id: 'skills', label: 'Skills', labelKey: 'nav.skills', href: '/#skills' as const },
  { id: 'github', label: 'GitHub', labelKey: 'nav.github', href: '/#github' as const },
  { id: 'blog', label: 'Blog', labelKey: 'nav.blog', href: '/#blog' as const },
  { id: 'certificates', label: 'Certificates', labelKey: 'nav.certificates', href: '/#certificates' as const },
] as const;
