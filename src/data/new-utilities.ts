import type { Lang } from '../i18n/ui';

export const newUtilitySlugs = [
  'text-case-converter',
  'slug-generator',
  'list-cleaner',
  'html-entities',
  'json-to-typescript',
  'number-base-converter',
  'chmod-calculator',
  'cron-expression-builder',
  'percentage-calculator',
  'aspect-ratio-calculator'
] as const;

export type NewUtilitySlug = (typeof newUtilitySlugs)[number];

type Copy = {
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  inputLabel: string;
  inputPlaceholder: string;
  outputLabel: string;
  outputPlaceholder: string;
  primaryAction: string;
  secondaryAction?: string;
  example: string;
  exampleValue: string;
  helpTitle: string;
  helpText: string;
};

export type NewUtilityDefinition = {
  slug: NewUtilitySlug;
  kind: NewUtilitySlug;
  copy: Record<Lang, Copy>;
};

export const newUtilities: NewUtilityDefinition[] = [
  {
    slug: 'text-case-converter', kind: 'text-case-converter', copy: {
      en: { title: 'Text case converter', description: 'Convert text to uppercase, lowercase, title case, sentence case, camelCase or snake_case locally.', eyebrow: 'Writing utility', intro: 'Normalize headings, identifiers and pasted text in one click. Your content never leaves the browser.', inputLabel: 'Original text', inputPlaceholder: 'Paste or type the text you want to transform…', outputLabel: 'Converted text', outputPlaceholder: 'Your converted text appears here…', primaryAction: 'Convert text', example: 'Load example', exampleValue: 'a practical example for ALON tools', helpTitle: 'Six useful formats', helpText: 'Choose uppercase, lowercase, title case, sentence case, camelCase or snake_case. Accents and Unicode text are preserved.' },
      es: { title: 'Conversor de mayúsculas y minúsculas', description: 'Convierte texto a mayúsculas, minúsculas, título, oración, camelCase o snake_case localmente.', eyebrow: 'Utilidad de escritura', intro: 'Normaliza titulares, identificadores y textos pegados con un clic. Tu contenido nunca sale del navegador.', inputLabel: 'Texto original', inputPlaceholder: 'Pega o escribe el texto que quieres transformar…', outputLabel: 'Texto convertido', outputPlaceholder: 'El texto convertido aparecerá aquí…', primaryAction: 'Convertir texto', example: 'Cargar ejemplo', exampleValue: 'un ejemplo práctico para ALON tools', helpTitle: 'Seis formatos útiles', helpText: 'Elige mayúsculas, minúsculas, título, oración, camelCase o snake_case. Se conservan acentos y texto Unicode.' }
    }
  },
  {
    slug: 'slug-generator', kind: 'slug-generator', copy: {
      en: { title: 'SEO slug generator', description: 'Turn titles into clean, readable URL slugs with optional lowercase and custom separators.', eyebrow: 'SEO utility', intro: 'Create consistent URL paths by removing accents, punctuation and repeated separators locally.', inputLabel: 'Title or phrase', inputPlaceholder: 'The complete guide to faster websites', outputLabel: 'Generated slug', outputPlaceholder: 'the-complete-guide-to-faster-websites', primaryAction: 'Generate slug', example: 'Load example', exampleValue: 'Guía práctica: páginas rápidas y accesibles', helpTitle: 'Clean URLs', helpText: 'The generator transliterates accents, removes unsafe characters and collapses repeated separators for search-friendly paths.' },
      es: { title: 'Generador de slugs SEO', description: 'Convierte títulos en slugs limpios y legibles con minúsculas y separador configurable.', eyebrow: 'Utilidad SEO', intro: 'Crea rutas URL consistentes eliminando acentos, puntuación y separadores repetidos de forma local.', inputLabel: 'Título o frase', inputPlaceholder: 'La guía completa para webs más rápidas', outputLabel: 'Slug generado', outputPlaceholder: 'la-guia-completa-para-webs-mas-rapidas', primaryAction: 'Generar slug', example: 'Cargar ejemplo', exampleValue: 'Guía práctica: páginas rápidas y accesibles', helpTitle: 'URLs limpias', helpText: 'El generador normaliza acentos, elimina caracteres inseguros y agrupa separadores repetidos para crear rutas legibles.' }
    }
  },
  {
    slug: 'list-cleaner', kind: 'list-cleaner', copy: {
      en: { title: 'List cleaner and sorter', description: 'Trim, deduplicate, sort and remove empty lines from lists without uploading their contents.', eyebrow: 'Text utility', intro: 'Clean email lists, tags, filenames or pasted data with predictable, privacy-friendly controls.', inputLabel: 'One item per line', inputPlaceholder: 'orange\napple\norange\n banana ', outputLabel: 'Clean list', outputPlaceholder: 'The normalized list appears here…', primaryAction: 'Clean list', example: 'Load example', exampleValue: 'Orange\napple\nOrange\n banana \n\nPear', helpTitle: 'Safe list cleanup', helpText: 'Choose whether to trim spaces, remove blanks, remove duplicates and sort. The status reports the original and final item counts.' },
      es: { title: 'Limpiador y ordenador de listas', description: 'Recorta, elimina duplicados, ordena y borra líneas vacías sin subir el contenido.', eyebrow: 'Utilidad de texto', intro: 'Limpia listas de correos, etiquetas, archivos o datos pegados con controles claros y privados.', inputLabel: 'Un elemento por línea', inputPlaceholder: 'naranja\nmanzana\nnaranja\n plátano ', outputLabel: 'Lista limpia', outputPlaceholder: 'La lista normalizada aparecerá aquí…', primaryAction: 'Limpiar lista', example: 'Cargar ejemplo', exampleValue: 'Naranja\nmanzana\nNaranja\n plátano \n\nPera', helpTitle: 'Limpieza segura de listas', helpText: 'Elige si quieres recortar espacios, quitar vacíos, eliminar duplicados y ordenar. El estado indica el número inicial y final.' }
    }
  },
  {
    slug: 'html-entities', kind: 'html-entities', copy: {
      en: { title: 'HTML entity encoder and decoder', description: 'Encode reserved HTML characters or decode entities locally, including quotes and apostrophes.', eyebrow: 'Development utility', intro: 'Prepare text for HTML snippets or turn encoded entities back into readable content instantly.', inputLabel: 'Input', inputPlaceholder: '<p class="note">Tom & Jerry</p>', outputLabel: 'Result', outputPlaceholder: 'Encoded or decoded text appears here…', primaryAction: 'Encode entities', secondaryAction: 'Decode entities', example: 'Load example', exampleValue: '<strong title="R&D">Fast & safe</strong>', helpTitle: 'Reserved characters handled', helpText: 'Encodes ampersands, angle brackets, double quotes and apostrophes. Decoding uses the browser HTML parser without executing the content.' },
      es: { title: 'Codificador y decodificador de entidades HTML', description: 'Codifica caracteres reservados de HTML o decodifica entidades localmente, incluidas comillas y apóstrofes.', eyebrow: 'Utilidad de desarrollo', intro: 'Prepara texto para fragmentos HTML o convierte entidades codificadas en contenido legible al instante.', inputLabel: 'Entrada', inputPlaceholder: '<p class="nota">Tom & Jerry</p>', outputLabel: 'Resultado', outputPlaceholder: 'El texto codificado o decodificado aparecerá aquí…', primaryAction: 'Codificar entidades', secondaryAction: 'Decodificar entidades', example: 'Cargar ejemplo', exampleValue: '<strong title="I+D">Rápido & seguro</strong>', helpTitle: 'Caracteres reservados controlados', helpText: 'Codifica ampersands, signos angulares, comillas y apóstrofes. La decodificación usa el parser HTML sin ejecutar el contenido.' }
    }
  },
  {
    slug: 'json-to-typescript', kind: 'json-to-typescript', copy: {
      en: { title: 'JSON to TypeScript converter', description: 'Generate readable TypeScript interfaces from JSON objects and arrays directly in your browser.', eyebrow: 'Development utility', intro: 'Create a typed starting point for API responses while keeping sample payloads on your device.', inputLabel: 'JSON sample', inputPlaceholder: '{\n  "id": 42,\n  "name": "Ada",\n  "active": true\n}', outputLabel: 'TypeScript interfaces', outputPlaceholder: 'export interface Root { … }', primaryAction: 'Generate types', example: 'Load example', exampleValue: '{"user":{"id":42,"name":"Ada","roles":["admin","editor"]},"active":true}', helpTitle: 'Nested types included', helpText: 'Objects become named interfaces, arrays infer their item type, null remains nullable and invalid JSON produces an accessible error.' },
      es: { title: 'Conversor de JSON a TypeScript', description: 'Genera interfaces TypeScript legibles desde objetos y arrays JSON directamente en tu navegador.', eyebrow: 'Utilidad de desarrollo', intro: 'Crea una base tipada para respuestas de API manteniendo los datos de ejemplo en tu dispositivo.', inputLabel: 'JSON de ejemplo', inputPlaceholder: '{\n  "id": 42,\n  "nombre": "Ada",\n  "activo": true\n}', outputLabel: 'Interfaces TypeScript', outputPlaceholder: 'export interface Root { … }', primaryAction: 'Generar tipos', example: 'Cargar ejemplo', exampleValue: '{"usuario":{"id":42,"nombre":"Ada","roles":["admin","editor"]},"activo":true}', helpTitle: 'Incluye tipos anidados', helpText: 'Los objetos se convierten en interfaces, los arrays infieren su contenido, null se mantiene anulable y el JSON no válido muestra un error accesible.' }
    }
  },
  {
    slug: 'number-base-converter', kind: 'number-base-converter', copy: {
      en: { title: 'Number base converter', description: 'Convert integers between binary, octal, decimal and hexadecimal with BigInt precision.', eyebrow: 'Development utility', intro: 'Inspect the same integer in the four bases developers use most, without precision loss for large values.', inputLabel: 'Integer', inputPlaceholder: '255', outputLabel: 'Conversions', outputPlaceholder: 'Binary, octal, decimal and hexadecimal values…', primaryAction: 'Convert number', example: 'Load example', exampleValue: '65535', helpTitle: 'Large integers supported', helpText: 'Select the input base and convert values using BigInt. Prefixes such as 0x are accepted after choosing the matching base.' },
      es: { title: 'Conversor de bases numéricas', description: 'Convierte enteros entre binario, octal, decimal y hexadecimal con precisión BigInt.', eyebrow: 'Utilidad de desarrollo', intro: 'Consulta el mismo entero en las cuatro bases más usadas sin perder precisión en valores grandes.', inputLabel: 'Número entero', inputPlaceholder: '255', outputLabel: 'Conversiones', outputPlaceholder: 'Valores binario, octal, decimal y hexadecimal…', primaryAction: 'Convertir número', example: 'Cargar ejemplo', exampleValue: '65535', helpTitle: 'Admite enteros grandes', helpText: 'Selecciona la base de entrada y convierte con BigInt. Se admiten prefijos como 0x cuando eliges la base correspondiente.' }
    }
  },
  {
    slug: 'chmod-calculator', kind: 'chmod-calculator', copy: {
      en: { title: 'Unix chmod calculator', description: 'Build Unix file permissions visually and copy numeric or symbolic chmod values.', eyebrow: 'Development utility', intro: 'Toggle read, write and execute permissions for owner, group and others with an immediate command preview.', inputLabel: 'Permissions', inputPlaceholder: '', outputLabel: 'Command and notation', outputPlaceholder: 'chmod 755 file', primaryAction: 'Update permissions', example: 'Use common 755', exampleValue: '755', helpTitle: 'Understand every bit', helpText: 'Each permission group adds read (4), write (2) and execute (1). The generated symbolic notation helps verify the result.' },
      es: { title: 'Calculadora chmod de Unix', description: 'Crea permisos de archivos Unix visualmente y copia valores chmod numéricos o simbólicos.', eyebrow: 'Utilidad de desarrollo', intro: 'Activa lectura, escritura y ejecución para propietario, grupo y otros con vista previa inmediata.', inputLabel: 'Permisos', inputPlaceholder: '', outputLabel: 'Comando y notación', outputPlaceholder: 'chmod 755 archivo', primaryAction: 'Actualizar permisos', example: 'Usar el habitual 755', exampleValue: '755', helpTitle: 'Comprende cada bit', helpText: 'Cada grupo suma lectura (4), escritura (2) y ejecución (1). La notación simbólica permite verificar el resultado.' }
    }
  },
  {
    slug: 'cron-expression-builder', kind: 'cron-expression-builder', copy: {
      en: { title: 'Cron expression builder', description: 'Build standard five-field cron expressions from readable schedule controls.', eyebrow: 'Development utility', intro: 'Create common minute, hourly, daily, weekly and monthly schedules without memorizing cron syntax.', inputLabel: 'Schedule', inputPlaceholder: '', outputLabel: 'Cron expression', outputPlaceholder: '0 9 * * 1-5', primaryAction: 'Build expression', example: 'Weekdays at 09:00', exampleValue: 'weekday', helpTitle: 'Standard five-field cron', helpText: 'The result uses minute, hour, day of month, month and day of week. Always confirm the server timezone before deploying.' },
      es: { title: 'Constructor de expresiones cron', description: 'Crea expresiones cron estándar de cinco campos mediante controles fáciles de entender.', eyebrow: 'Utilidad de desarrollo', intro: 'Configura tareas por minutos, horas, días, semanas o meses sin memorizar la sintaxis cron.', inputLabel: 'Programación', inputPlaceholder: '', outputLabel: 'Expresión cron', outputPlaceholder: '0 9 * * 1-5', primaryAction: 'Crear expresión', example: 'Laborables a las 09:00', exampleValue: 'weekday', helpTitle: 'Cron estándar de cinco campos', helpText: 'El resultado usa minuto, hora, día del mes, mes y día de la semana. Confirma siempre la zona horaria del servidor.' }
    }
  },
  {
    slug: 'percentage-calculator', kind: 'percentage-calculator', copy: {
      en: { title: 'Percentage calculator', description: 'Calculate a percentage, percentage change, increase or discount with clear formulas.', eyebrow: 'Finance utility', intro: 'Solve common percentage questions with transparent calculations you can verify and copy.', inputLabel: 'Values', inputPlaceholder: '', outputLabel: 'Result', outputPlaceholder: 'The calculation appears here…', primaryAction: 'Calculate', example: 'Load example', exampleValue: 'percentage', helpTitle: 'Four everyday calculations', helpText: 'Find X% of Y, what percentage X is of Y, the change between two values, or apply a percentage increase or discount.' },
      es: { title: 'Calculadora de porcentajes', description: 'Calcula un porcentaje, variación porcentual, aumento o descuento con fórmulas claras.', eyebrow: 'Utilidad financiera', intro: 'Resuelve cálculos porcentuales habituales con operaciones transparentes que puedes comprobar y copiar.', inputLabel: 'Valores', inputPlaceholder: '', outputLabel: 'Resultado', outputPlaceholder: 'El cálculo aparecerá aquí…', primaryAction: 'Calcular', example: 'Cargar ejemplo', exampleValue: 'percentage', helpTitle: 'Cuatro cálculos cotidianos', helpText: 'Calcula X% de Y, qué porcentaje representa X de Y, la variación entre dos valores o aplica un aumento o descuento.' }
    }
  },
  {
    slug: 'aspect-ratio-calculator', kind: 'aspect-ratio-calculator', copy: {
      en: { title: 'Aspect ratio calculator', description: 'Resize images and video proportionally or simplify any width-to-height ratio.', eyebrow: 'Image utility', intro: 'Keep designs sharp and undistorted by calculating a matching width or height from the original dimensions.', inputLabel: 'Dimensions', inputPlaceholder: '', outputLabel: 'Calculated size', outputPlaceholder: 'The proportional dimensions appear here…', primaryAction: 'Calculate size', example: 'Use 16:9 example', exampleValue: '16:9', helpTitle: 'Resize without distortion', helpText: 'Enter an original width and height, then change either target dimension. The other side updates with the same ratio.' },
      es: { title: 'Calculadora de relación de aspecto', description: 'Redimensiona imágenes y vídeo proporcionalmente o simplifica cualquier relación de ancho y alto.', eyebrow: 'Utilidad de imagen', intro: 'Evita deformaciones calculando el ancho o alto correspondiente a partir de las dimensiones originales.', inputLabel: 'Dimensiones', inputPlaceholder: '', outputLabel: 'Tamaño calculado', outputPlaceholder: 'Las dimensiones proporcionales aparecerán aquí…', primaryAction: 'Calcular tamaño', example: 'Usar ejemplo 16:9', exampleValue: '16:9', helpTitle: 'Redimensiona sin deformar', helpText: 'Introduce el ancho y alto originales y cambia una dimensión de destino. La otra se calcula manteniendo la proporción.' }
    }
  }
];

export const getNewUtility = (slug: string) => newUtilities.find((utility) => utility.slug === slug);
