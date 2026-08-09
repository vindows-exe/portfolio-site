export const GITHUB_USERNAME = 'vindows-exe';
export const GITHUB_CACHE_TTL_MS = 1000 * 60 * 60; // 1h
export const SITE_URL = 'https://vindows.dev';
export const NAV_ITEMS = [
  { id: 'projects', labelKey: 'nav.projects', href: '/#projects' as const },
  { id: 'skills', labelKey: 'nav.skills', href: '/#skills' as const },
  { id: 'github', labelKey: 'nav.github', href: '/#github' as const },
  { id: 'blog', labelKey: 'nav.blog', href: '/#blog' as const },
  { id: 'certificates', labelKey: 'nav.certificates', href: '/#certificates' as const },
] as const;
