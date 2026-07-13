import type { Lang } from './ui';

export const toolSlugs = [
  'app-icon-generator',
  'base64',
  'character-counter',
  'code-formatter',
  'csv-converter',
  'curl-builder',
  'css-color-converter',
  'diff-checker',
  'dns-lookup',
  'favicon-generator',
  'geocoder',
  'image-compressor',
  'image-converter',
  'image-info',
  'ip-info',
  'json-viewer',
  'jwt-decoder',
  'lorem-ipsum',
  'markdown-preview',
  'md5',
  'photo-censor',
  'qr-code',
  'social-preview',
  'sql-formatter',
  'svg-placeholder',
  'timestamp-converter',
  'url-encoder',
  'url-inspector',
  'vat-calculator',
  'xml-formatter'
] as const;

export type ToolSlug = (typeof toolSlugs)[number];

export const toolCategories = {
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
} as const;

type LocalizedToolCard = {
  title: string;
  description: string;
};

type ToolCatalogEntry = {
  category: keyof typeof toolCategories;
  icon: string;
  path: `/${string}/`;
  card: Record<Lang, LocalizedToolCard>;
};

export const toolCatalog: Record<ToolSlug, ToolCatalogEntry> = {
  'app-icon-generator': {
    category: 'images',
    icon: 'APP',
    path: '/app-icon-generator/',
    card: {
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
  base64: {
    category: 'development',
    icon: '64',
    path: '/base64/',
    card: {
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
  'character-counter': {
    category: 'writing',
    icon: 'ABC',
    path: '/character-counter/',
    card: {
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
  'code-formatter': {
    category: 'development',
    icon: 'CODE',
    path: '/code-formatter/',
    card: {
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
  'csv-converter': {
    category: 'development',
    icon: 'CSV',
    path: '/csv-converter/',
    card: {
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
  'curl-builder': {
    category: 'development',
    icon: 'API',
    path: '/curl-builder/',
    card: {
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
  'css-color-converter': {
    category: 'development',
    icon: 'COLOR',
    path: '/css-color-converter/',
    card: {
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
  'diff-checker': {
    category: 'development',
    icon: 'DIFF',
    path: '/diff-checker/',
    card: {
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
  'dns-lookup': {
    category: 'internet',
    icon: 'DNS',
    path: '/dns-lookup/',
    card: {
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
  'favicon-generator': {
    category: 'images',
    icon: 'ICO',
    path: '/favicon-generator/',
    card: {
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
  geocoder: {
    category: 'internet',
    icon: 'MAP',
    path: '/geocoder/',
    card: {
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
  'image-compressor': {
    category: 'images',
    icon: 'ZIP',
    path: '/image-compressor/',
    card: {
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
  'image-converter': {
    category: 'images',
    icon: 'CONV',
    path: '/image-converter/',
    card: {
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
  'image-info': {
    category: 'images',
    icon: 'IMG',
    path: '/image-info/',
    card: {
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
  'ip-info': {
    category: 'internet',
    icon: 'IP',
    path: '/ip-info/',
    card: {
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
  'json-viewer': {
    category: 'development',
    icon: '{}',
    path: '/json-viewer/',
    card: {
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
  'jwt-decoder': {
    category: 'development',
    icon: 'JWT',
    path: '/jwt-decoder/',
    card: {
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
  'lorem-ipsum': {
    category: 'writing',
    icon: 'TXT',
    path: '/lorem-ipsum/',
    card: {
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
  'markdown-preview': {
    category: 'writing',
    icon: 'MD',
    path: '/markdown-preview/',
    card: {
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
  md5: {
    category: 'development',
    icon: 'MD5',
    path: '/md5/',
    card: {
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
  'photo-censor': {
    category: 'images',
    icon: 'CEN',
    path: '/photo-censor/',
    card: {
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
  'qr-code': {
    category: 'images',
    icon: 'QR',
    path: '/qr-code/',
    card: {
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
  'social-preview': {
    category: 'internet',
    icon: 'SOC',
    path: '/social-preview/',
    card: {
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
  'sql-formatter': {
    category: 'development',
    icon: 'SQL',
    path: '/sql-formatter/',
    card: {
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
  'svg-placeholder': {
    category: 'images',
    icon: 'SVG',
    path: '/svg-placeholder/',
    card: {
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
  'timestamp-converter': {
    category: 'development',
    icon: 'TIME',
    path: '/timestamp-converter/',
    card: {
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
  'url-encoder': {
    category: 'development',
    icon: 'ENC',
    path: '/url-encoder/',
    card: {
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
  'url-inspector': {
    category: 'development',
    icon: 'URL',
    path: '/url-inspector/',
    card: {
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
  'vat-calculator': {
    category: 'finance',
    icon: 'VAT',
    path: '/vat-calculator/',
    card: {
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
  'xml-formatter': {
    category: 'development',
    icon: 'XML',
    path: '/xml-formatter/',
    card: {
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
};

export const homeTranslations = {
  en: {
    title: 'Free online tools for developers, images and text — Alon Tools',
    description: 'Free online tools for developers, images, text, SEO and calculations. Fast, mobile friendly and mostly processed locally in your browser.',
    eyebrow: 'Privacy First',
    heroTitle: 'Free online tools, without accounts or unnecessary uploads',
    heroText: 'Solve everyday tasks with fast utilities for development, images, text, SEO and calculations. Most run entirely on your device.',
    searchTitle: 'Find a tool',
    searchLabel: 'Search by name, description or shortcut',
    searchPlaceholder: 'Search: json, image, qr, timestamp...',
    clearFilters: 'Clear filters',
    filterAll: 'All',
    categoryFilters: 'Category filters',
    emptyState: 'No tools match your search.',
    showing: (visible: number, total: number) => `Showing ${visible} of ${total} tools`
  },
  es: {
    title: 'Herramientas online gratis para desarrollo, imágenes y texto — Alon Tools',
    description: 'Herramientas online gratuitas para desarrollo, imágenes, texto, SEO y cálculos. Rápidas, adaptadas a móvil y mayoritariamente locales.',
    eyebrow: 'Privacy First',
    heroTitle: 'Herramientas online gratis, sin cuentas ni subidas innecesarias',
    heroText: 'Resuelve tareas de desarrollo, imágenes, texto, SEO y cálculos con utilidades rápidas. La mayoría funciona por completo en tu dispositivo.',
    searchTitle: 'Buscar herramienta',
    searchLabel: 'Busca por nombre, descripción o etiqueta',
    searchPlaceholder: 'Buscar: json, imagen, qr, timestamp...',
    clearFilters: 'Limpiar filtros',
    filterAll: 'Todas',
    categoryFilters: 'Filtros por categoría',
    emptyState: 'No hay herramientas que coincidan con tu búsqueda.',
    showing: (visible: number, total: number) => `Mostrando ${visible} de ${total} herramientas`
  }
} as const;

export type ToolPageTranslation = {
  title: string;
  description: string;
  heroEyebrow?: string;
  heroText?: string;
  [key: string]: unknown;
};

const toolTranslations = {
  'app-icon-generator': {
    en: {
      title: 'App icon generator',
      description: 'Create app icons with a visual canvas editor, image and text layers, Lucide icons and local PNG or ZIP exports.',
      heroEyebrow: '100% local',
      heroText: 'Design app icons directly on the canvas: add images, text and icons, transform each layer with visual handles and export every size from your browser.',
      editorTitle: 'Visual editor',
      editorText: 'Select a layer and drag it. Use the corners to scale, the top handle to rotate and double click on text to edit it.',
      exportInfo: (count: number) => `${count} selected size${count === 1 ? '' : 's'}`,
      addToolbarLabel: 'Add content to the icon',
      addImageLabel: 'Add image from your device',
      addImageTitle: 'Add image',
      addImageText: 'Upload a photo or logo',
      addTextLabel: 'Add a text layer',
      addTextTitle: 'Add text',
      addTextText: 'Title, initials or brand',
      addIconLabel: 'Add a Lucide icon layer',
      addIconTitle: 'Add icon',
      addIconText: 'Local Lucide icons',
      quickToolbarLabel: 'Quick actions',
      actions: {
        duplicate: 'Duplicate',
        delete: 'Delete',
        reset: 'Reset',
        export: 'Export'
      },
      canvasPanelLabel: 'Icon editing area',
      canvasLabel: 'Visual app icon editor',
      canvasHelp: 'Tap a layer to select it. Double click on text to edit it. Delete or Backspace removes the selected layer.',
      sidePanelLabel: 'Layers and properties panel'
    },
    es: {
      title: 'Generador de iconos para apps',
      description: 'Crea iconos para apps con editor visual sobre canvas, capas de imagen y texto, iconos Lucide y exportación local a PNG o ZIP.',
      heroEyebrow: '100% local',
      heroText: 'Diseña iconos para apps editando directamente sobre el canvas: añade imágenes, texto e iconos, transforma cada capa con asas visuales y exporta todos los tamaños desde tu navegador.',
      editorTitle: 'Editor visual',
      editorText: 'Selecciona una capa y arrástrala. Usa las esquinas para escalar, el asa superior para rotar y doble clic sobre texto para editarlo.',
      exportInfo: (count: number) => `${count} tamaño${count === 1 ? '' : 's'} seleccionado${count === 1 ? '' : 's'}`,
      addToolbarLabel: 'Añadir contenido al icono',
      addImageLabel: 'Añadir imagen desde tu dispositivo',
      addImageTitle: 'Añadir imagen',
      addImageText: 'Sube una foto o logo',
      addTextLabel: 'Añadir una capa de texto',
      addTextTitle: 'Añadir texto',
      addTextText: 'Título, iniciales o marca',
      addIconLabel: 'Añadir una capa de icono Lucide',
      addIconTitle: 'Añadir icono',
      addIconText: 'Iconos Lucide locales',
      quickToolbarLabel: 'Acciones rápidas',
      actions: {
        duplicate: 'Duplicar',
        delete: 'Borrar',
        reset: 'Reiniciar',
        export: 'Exportar'
      },
      canvasPanelLabel: 'Área de edición del icono',
      canvasLabel: 'Editor visual del icono de app',
      canvasHelp: 'Toca una capa para seleccionarla. Doble clic sobre texto para editar. Supr o Retroceso borra la capa seleccionada.',
      sidePanelLabel: 'Panel de capas y propiedades'
    }
  },
  base64: {
    en: {
      title: 'Base64 encoder & decoder',
      description: 'Encode plain text to Base64 and decode Base64 strings directly in your browser.',
      heroEyebrow: 'Alon Tools',
      heroText: 'Convert plain text to Base64 and decode Base64 strings directly in your browser.',
      actions: {
        encode: 'Encode',
        decode: 'Decode',
        swap: 'Swap',
        clear: 'Clear',
        copy: 'Copy result'
      },
      placeholders: {
        input: 'Input text...',
        output: 'Result...'
      },
      messages: {
        ready: 'Ready to convert.',
        encoded: 'Text encoded successfully.',
        encodeError: 'Could not encode the text.',
        decoded: 'Text decoded successfully.',
        invalid: 'Invalid Base64 input.',
        swapped: 'Content swapped.',
        cleared: 'Content cleared.',
        copied: 'Result copied.',
        copyError: 'Could not copy the result.'
      }
    },
    es: {
      title: 'Codificador y decodificador Base64',
      description: 'Codifica texto plano a Base64 y decodifica cadenas Base64 directamente desde tu navegador.',
      heroEyebrow: 'Alon Tools',
      heroText: 'Convierte texto plano a Base64 y decodifica cadenas Base64 directamente desde el navegador.',
      actions: {
        encode: 'Codificar',
        decode: 'Decodificar',
        swap: 'Intercambiar',
        clear: 'Limpiar',
        copy: 'Copiar resultado'
      },
      placeholders: {
        input: 'Texto de entrada...',
        output: 'Resultado...'
      },
      messages: {
        ready: 'Listo para convertir.',
        encoded: 'Texto codificado correctamente.',
        encodeError: 'Error al codificar.',
        decoded: 'Texto decodificado correctamente.',
        invalid: 'Base64 inválido.',
        swapped: 'Contenido intercambiado.',
        cleared: 'Contenido eliminado.',
        copied: 'Resultado copiado.',
        copyError: 'No se pudo copiar.'
      }
    }
  },
  'json-viewer': {
    en: {
      title: 'JSON viewer & formatter',
      description: 'View, validate and format JSON locally in your browser.',
      heroEyebrow: 'Alon Tools',
      heroText: 'Format, minify and validate JSON directly in your browser without uploading files.',
      actions: {
        format: 'Format',
        minify: 'Minify',
        validate: 'Validate',
        clear: 'Clear',
        copy: 'Copy result'
      },
      placeholders: {
        input: 'Paste your JSON here...',
        output: 'Result...'
      },
      messages: {
        ready: 'Ready.',
        invalid: 'Invalid JSON.',
        invalidPartial: 'Invalid JSON, but a partial view is shown.\n{details}',
        lineColumn: 'Line {line}, column {column}.',
        formatted: 'JSON formatted successfully.',
        minified: 'JSON minified successfully.',
        valid: 'Valid JSON.',
        cleared: 'Content cleared.',
        copied: 'Result copied.',
        copyError: 'Could not copy.'
      }
    },
    es: {
      title: 'Visor y formateador JSON',
      description: 'Visualiza, valida y formatea JSON localmente en tu navegador.',
      heroEyebrow: 'Alon Tools',
      heroText: 'Formatea, minifica y valida JSON directamente en tu navegador sin subir archivos.',
      actions: {
        format: 'Formatear',
        minify: 'Minificar',
        validate: 'Validar',
        clear: 'Limpiar',
        copy: 'Copiar resultado'
      },
      placeholders: {
        input: 'Pega aquí tu JSON...',
        output: 'Resultado...'
      },
      messages: {
        ready: 'Listo.',
        invalid: 'JSON inválido.',
        invalidPartial: 'JSON inválido, pero se muestra una vista parcial.\n{details}',
        lineColumn: 'Línea {line}, columna {column}.',
        formatted: 'JSON formateado correctamente.',
        minified: 'JSON minificado correctamente.',
        valid: 'JSON válido.',
        cleared: 'Contenido eliminado.',
        copied: 'Resultado copiado.',
        copyError: 'No se pudo copiar.'
      }
    }
  },
  'sql-formatter': {
    en: {
      title: 'SQL formatter',
      description: 'Format, minify, copy and download SQL queries locally in your browser. It only formats text and never runs queries.',
      heroEyebrow: '100% local',
      heroText: 'Make SELECT, INSERT, UPDATE, DELETE and CREATE queries easier to read. This tool only formats SQL text locally; it does not validate against a real database and never executes queries.',
      workspaceTitle: 'SQL workspace',
      workspaceText: 'Paste a query, choose formatting options and export the result. Comments and quoted strings are preserved when possible.',
      aria: {
        options: 'Formatting options',
        actions: 'SQL actions',
        stats: 'SQL statistics'
      },
      labels: {
        dialect: 'Dialect',
        keywordCase: 'Keyword case',
        indentation: 'Indentation',
        input: 'Input SQL',
        result: 'Result'
      },
      options: {
        standard: 'SQL standard',
        preserve: 'Preserve',
        spaces2: '2 spaces',
        spaces4: '4 spaces',
        tab: 'Tab'
      },
      actions: {
        format: 'Format SQL',
        minify: 'Minify',
        copy: 'Copy result',
        download: 'Download .sql',
        clear: 'Clear'
      },
      notice: 'This is a formatter, not a SQL engine: it does not connect to databases, run queries or guarantee dialect-specific validity.',
      placeholders: {
        input: 'Paste your SQL here...',
        output: 'Formatted or minified SQL will appear here...'
      },
      stats: {
        lines: 'Lines',
        characters: 'Characters',
        size: 'Size'
      },
      messages: {
        ready: 'Ready.',
        pasteFirst: 'Paste a SQL query first.',
        unclosedComment: 'Unclosed block comment.',
        unclosedQuote: 'Unclosed quoted value starting with {quote}.',
        formatted: '{dialect} SQL formatted.',
        minified: '{dialect} SQL minified.',
        formatError: 'Could not format SQL.',
        noCopy: 'There is no result to copy yet.',
        copied: 'Result copied to clipboard.',
        copyError: 'Could not use the clipboard API. The result is selected so you can copy it manually.',
        noDownload: 'There is no SQL to download.',
        downloaded: 'SQL downloaded.',
        cleared: 'Content cleared.'
      }
    },
    es: {
      title: 'Formateador SQL',
      description: 'Formatea, minifica, copia y descarga consultas SQL localmente en tu navegador. Solo procesa texto y nunca ejecuta consultas.',
      heroEyebrow: '100% local',
      heroText: 'Haz más legibles las consultas SELECT, INSERT, UPDATE, DELETE y CREATE. Esta herramienta solo formatea texto SQL localmente; no valida contra una base de datos real ni ejecuta consultas.',
      workspaceTitle: 'Espacio de trabajo SQL',
      workspaceText: 'Pega una consulta, elige las opciones de formato y exporta el resultado. Los comentarios y cadenas entre comillas se conservan cuando es posible.',
      aria: {
        options: 'Opciones de formato',
        actions: 'Acciones SQL',
        stats: 'Estadísticas SQL'
      },
      labels: {
        dialect: 'Dialecto',
        keywordCase: 'Mayúsculas de palabras clave',
        indentation: 'Sangrado',
        input: 'SQL de entrada',
        result: 'Resultado'
      },
      options: {
        standard: 'Estándar SQL',
        preserve: 'Mantener',
        spaces2: '2 espacios',
        spaces4: '4 espacios',
        tab: 'Tabulación'
      },
      actions: {
        format: 'Formatear SQL',
        minify: 'Minificar',
        copy: 'Copiar resultado',
        download: 'Descargar .sql',
        clear: 'Limpiar'
      },
      notice: 'Esto es un formateador, no un motor SQL: no se conecta a bases de datos, no ejecuta consultas ni garantiza la validez específica de cada dialecto.',
      placeholders: {
        input: 'Pega aquí tu SQL...',
        output: 'Aquí aparecerá el SQL formateado o minificado...'
      },
      stats: {
        lines: 'Líneas',
        characters: 'Caracteres',
        size: 'Tamaño'
      },
      messages: {
        ready: 'Listo.',
        pasteFirst: 'Pega primero una consulta SQL.',
        unclosedComment: 'Hay un comentario de bloque sin cerrar.',
        unclosedQuote: 'Hay un valor entrecomillado sin cerrar que empieza con {quote}.',
        formatted: 'SQL {dialect} formateado.',
        minified: 'SQL {dialect} minificado.',
        formatError: 'No se pudo formatear el SQL.',
        noCopy: 'Todavía no hay resultado para copiar.',
        copied: 'Resultado copiado al portapapeles.',
        copyError: 'No se pudo usar la API del portapapeles. El resultado queda seleccionado para que puedas copiarlo manualmente.',
        noDownload: 'No hay SQL para descargar.',
        downloaded: 'SQL descargado.',
        cleared: 'Contenido limpiado.'
      }
    }
  },
  'xml-formatter': {
    en: {
      title: 'XML formatter & validator',
      description: 'Format, validate, minify, copy and download XML locally in your browser. No uploads, no backend and no remote parsing.',
      heroEyebrow: '100% local',
      heroText: 'Paste XML or load a local file to validate syntax, pretty print with custom indentation, minify, copy the result and download it as an XML file. Everything runs in your browser.',
      workspaceTitle: 'XML workspace',
      workspaceText: 'DOMParser validates the document locally. External resources are not fetched and XML content is never executed.',
      loadFile: 'Load .xml file',
      labels: {
        indentation: 'Indentation',
        input: 'Input XML',
        result: 'Result'
      },
      actions: {
        format: 'Format',
        minify: 'Minify',
        validate: 'Validate',
        copy: 'Copy result',
        download: 'Download XML',
        clear: 'Clear'
      },
      aria: {
        actions: 'XML actions',
        stats: 'XML statistics'
      },
      options: {
        spaces2: '2 spaces',
        spaces4: '4 spaces',
        tab: 'Tab'
      },
      placeholders: {
        input: 'Paste your XML here...',
        output: 'Formatted, minified or validated XML will appear here...'
      },
      stats: {
        original: 'Original',
        result: 'Result',
        nodes: 'Nodes'
      },
      messages: {
        ready: 'Ready.',
        invalidSyntax: 'Invalid XML syntax.',
        pasteFirst: 'Paste XML or load a local .xml file first.',
        formatted: 'XML formatted successfully.',
        minified: 'XML minified successfully.',
        valid: 'Valid XML.',
        noCopy: 'There is no result to copy yet.',
        copied: 'Result copied to clipboard.',
        copyError: 'Could not use the clipboard API. The result is selected so you can copy it manually.',
        noDownload: 'There is no XML to download.',
        downloaded: 'XML downloaded.',
        cleared: 'Content cleared.',
        loaded: 'Loaded {name}.',
        readError: 'Could not read the selected file.'
      }
    },
    es: {
      title: 'Formateador y validador XML',
      description: 'Formatea, valida, minifica, copia y descarga XML localmente en tu navegador. Sin subidas, sin backend y sin parseo remoto.',
      heroEyebrow: '100% local',
      heroText: 'Pega XML o carga un archivo local para validar la sintaxis, aplicar formato con sangrado personalizado, minificar, copiar el resultado y descargarlo como archivo XML. Todo se ejecuta en tu navegador.',
      workspaceTitle: 'Espacio de trabajo XML',
      workspaceText: 'DOMParser valida el documento localmente. No se descargan recursos externos y el contenido XML nunca se ejecuta.',
      loadFile: 'Cargar archivo .xml',
      labels: {
        indentation: 'Sangrado',
        input: 'XML de entrada',
        result: 'Resultado'
      },
      actions: {
        format: 'Formatear',
        minify: 'Minificar',
        validate: 'Validar',
        copy: 'Copiar resultado',
        download: 'Descargar XML',
        clear: 'Limpiar'
      },
      aria: {
        actions: 'Acciones XML',
        stats: 'Estadísticas XML'
      },
      options: {
        spaces2: '2 espacios',
        spaces4: '4 espacios',
        tab: 'Tabulación'
      },
      placeholders: {
        input: 'Pega aquí tu XML...',
        output: 'Aquí aparecerá el XML formateado, minificado o validado...'
      },
      stats: {
        original: 'Original',
        result: 'Resultado',
        nodes: 'Nodos'
      },
      messages: {
        ready: 'Listo.',
        invalidSyntax: 'Sintaxis XML no válida.',
        pasteFirst: 'Pega XML o carga primero un archivo local .xml.',
        formatted: 'XML formateado correctamente.',
        minified: 'XML minificado correctamente.',
        valid: 'XML válido.',
        noCopy: 'Todavía no hay resultado para copiar.',
        copied: 'Resultado copiado al portapapeles.',
        copyError: 'No se pudo usar la API del portapapeles. El resultado queda seleccionado para que puedas copiarlo manualmente.',
        noDownload: 'No hay XML para descargar.',
        downloaded: 'XML descargado.',
        cleared: 'Contenido limpiado.',
        loaded: 'Archivo cargado: {name}.',
        readError: 'No se pudo leer el archivo seleccionado.'
      }
    }
  }
} as const satisfies Partial<Record<ToolSlug, Record<Lang, ToolPageTranslation>>>;

export type ToolTranslationsMap = typeof toolTranslations;

export function getToolTranslations<T extends ToolSlug>(tool: T, lang: Lang) {
  const localized = toolTranslations[tool];
  if (localized) return localized[lang] ?? localized.en;
  const meta = toolCatalog[tool];
  return {
    title: meta.card[lang].title,
    description: meta.card[lang].description,
    heroEyebrow: 'Alon Tools',
    heroText: meta.card[lang].description
  } as ToolPageTranslation;
}

export function getToolCard(tool: ToolSlug, lang: Lang) {
  return toolCatalog[tool].card[lang];
}

export function getToolPath(tool: ToolSlug, lang: Lang) {
  const path = toolCatalog[tool].path;
  return lang === 'es' ? `/es${path}` : path;
}

export function getCatalogByCategory(lang: Lang) {
  const groups = Object.entries(toolCategories).map(([key, label]) => ({
    key,
    title: label[lang],
    items: toolSlugs
      .filter((slug) => toolCatalog[slug].category === key)
      .map((slug) => ({
        slug,
        path: getToolPath(slug, lang),
        icon: toolCatalog[slug].icon,
        ...toolCatalog[slug].card[lang]
      }))
  }));

  return groups.filter((group) => group.items.length > 0);
}
