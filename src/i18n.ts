export const languages = {
  en: 'English',
  es: 'Español'
};

export const defaultLang = 'en';

export const ui = {
  en: {
    title: 'Alon Tools',
    privacy: 'Everything runs locally in your browser',
    development: 'Development',
    images: 'Images',
    internet: 'Internet & Maps',
    writing: 'Writing'
  },
  es: {
    title: 'Alon Tools',
    privacy: 'Todo se ejecuta localmente en tu navegador',
    development: 'Desarrollo',
    images: 'Imágenes',
    internet: 'Internet y mapas',
    writing: 'Texto y escritura'
  }
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui.en) {
    return ui[lang][key] || ui.en[key];
  };
}
