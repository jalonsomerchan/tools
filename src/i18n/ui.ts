export const languages = {
  en: 'English',
  es: 'Español'
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.tools': 'All tools',
    'nav.guides': 'Guides',
    'nav.images': 'Images',
    'nav.curl': 'cURL',
    'nav.json': 'JSON',
    'nav.theme': 'Theme',
    'nav.main': 'Main navigation',
    'nav.menu': 'Open navigation menu',
    'nav.language': 'Language selector',
    'nav.toggleTheme': 'Toggle light or dark mode',
    'footer.description': 'Fast, private and lightweight tools built with Astro.',
    'footer.links': 'Footer links',
    'site.description': 'Privacy-first browser tools. Everything runs locally on your device without uploading files.',
    'home.title': 'Fast browser tools that respect your privacy',
    'home.description': 'Developer, image and internet utilities that run locally in your browser. No backend, no accounts, no cloud uploads.',
    'home.eyebrow': 'Privacy First',
    'category.development': 'Development',
    'category.images': 'Images',
    'category.internet': 'Internet & maps',
    'category.writing': 'Text & writing'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.tools': 'Herramientas',
    'nav.guides': 'Guías',
    'nav.images': 'Imágenes',
    'nav.curl': 'cURL',
    'nav.json': 'JSON',
    'nav.theme': 'Tema',
    'nav.main': 'Navegación principal',
    'nav.menu': 'Abrir menú de navegación',
    'nav.language': 'Selector de idioma',
    'nav.toggleTheme': 'Cambiar modo claro u oscuro',
    'footer.description': 'Herramientas rápidas, privadas y ligeras creadas con Astro.',
    'footer.links': 'Enlaces del pie',
    'site.description': 'Herramientas privadas para el navegador. Todo se ejecuta localmente en tu dispositivo sin subir archivos.',
    'home.title': 'Herramientas rápidas para el navegador que respetan tu privacidad',
    'home.description': 'Utilidades para desarrollo, imágenes e internet que funcionan localmente en tu navegador. Sin backend, sin cuentas y sin subir archivos a la nube.',
    'home.eyebrow': 'Privacy First',
    'category.development': 'Desarrollo',
    'category.images': 'Imágenes',
    'category.internet': 'Internet y mapas',
    'category.writing': 'Texto y escritura'
  }
} as const;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  return lang === 'es' ? 'es' : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui.en) {
    return ui[lang][key] || ui.en[key] || key;
  };
}

export function getLocalizedPath(path: string, lang: Lang) {
  if (lang === defaultLang) return path;
  return `/${lang}${path === '/' ? '' : path}`;
}
