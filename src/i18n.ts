import en from './i18n/en.json';
import es from './i18n/es.json';

export const languages = {
  en: 'English',
  es: 'Español'
} as const;

export const defaultLang = 'en';

export const translations = {
  en,
  es
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof en;

export function getLangFromPath(pathname: string): Language {
  return pathname.startsWith('/es') ? 'es' : 'en';
}

export function localizedPath(path: string, lang: Language): string {
  if (lang === 'es') {
    return `/es${path === '/' ? '' : path}`;
  }

  return path;
}

export function useTranslations(lang: Language = defaultLang) {
  return function t(key: TranslationKey | string) {
    return translations[lang]?.[key as TranslationKey]
      || translations.en[key as TranslationKey]
      || key;
  };
}
