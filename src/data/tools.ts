import type { Lang } from '../i18n/ui';

export type ToolPrivacy = 'local' | 'external-api';
export type ToolCategoryId = 'development' | 'images' | 'internet' | 'writing' | 'finance';
export type LocalizedToolText = { title: string; description: string };
export type ToolDefinition = { id: string; slug: string; category: ToolCategoryId; icon: string; privacy: ToolPrivacy; apiProvider?: string; search?: string; text: Record<Lang, LocalizedToolText> };

export const toolCategoryLabels: Record<ToolCategoryId, Record<Lang, string>> = {
  development: { en: 'Development', es: 'Desarrollo' },
  images: { en: 'Images', es: 'Imágenes' },
  internet: { en: 'Internet & maps', es: 'Internet y mapas' },
  writing: { en: 'Text & writing', es: 'Texto y escritura' },
  finance: { en: 'Finance', es: 'Finanzas' }
};
export const privacyLabels: Record<ToolPrivacy, Record<Lang, string>> = { local: { en: '100% local', es: '100% local' }, 'external-api': { en: 'External API', es: 'API externa' } };

const tool = (id: string, category: ToolCategoryId, icon: string, privacy: ToolPrivacy, enTitle: string, enDescription: string, esTitle: string, esDescription: string, options: Pick<ToolDefinition, 'apiProvider' | 'search'> = {}): ToolDefinition => ({ id, slug: id, category, icon, privacy, ...options, text: { en: { title: enTitle, description: enDescription }, es: { title: esTitle, description: esDescription } } });

export const tools: ToolDefinition[] = [
  tool('currency-converter','finance','FX','external-api','Currency converter','Convert amounts between currencies with Frankfurter, exchange date, swap action and copyable result.','Conversor de divisas','Convierte importes entre monedas con Frankfurter, fecha del cambio, inversión y copia del resultado.',{apiProvider:'Frankfurter',search:'currency converter divisas monedas frankfurter exchange rate cambio forex eur usd gbp'}),
  tool('simple-postman','development','HTTP','external-api','SimplePostman','A reduced HTTP client to build requests, generate cURL and inspect responses in the browser.','SimplePostman','Cliente HTTP reducido para crear peticiones, generar cURL y ver respuestas desde el navegador.',{search:'postman api http curl fetch request response headers auth bearer basic cors'}),
  tool('screenshot-enhancer','images','SHOT','local','Screenshot enhancer','Turn screenshots into polished images with backgrounds, colors and PNG, JPG, WebP or SVG exports.','Mejorador de capturas','Convierte capturas en imágenes profesionales con fondos, colores y exportación PNG, JPG, WebP o SVG.',{search:'screenshot capture captura imagen fondos svg'}),
  tool('background-remover','images','BG','local','Image background remover','Remove image backgrounds locally in the browser with Transformers.js and briaai/RMBG-1.4.','Quitar fondo de una imagen','Elimina fondos de imágenes localmente en el navegador con Transformers.js y briaai/RMBG-1.4.',{search:'remove background quitar fondo imagen transparent png transformers briaai rmbg ai local'}),
  tool('uuid-generator','development','UUID','local','UUID and random key generator','Generate UUID v4 values and random strings with Web Crypto, fully local in the browser.','Generador de UUID y claves','Genera UUID v4 y cadenas aleatorias con Web Crypto, todo local en el navegador.',{search:'uuid random key clave token crypto'}),
  tool('password-generator','development','PASS','local','Password and passphrase generator','Create passwords and secure passphrases without storing data or making network calls.','Generador de contraseñas','Crea contraseñas y frases seguras sin guardar datos ni hacer llamadas de red.',{search:'password contraseña passphrase seguridad crypto'}),
  tool('robots-sitemap-generator','internet','SEO','local','Robots.txt and sitemap generator','Create robots.txt and a basic XML sitemap from pasted URLs, without crawling or server requests.','Generador de robots.txt y sitemap','Crea robots.txt y un sitemap XML básico pegando URLs manualmente, sin rastrear ni consultar servidores.',{search:'robots sitemap xml seo crawler rastreo'}),
  tool('meta-tags-generator','internet','META','local','Meta tags and Open Graph generator','Generate title, description, canonical, Open Graph and Twitter Cards with a local preview.','Generador de meta tags y Open Graph','Genera title, description, canonical, Open Graph y Twitter Cards con vista previa local.',{search:'meta tags open graph twitter cards seo title description canonical'}),
  tool('yaml-formatter','development','YAML','local','YAML formatter and validator','Validate, format and convert YAML and JSON locally in your browser.','Formateador y validador YAML','Valida, formatea y convierte YAML y JSON localmente en tu navegador.',{search:'yaml yml formatter validator parser json convert convertir validar formatear'}),
  tool('app-icon-generator','images','APP','local','App icon generator','Create app icons with images, text, borders and local ZIP exports.','Generador de iconos para apps','Crea iconos para apps con imagen, texto, bordes y exportación ZIP local.'),
  tool('base64','development','64','local','Base64 encoder & decoder','Encode plain text to Base64 and decode it locally in your browser.','Codificador y decodificador Base64','Codifica texto plano a Base64 y decodifícalo localmente en tu navegador.'),
  tool('character-counter','writing','ABC','local','Character counter','Count characters, words, sentences and repeated terms.','Contador de caracteres','Cuenta caracteres, palabras, frases y términos repetidos.'),
  tool('code-formatter','development','CODE','local','HTML/CSS/JS formatter','Format and minify code snippets locally.','Formateador HTML/CSS/JS','Formatea y minifica fragmentos de código localmente.'),
  tool('csv-converter','development','CSV','local','CSV parser & converter','Preview CSV and convert it to JSON, Markdown or HTML.','Parser y conversor CSV','Previsualiza CSV y conviértelo a JSON, Markdown o HTML.'),
  tool('curl-builder','development','API','local','cURL builder','Generate HTTP requests and code snippets.','Generador cURL','Genera peticiones HTTP y fragmentos de código.'),
  tool('css-color-converter','development','COLOR','local','CSS color converter','Convert HEX, RGB, HSL, HWB and CSS color names.','Convertidor de colores CSS','Convierte HEX, RGB, HSL, HWB y nombres de color CSS.'),
  tool('diff-checker','development','DIFF','local','Diff checker','Compare two texts quickly in your browser.','Comparador diff','Compara dos textos rápidamente en tu navegador.'),
  tool('dns-lookup','internet','DNS','external-api','DNS lookup','Query DNS records with Google Public DNS.','Consulta DNS','Consulta registros DNS con Google Public DNS.',{apiProvider:'Google Public DNS'}),
  tool('favicon-generator','images','ICO','local','Favicon generator','Create favicons from text or images.','Generador de favicons','Crea favicons a partir de texto o imágenes.'),
  tool('geocoder','internet','MAP','external-api','Address coordinates','Find GPS coordinates from an address.','Coordenadas de direcciones','Obtén coordenadas GPS a partir de una dirección.',{apiProvider:'OpenStreetMap Nominatim'}),
  tool('image-compressor','images','ZIP','local','Image compressor','Reduce image file size locally.','Compresor de imágenes','Reduce el tamaño de imágenes localmente.'),
  tool('image-converter','images','CONV','local','Image converter','Convert between PNG, JPEG and WebP.','Conversor de imágenes','Convierte entre PNG, JPEG y WebP.'),
  tool('image-info','images','IMG','local','Image information','Inspect image dimensions and metadata locally.','Información de imágenes','Consulta dimensiones y metadatos de imágenes localmente.'),
  tool('ip-info','internet','IP','external-api','IP information','Look up technical IP information.','Información de IP','Consulta información técnica sobre una IP.',{apiProvider:'ipwho.is'}),
  tool('json-viewer','development','{}','local','JSON viewer & formatter','View, validate and format JSON locally.','Visor y formateador JSON','Visualiza, valida y formatea JSON localmente.'),
  tool('jwt-decoder','development','JWT','local','JWT decoder','Decode JWT tokens locally in your browser.','Decodificador JWT','Decodifica tokens JWT localmente en tu navegador.'),
  tool('lorem-ipsum','writing','TXT','local','Lorem Ipsum generator','Generate filler text by letters, paragraphs or pages.','Generador de Lorem Ipsum','Genera texto de relleno por letras, párrafos o páginas.'),
  tool('markdown-preview','writing','MD','local','Markdown writer & preview','Markdown editor with live preview.','Editor y vista previa Markdown','Editor Markdown con vista previa en vivo.'),
  tool('md5','development','MD5','local','MD5 generator','Generate MD5 hashes in the browser.','Generador MD5','Genera hashes MD5 en el navegador.'),
  tool('photo-censor','images','CEN','local','Photo censor','Pixelate, blur or cover image areas locally.','Censurador de fotos','Pixela, difumina o tapa zonas de una imagen localmente.'),
  tool('qr-code','images','QR','local','QR code generator & reader','Generate QR codes and read local QR images.','Generador y lector QR','Genera códigos QR y lee imágenes QR locales.'),
  tool('social-preview','internet','SOC','external-api','Social URL preview','Check Open Graph and Twitter Cards.','Vista previa social de URLs','Comprueba Open Graph y Twitter Cards.'),
  tool('sql-formatter','development','SQL','local','SQL formatter','Format, minify and export SQL queries locally.','Formateador SQL','Formatea, minifica y exporta consultas SQL localmente.'),
  tool('svg-placeholder','images','SVG','local','SVG placeholder generator','Create SVG placeholders and data URLs.','Generador de placeholders SVG','Crea placeholders SVG y data URLs.'),
  tool('timestamp-converter','development','TIME','local','Timestamp & timezone converter','Convert Unix timestamps, ISO dates and time zones.','Conversor de timestamps y zonas horarias','Convierte timestamps Unix, fechas ISO y zonas horarias.'),
  tool('url-encoder','development','ENC','local','URL encoder & decoder','Encode URLs and query parameters.','Codificador y decodificador URL','Codifica URLs y parámetros de consulta.'),
  tool('url-inspector','development','URL','local','URL inspector','Analyze URLs for developers.','Inspector de URLs','Analiza URLs para desarrolladores.'),
  tool('vat-calculator','finance','VAT','local','VAT calculator','Calculate VAT from prices with or without tax.','Calculadora de IVA','Calcula el IVA a partir de precios con o sin impuesto.'),
  tool('xml-formatter','development','XML','local','XML formatter & validator','Format, validate and minify XML locally.','Formateador y validador XML','Formatea, valida y minifica XML localmente.')
];

export type LocalizedTool = ToolDefinition & { title: string; description: string; categoryLabel: string; privacyLabel: string; path: `/${string}/` };
export type ToolCategoryGroup = { id: ToolCategoryId; title: string; items: LocalizedTool[] };
export const getLocalizedTools = (lang: Lang): LocalizedTool[] => tools.map((item) => ({ ...item, title: item.text[lang].title, description: item.text[lang].description, categoryLabel: toolCategoryLabels[item.category][lang], privacyLabel: privacyLabels[item.privacy][lang], path: `/${item.slug}/` }));
export const getToolsByCategory = (lang: Lang): ToolCategoryGroup[] => {
  const localizedTools = getLocalizedTools(lang);
  return (Object.keys(toolCategoryLabels) as ToolCategoryId[]).map((categoryId) => ({ id: categoryId, title: toolCategoryLabels[categoryId][lang], items: localizedTools.filter((item) => item.category === categoryId) })).filter((category) => category.items.length > 0);
};
