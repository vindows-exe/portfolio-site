import { en } from './en';
import { de } from './de';

export type Locale = 'en' | 'de';
export type TranslationKey = keyof typeof en;

const translations: Record<Locale, Record<TranslationKey, string>> = { en, de } as const;

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}

export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'de';
}

export function localeFromPath(path: string): Locale {
  if (path.startsWith('/de')) return 'de';
  return 'en';
}

export function localizedUrl(url: string, targetLocale: Locale): string {
  if (targetLocale === 'en') return url.replace(/^\/de/, '') || '/';
  if (url === '/' || !url.startsWith('/de')) return `/de${url}`;
  return url;
}
