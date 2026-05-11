import type { Lang } from '../i18n/ui';

export type ToolPrivacy = 'local' | 'external-api';

export type ToolCategoryId = 'development' | 'images' | 'internet' | 'writing' | 'finance';

export type LocalizedToolText = {
  title: string;
  description: string;
};

export type ToolDefinition = {
  id: string;
  slug: string;
  category: ToolCategoryId;
  icon: string;
  privacy: ToolPrivacy;
  apiProvider?: string;
  search?: string;
  text: Record<Lang, LocalizedToolText>;
};

export const toolCategoryLabels: Record<ToolCategoryId, Record<Lang, string>> = {
  development: {
    en: 'Development',
    es: 'Desarrollo'
  },
  images: {
    en: 'Images',
    es: 'Imágenes'
  },
  internet: {
    en: 'Internet & maps',
    es: 'Internet y mapas'
  },
  writing: {
    en: 'Text & writing',
    es: 'Texto y escritura'
  },
  finance: {
    en: 'Finance',
    es: 'Finanzas'
  }
};

export const privacyLabels: Record<ToolPrivacy, Record<Lang, string>> = {
  local: {
    en: '100% local',
    es: '100% local'
  },
  'external-api': {
    en: 'External API',
    es: 'API externa'
  }
};

export const tools: ToolDefinition[] = [
  {
    id: 'currency-converter',
    slug: 'currency-converter',
    category: 'finance',
    icon: 'FX',
    privacy: 'external-api',
    apiProvider: 'Frankfurter',
    search: 'currency converter divisas monedas frankfurter exchange rate cambio forex eur usd gbp',
    text: {
      en: {
        title: 'Currency converter',
        description: 'Convert amounts between currencies with Frankfurter, exchange date, swap action and copyable result.'
      },
      es: {
        title: 'Conversor de divisas',
        description: 'Convierte importes entre monedas con Frankfurter, fecha del cambio, inversión y copia del resultado.'
      }
    }
  },
  {
    id: 'simple-postman',
    slug: 'simple-postman',
    category: 'development',
    icon: 'HTTP',
    privacy: 'external-api',
    search: 'postman api http curl fetch request response headers auth bearer basic cors',
    text: {
      en: {
        title: 'SimplePostman',
        description: 'A reduced HTTP client to build requests, generate cURL and inspect responses in the browser.'
      },
      es: {
        title: 'SimplePostman',
        description: 'Cliente HTTP reducido para crear peticiones, generar cURL y ver respuestas desde el navegador.'
      }
    }
  },
  {
    id: 'screenshot-enhancer',
    slug: 'screenshot-enhancer',
    category: 'images',
    icon: 'SHOT',
    privacy: 'local',
    search: 'screenshot capture captura imagen fondos svg',
    text: {
      en: {
        title: 'Screenshot enhancer',
        description: 'Turn screenshots into polished images with backgrounds, colors and PNG, JPG, WebP or SVG exports.'
      },
      es: {
        title: 'Mejorador de capturas',
        description: 'Convierte capturas en imágenes profesionales con fondos, colores y exportación PNG, JPG, WebP o SVG.'
      }
    }
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    category: 'development',
    icon: 'UUID',
    privacy: 'local',
    search: 'uuid random key clave token crypto',
    text: {
      en: {
        title: 'UUID and random key generator',
        description: 'Generate UUID v4 values and random strings with Web Crypto, fully local in the browser.'
      },
      es: {
        title: 'Generador de UUID y claves',
        description: 'Genera UUID v4 y cadenas aleatorias con Web Crypto, todo local en el navegador.'
      }
    }
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    category: 'development',
    icon: 'PASS',
    privacy: 'local',
    search: 'password contraseña passphrase seguridad crypto',
    text: {
      en: {
        title: 'Password and passphrase generator',
        description: 'Create passwords and secure passphrases without storing data or making network calls.'
      },
      es: {
        title: 'Generador de contraseñas',
        description: 'Crea contraseñas y frases seguras sin guardar datos ni hacer llamadas de red.'
      }
    }
  },
  {
    id: 'robots-sitemap-generator',
    slug: 'robots-sitemap-generator',
    category: 'internet',
    icon: 'SEO',
    privacy: 'local',
    search: 'robots sitemap xml seo crawler rastreo',
    text: {
      en: {
        title: 'Robots.txt and sitemap generator',
        description: 'Create robots.txt and a basic XML sitemap from pasted URLs, without crawling or server requests.'
      },
      es: {
        title: 'Generador de robots.txt y sitemap',
        description: 'Crea robots.txt y un sitemap XML básico pegando URLs manualmente, sin rastrear ni consultar servidores.'
      }
    }
  },
  {
    id: 'meta-tags-generator',
    slug: 'meta-tags-generator',
    category: 'internet',
    icon: 'META',
    privacy: 'local',
    search: 'meta tags open graph twitter cards seo title description canonical',
    text: {
      en: {
        title: 'Meta tags and Open Graph generator',
        description: 'Generate title, description, canonical, Open Graph and Twitter Cards with a local preview.'
      },
      es: {
        title: 'Generador de meta tags y Open Graph',
        description: 'Genera title, description, canonical, Open Graph y Twitter Cards con vista previa local.'
      }
    }
  },
  {
    id: 'app-icon-generator',
    slug: 'app-icon-generator',
    category: 'images',
    icon: 'APP',
    privacy: 'local',
    text: {
      en: {
        title: 'App icon generator',
        description: 'Create app icons with images, text, borders and local ZIP exports.'
      },
      es: {
        title: 'Generador de iconos para apps',
        description: 'Crea iconos para apps con imagen, texto, bordes y exportación ZIP local.'
      }
    }
  },
  {
    id: 'base64',
    slug: 'base64',
    category: 'development',
    icon: '64',
    privacy: 'local',
    text: {
      en: {
        title: 'Base64 encoder & decoder',
        description: 'Encode plain text to Base64 and decode it locally in your browser.'
      },
      es: {
        title: 'Codificador y decodificador Base64',
        description: 'Codifica texto plano a Base64 y decodifícalo localmente en tu navegador.'
      }
    }
  },
  {
    id: 'character-counter',
    slug: 'character-counter',
    category: 'writing',
    icon: 'ABC',
    privacy: 'local',
    text: {
      en: {
        title: 'Character counter',
        description: 'Count characters, words, sentences and repeated terms.'
      },
      es: {
        title: 'Contador de caracteres',
        description: 'Cuenta caracteres, palabras, frases y términos repetidos.'
      }
    }
  },
  {
    id: 'code-formatter',
    slug: 'code-formatter',
    category: 'development',
    icon: 'CODE',
    privacy: 'local',
    text: {
      en: {
        title: 'HTML/CSS/JS formatter',
        description: 'Format and minify code snippets locally.'
      },
      es: {
        title: 'Formateador HTML/CSS/JS',
        description: 'Formatea y minifica fragmentos de código localmente.'
      }
    }
  },
  {
    id: 'csv-converter',
    slug: 'csv-converter',
    category: 'development',
    icon: 'CSV',
    privacy: 'local',
    text: {
      en: {
        title: 'CSV parser & converter',
        description: 'Preview CSV and convert it to JSON, Markdown or HTML.'
      },
      es: {
        title: 'Parser y conversor CSV',
        description: 'Previsualiza CSV y conviértelo a JSON, Markdown o HTML.'
      }
    }
  },
  {
    id: 'curl-builder',
    slug: 'curl-builder',
    category: 'development',
    icon: 'API',
    privacy: 'local',
    text: {
      en: {
        title: 'cURL builder',
        description: 'Generate HTTP requests and code snippets.'
      },
      es: {
        title: 'Generador cURL',
        description: 'Genera peticiones HTTP y fragmentos de código.'
      }
    }
  },
  {
    id: 'css-color-converter',
    slug: 'css-color-converter',
    category: 'development',
    icon: 'COLOR',
    privacy: 'local',
    text: {
      en: {
        title: 'CSS color converter',
        description: 'Convert HEX, RGB, HSL, HWB and CSS color names.'
      },
      es: {
        title: 'Convertidor de colores CSS',
        description: 'Convierte HEX, RGB, HSL, HWB y nombres de color CSS.'
      }
    }
  },
  {
    id: 'diff-checker',
    slug: 'diff-checker',
    category: 'development',
    icon: 'DIFF',
    privacy: 'local',
    text: {
      en: {
        title: 'Diff checker',
        description: 'Compare two texts quickly in your browser.'
      },
      es: {
        title: 'Comparador diff',
        description: 'Compara dos textos rápidamente en tu navegador.'
      }
    }
  },
  {
    id: 'dns-lookup',
    slug: 'dns-lookup',
    category: 'internet',
    icon: 'DNS',
    privacy: 'external-api',
    apiProvider: 'Google Public DNS',
    text: {
      en: {
        title: 'DNS lookup',
        description: 'Query DNS records with Google Public DNS.'
      },
      es: {
        title: 'Consulta DNS',
        description: 'Consulta registros DNS con Google Public DNS.'
      }
    }
  },
  {
    id: 'favicon-generator',
    slug: 'favicon-generator',
    category: 'images',
    icon: 'ICO',
    privacy: 'local',
    text: {
      en: {
        title: 'Favicon generator',
        description: 'Create favicons from text or images.'
      },
      es: {
        title: 'Generador de favicons',
        description: 'Crea favicons a partir de texto o imágenes.'
      }
    }
  },
  {
    id: 'geocoder',
    slug: 'geocoder',
    category: 'internet',
    icon: 'MAP',
    privacy: 'external-api',
    apiProvider: 'OpenStreetMap Nominatim',
    text: {
      en: {
        title: 'Address coordinates',
        description: 'Find GPS coordinates from an address.'
      },
      es: {
        title: 'Coordenadas de direcciones',
        description: 'Obtén coordenadas GPS a partir de una dirección.'
      }
    }
  },
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    category: 'images',
    icon: 'ZIP',
    privacy: 'local',
    text: {
      en: {
        title: 'Image compressor',
        description: 'Reduce image file size locally.'
      },
      es: {
        title: 'Compresor de imágenes',
        description: 'Reduce el tamaño de imágenes localmente.'
      }
    }
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    category: 'images',
    icon: 'CONV',
    privacy: 'local',
    text: {
      en: {
        title: 'Image converter',
        description: 'Convert between PNG, JPEG and WebP.'
      },
      es: {
        title: 'Conversor de imágenes',
        description: 'Convierte entre PNG, JPEG y WebP.'
      }
    }
  },
  {
    id: 'image-info',
    slug: 'image-info',
    category: 'images',
    icon: 'IMG',
    privacy: 'local',
    text: {
      en: {
        title: 'Image information',
        description: 'Inspect image dimensions and metadata locally.'
      },
      es: {
        title: 'Información de imágenes',
        description: 'Consulta dimensiones y metadatos de imágenes localmente.'
      }
    }
  },
  {
    id: 'ip-info',
    slug: 'ip-info',
    category: 'internet',
    icon: 'IP',
    privacy: 'external-api',
    apiProvider: 'ipwho.is',
    text: {
      en: {
        title: 'IP information',
        description: 'Look up technical IP information.'
      },
      es: {
        title: 'Información de IP',
        description: 'Consulta información técnica sobre una IP.'
      }
    }
  },
  {
    id: 'json-viewer',
    slug: 'json-viewer',
    category: 'development',
    icon: '{}',
    privacy: 'local',
    text: {
      en: {
        title: 'JSON viewer & formatter',
        description: 'View, validate and format JSON locally.'
      },
      es: {
        title: 'Visor y formateador JSON',
        description: 'Visualiza, valida y formatea JSON localmente.'
      }
    }
  },
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    category: 'development',
    icon: 'JWT',
    privacy: 'local',
    text: {
      en: {
        title: 'JWT decoder',
        description: 'Decode JWT tokens locally in your browser.'
      },
      es: {
        title: 'Decodificador JWT',
        description: 'Decodifica tokens JWT localmente en tu navegador.'
      }
    }
  },
  {
    id: 'lorem-ipsum',
    slug: 'lorem-ipsum',
    category: 'writing',
    icon: 'TXT',
    privacy: 'local',
    text: {
      en: {
        title: 'Lorem Ipsum generator',
        description: 'Generate filler text by letters, paragraphs or pages.'
      },
      es: {
        title: 'Generador de Lorem Ipsum',
        description: 'Genera texto de relleno por letras, párrafos o páginas.'
      }
    }
  },
  {
    id: 'markdown-preview',
    slug: 'markdown-preview',
    category: 'writing',
    icon: 'MD',
    privacy: 'local',
    text: {
      en: {
        title: 'Markdown writer & preview',
        description: 'Markdown editor with live preview.'
      },
      es: {
        title: 'Editor y vista previa Markdown',
        description: 'Editor Markdown con vista previa en vivo.'
      }
    }
  },
  {
    id: 'md5',
    slug: 'md5',
    category: 'development',
    icon: 'MD5',
    privacy: 'local',
    text: {
      en: {
        title: 'MD5 generator',
        description: 'Generate MD5 hashes in the browser.'
      },
      es: {
        title: 'Generador MD5',
        description: 'Genera hashes MD5 en el navegador.'
      }
    }
  },
  {
    id: 'photo-censor',
    slug: 'photo-censor',
    category: 'images',
    icon: 'CEN',
    privacy: 'local',
    text: {
      en: {
        title: 'Photo censor',
        description: 'Pixelate, blur or cover image areas locally.'
      },
      es: {
        title: 'Censurador de fotos',
        description: 'Pixela, difumina o tapa zonas de una imagen localmente.'
      }
    }
  },
  {
    id: 'qr-code',
    slug: 'qr-code',
    category: 'images',
    icon: 'QR',
    privacy: 'local',
    text: {
      en: {
        title: 'QR code generator & reader',
        description: 'Generate QR codes and read local QR images.'
      },
      es: {
        title: 'Generador y lector QR',
        description: 'Genera códigos QR y lee imágenes QR locales.'
      }
    }
  },
  {
    id: 'social-preview',
    slug: 'social-preview',
    category: 'internet',
    icon: 'SOC',
    privacy: 'external-api',
    text: {
      en: {
        title: 'Social URL preview',
        description: 'Check Open Graph and Twitter Cards.'
      },
      es: {
        title: 'Vista previa social de URLs',
        description: 'Comprueba Open Graph y Twitter Cards.'
      }
    }
  },
  {
    id: 'sql-formatter',
    slug: 'sql-formatter',
    category: 'development',
    icon: 'SQL',
    privacy: 'local',
    text: {
      en: {
        title: 'SQL formatter',
        description: 'Format, minify and export SQL queries locally.'
      },
      es: {
        title: 'Formateador SQL',
        description: 'Formatea, minifica y exporta consultas SQL localmente.'
      }
    }
  },
  {
    id: 'svg-placeholder',
    slug: 'svg-placeholder',
    category: 'images',
    icon: 'SVG',
    privacy: 'local',
    text: {
      en: {
        title: 'SVG placeholder generator',
        description: 'Create SVG placeholders and data URLs.'
      },
      es: {
        title: 'Generador de placeholders SVG',
        description: 'Crea placeholders SVG y data URLs.'
      }
    }
  },
  {
    id: 'timestamp-converter',
    slug: 'timestamp-converter',
    category: 'development',
    icon: 'TIME',
    privacy: 'local',
    text: {
      en: {
        title: 'Timestamp & timezone converter',
        description: 'Convert Unix timestamps, ISO dates and time zones.'
      },
      es: {
        title: 'Conversor de timestamps y zonas horarias',
        description: 'Convierte timestamps Unix, fechas ISO y zonas horarias.'
      }
    }
  },
  {
    id: 'url-encoder',
    slug: 'url-encoder',
    category: 'development',
    icon: 'ENC',
    privacy: 'local',
    text: {
      en: {
        title: 'URL encoder & decoder',
        description: 'Encode URLs and query parameters.'
      },
      es: {
        title: 'Codificador y decodificador URL',
        description: 'Codifica URLs y parámetros de consulta.'
      }
    }
  },
  {
    id: 'url-inspector',
    slug: 'url-inspector',
    category: 'development',
    icon: 'URL',
    privacy: 'local',
    text: {
      en: {
        title: 'URL inspector',
        description: 'Analyze URLs for developers.'
      },
      es: {
        title: 'Inspector de URLs',
        description: 'Analiza URLs para desarrolladores.'
      }
    }
  },
  {
    id: 'vat-calculator',
    slug: 'vat-calculator',
    category: 'finance',
    icon: 'VAT',
    privacy: 'local',
    text: {
      en: {
        title: 'VAT calculator',
        description: 'Calculate VAT from prices with or without tax.'
      },
      es: {
        title: 'Calculadora de IVA',
        description: 'Calcula el IVA a partir de precios con o sin impuesto.'
      }
    }
  },
  {
    id: 'xml-formatter',
    slug: 'xml-formatter',
    category: 'development',
    icon: 'XML',
    privacy: 'local',
    text: {
      en: {
        title: 'XML formatter & validator',
        description: 'Format, validate and minify XML locally.'
      },
      es: {
        title: 'Formateador y validador XML',
        description: 'Formatea, valida y minifica XML localmente.'
      }
    }
  }
];

export type LocalizedTool = ToolDefinition & {
  title: string;
  description: string;
  categoryLabel: string;
  privacyLabel: string;
  path: `/${string}/`;
};

export type ToolCategoryGroup = {
  id: ToolCategoryId;
  title: string;
  items: LocalizedTool[];
};

export const getLocalizedTools = (lang: Lang): LocalizedTool[] => tools.map((tool) => ({
  ...tool,
  title: tool.text[lang].title,
  description: tool.text[lang].description,
  categoryLabel: toolCategoryLabels[tool.category][lang],
  privacyLabel: privacyLabels[tool.privacy][lang],
  path: `/${tool.slug}/`
}));

export const getToolsByCategory = (lang: Lang): ToolCategoryGroup[] => {
  const localizedTools = getLocalizedTools(lang);
  return (Object.keys(toolCategoryLabels) as ToolCategoryId[])
    .map((categoryId) => ({
      id: categoryId,
      title: toolCategoryLabels[categoryId][lang],
      items: localizedTools.filter((tool) => tool.category === categoryId)
    }))
    .filter((category) => category.items.length > 0);
};
