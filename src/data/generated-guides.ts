import { extraUtilities, type ExtraUtility, type UtilityField } from './extra-utilities';
import { toolCategoryLabels, type ToolCategoryId } from './tools';
import type { Guide, GuideCopy, GuideSection } from './guides';
import type { Lang } from '../i18n/ui';

const PUBLISHED = '2026-07-16';

type CategoryProfile = Record<Lang, {
  purpose:string;
  validation:string;
  interpretation:string;
  caution:string;
  scenario:string;
}>;

const profiles:Record<ToolCategoryId,CategoryProfile> = {
  development:{
    en:{purpose:'make technical input easier to inspect, transform or reuse',validation:'check syntax, escaping and the exact format expected by the destination system',interpretation:'compare the generated value with the original requirement and test it in a non-production environment',caution:'remove credentials, tokens and private endpoints before copying examples into any shared document',scenario:'a developer preparing a configuration, request or code fragment'},
    es:{purpose:'hacer que una entrada técnica sea más fácil de revisar, transformar o reutilizar',validation:'comprueba la sintaxis, el escapado y el formato exacto que espera el sistema de destino',interpretation:'compara el valor generado con el requisito original y pruébalo en un entorno que no sea de producción',caution:'elimina credenciales, tokens y endpoints privados antes de copiar ejemplos en documentos compartidos',scenario:'una persona que prepara una configuración, petición o fragmento de código'}
  },
  images:{
    en:{purpose:'prepare an image asset with predictable dimensions, format or visual output',validation:'inspect the source dimensions, transparency and intended display size before processing',interpretation:'review the result at its real display size and compare quality as well as file weight',caution:'keep an untouched source file so repeated exports do not accumulate quality loss',scenario:'someone preparing visual assets for a website, app or presentation'},
    es:{purpose:'preparar un recurso visual con dimensiones, formato o resultado predecibles',validation:'revisa las dimensiones, la transparencia y el tamaño final antes de procesar la imagen',interpretation:'comprueba el resultado a su tamaño real y compara tanto la calidad como el peso',caution:'conserva el archivo fuente intacto para que varias exportaciones no acumulen pérdida de calidad',scenario:'alguien que prepara recursos visuales para una web, app o presentación'}
  },
  internet:{
    en:{purpose:'inspect or prepare information used by websites and network services',validation:'verify host names, URLs and public identifiers before relying on the response',interpretation:'treat network data as a snapshot that may change after the query',caution:'do not include unrelated personal information in a lookup or generated request',scenario:'a site owner checking a public web or network configuration'},
    es:{purpose:'revisar o preparar información utilizada por webs y servicios de red',validation:'verifica dominios, URLs e identificadores públicos antes de confiar en la respuesta',interpretation:'trata los datos de red como una instantánea que puede cambiar después de la consulta',caution:'no incluyas información personal que no sea necesaria en una consulta o petición generada',scenario:'quien administra una web y revisa una configuración pública de red'}
  },
  writing:{
    en:{purpose:'edit, analyse or restructure text while keeping the original meaning under control',validation:'preserve a copy of the source and decide whether capitalization, punctuation and line breaks are meaningful',interpretation:'read the transformed text in context instead of accepting a mechanically correct result',caution:'review names, acronyms and domain-specific words that automated text rules may not recognise',scenario:'a writer or editor cleaning content before publication'},
    es:{purpose:'editar, analizar o reestructurar texto manteniendo controlado el significado original',validation:'conserva una copia y decide si mayúsculas, puntuación y saltos de línea tienen significado',interpretation:'lee el texto transformado en contexto en lugar de aceptar un resultado solo porque sea mecánicamente correcto',caution:'revisa nombres, siglas y términos especializados que una regla automática puede no reconocer',scenario:'una persona que limpia contenido antes de publicarlo'}
  },
  finance:{
    en:{purpose:'turn a set of quantities into a transparent estimate that can be checked by hand',validation:'confirm units, decimal separators, time periods and whether values include taxes or fees',interpretation:'use the result as an estimate and compare it with the formula and assumptions shown',caution:'do not treat a browser calculation as personalised financial, medical or legal advice',scenario:'someone comparing quantities before making a practical decision'},
    es:{purpose:'convertir varias cantidades en una estimación transparente que pueda comprobarse a mano',validation:'confirma unidades, separadores decimales, periodos y si los importes incluyen impuestos o comisiones',interpretation:'utiliza el resultado como estimación y compáralo con la fórmula y los supuestos',caution:'no trates un cálculo del navegador como asesoramiento financiero, médico o legal personalizado',scenario:'alguien que compara cantidades antes de tomar una decisión práctica'}
  },
  calculators:{
    en:{purpose:'solve a defined calculation with visible inputs and a repeatable method',validation:'check that every value uses the same unit system and falls inside a realistic range',interpretation:'verify rounding and significant digits before reusing the answer elsewhere',caution:'record the inputs with the result so another person can reproduce the calculation',scenario:'a learner or professional who needs a quick, reproducible calculation'},
    es:{purpose:'resolver un cálculo definido con entradas visibles y un método repetible',validation:'comprueba que todos los valores usan el mismo sistema de unidades y un rango realista',interpretation:'revisa el redondeo y las cifras significativas antes de reutilizar la respuesta',caution:'guarda las entradas junto al resultado para que otra persona pueda reproducir el cálculo',scenario:'un estudiante o profesional que necesita un cálculo rápido y reproducible'}
  },
  converters:{
    en:{purpose:'translate a value between two compatible units without hiding the conversion direction',validation:'identify the source unit first, then choose a target unit from the same physical quantity',interpretation:'check the order of magnitude and keep enough decimal places for the intended use',caution:'avoid mixing similarly named metric, imperial or data units',scenario:'someone comparing measurements from different documents or systems'},
    es:{purpose:'traducir un valor entre unidades compatibles sin ocultar el sentido de la conversión',validation:'identifica primero la unidad de origen y elige después una unidad destino de la misma magnitud',interpretation:'comprueba el orden de magnitud y conserva los decimales necesarios para el uso previsto',caution:'evita mezclar unidades métricas, imperiales o digitales con nombres parecidos',scenario:'alguien que compara medidas procedentes de documentos o sistemas distintos'}
  }
};

const slugify = (value:string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const trimTo = (value:string,max:number) => value.length<=max?value:`${value.slice(0,max-1).replace(/\s+\S*$/,'')}…`;
const trimTitle = (value:string,max=49) => {
  if(value.length<=max)return value;
  const head=value.slice(0,Math.ceil(max*.54)).replace(/\s+\S*$/,'');
  const tail=value.slice(-Math.floor(max*.38)).replace(/^\S*\s+/,'');
  return `${head}… ${tail}`;
};
const toolSeoTitle=(title:string,kind:'guide'|'mistakes',lang:Lang)=>{
  const longSuffix=lang==='es'?(kind==='guide'?'guía paso a paso':'errores comunes'):(kind==='guide'?'step-by-step guide':'common mistakes');
  const full=`${title}: ${longSuffix}`;
  if(full.length<=52)return full;
  const shortSuffix=lang==='es'?(kind==='guide'?'guía':'errores'):(kind==='guide'?'guide':'mistakes');
  return `${trimTitle(title,39)}: ${shortSuffix}`;
};
const quote = (value:string) => value.replace(/\s+/g,' ').trim().slice(0,72) || '—';
const exampleEntries = (utility:ExtraUtility) => Object.entries(utility.example);

const fieldType = (field:UtilityField,lang:Lang) => {
  const es=lang==='es';
  if(field.type==='select') return es?'una opción cerrada':'a controlled option';
  if(field.type==='number') return es?'un valor numérico':'a numeric value';
  if(field.type==='date'||field.type==='datetime-local') return es?'una fecha con formato definido':'a date in a defined format';
  if(field.type==='textarea') return es?'un bloque de contenido':'a content block';
  return es?'un valor de texto':'a text value';
};

const fieldSummary = (utility:ExtraUtility,lang:Lang) => utility.fields.map((field,index)=>{
  const label=field.label[lang];
  const sample=utility.example[field.id] ?? field.value ?? '';
  const options=field.options?.slice(0,5).map((option)=>option.label[lang]).join(', ');
  if(lang==='es') return `${index+1}. «${label}» recibe ${fieldType(field,lang)}${sample?` (por ejemplo, «${quote(sample)}»)`:''}${options?`; entre sus opciones están ${options}`:''}.`;
  return `${index+1}. “${label}” expects ${fieldType(field,lang)}${sample?` (for example, “${quote(sample)}”)`:''}${options?`; available choices include ${options}`:''}.`;
}).join(' ');

const exampleSummary = (utility:ExtraUtility,lang:Lang) => exampleEntries(utility).map(([key,value])=>{
  const field=utility.fields.find((item)=>item.id===key);
  return `${field?.label[lang]||key}: ${quote(value)}`;
}).join(' · ');

const stepsFor = (utility:ExtraUtility,lang:Lang) => {
  const fields=utility.fields.map((field)=>field.label[lang]);
  if(lang==='es') return [
    `Abre ${utility.title.es} y conserva una copia de los datos originales.`,
    `Completa ${fields.slice(0,-1).join(', ')}${fields.length>1?' y ':''}${fields.at(-1)||'la entrada'} con valores coherentes.`,
    'Comprueba el resultado automático y cambia una sola entrada cada vez si necesitas comparar escenarios.',
    'Copia el resultado únicamente después de revisar unidades, formato y precisión.'
  ];
  return [
    `Open ${utility.title.en} and keep a copy of the original data.`,
    `Complete ${fields.slice(0,-1).join(', ')}${fields.length>1?' and ':''}${fields.at(-1)||'the input'} with consistent values.`,
    'Check the automatic result and change one input at a time when comparing scenarios.',
    'Copy the result only after reviewing its units, format and precision.'
  ];
};

const methodology = (utility:ExtraUtility,lang:Lang) => lang==='es'
  ? `Esta guía se crea a partir de la configuración funcional de ${utility.title.es}: campos, opciones y ejemplo comprobado. La herramienta y sus ejemplos se validan con pruebas automáticas; el contenido explica el proceso y no sustituye una revisión profesional cuando la decisión sea sensible.`
  : `This guide is built from the functional specification of ${utility.title.en}: fields, options and a verified example. The tool and its examples are checked with automated tests; the content explains the workflow and does not replace professional review for sensitive decisions.`;

const howToCopy = (utility:ExtraUtility,lang:Lang):GuideCopy => {
  const es=lang==='es',title=utility.title[lang],profile=profiles[utility.category][lang],fields=fieldSummary(utility,lang),example=exampleSummary(utility,lang),category=toolCategoryLabels[utility.category][lang];
  const sections:GuideSection[] = es ? [
    {title:`Qué hace ${title} y cuándo utilizarlo`,paragraphs:[`${title} sirve para ${profile.purpose}. Es especialmente útil para ${profile.scenario}, porque mantiene las entradas visibles y produce un resultado que se puede copiar sin crear una cuenta.`,`${utility.description.es} La categoría «${category}» agrupa esta guía con recursos que resuelven tareas relacionadas, por lo que conviene abrir esas páginas cuando el trabajo necesite más de un paso.`],tools:[utility.slug]},
    {title:'Prepara correctamente los datos de entrada',paragraphs:[`La herramienta utiliza ${utility.fields.length} ${utility.fields.length===1?'campo':'campos'}. ${fields}`,`Antes de calcular, ${profile.validation}. No rellenes un campo por intuición: identifica qué representa, qué unidad utiliza y si admite valores negativos, decimales, fechas u opciones cerradas.`]},
    {title:'Proceso paso a paso con un ejemplo',paragraphs:[`Puedes reproducir el ejemplo integrado con estos datos: ${example}. Es un punto de partida para entender la dirección del cálculo o transformación antes de sustituirlo por información propia.`,`Cambia después una entrada cada vez. Así podrás detectar qué variable provoca una diferencia, comparar escenarios y volver al ejemplo si el resultado deja de tener sentido.`],steps:stepsFor(utility,lang),tools:[utility.slug]},
    {title:'Cómo revisar e interpretar el resultado',paragraphs:[`Cuando aparezca el resultado, ${profile.interpretation}. Una salida bien formateada no demuestra por sí sola que las entradas fueran correctas; revisa el orden de magnitud, los signos y cualquier redondeo.`,`Haz una comprobación inversa o utiliza un caso sencillo cuyo resultado conozcas. Si ambos métodos coinciden, tendrás más confianza para copiar el valor al documento, código o cálculo en el que estés trabajando.`]},
    {title:'Privacidad, límites y flujo recomendado',paragraphs:[`El procesamiento se ejecuta localmente en el navegador. Los datos introducidos en ${title} no necesitan enviarse a una API para obtener el resultado, una ventaja cuando trabajas con borradores o información interna.`,`Aun así, ${profile.caution}. Guarda el contexto junto al resultado y anota cualquier supuesto para que la operación pueda repetirse y auditarse más adelante.`]}
  ] : [
    {title:`What ${title} does and when to use it`,paragraphs:[`${title} is designed to ${profile.purpose}. It is particularly useful for ${profile.scenario} because inputs stay visible and the result can be copied without creating an account.`,`${utility.description.en} The “${category}” category groups this guide with resources for adjacent tasks, so those pages are a useful next step when the workflow involves more than one operation.`],tools:[utility.slug]},
    {title:'Prepare the input correctly',paragraphs:[`The tool uses ${utility.fields.length} ${utility.fields.length===1?'field':'fields'}. ${fields}`,`Before calculating, ${profile.validation}. Do not fill a field by guesswork: identify what it represents, which unit it uses and whether it accepts negative values, decimals, dates or controlled choices.`]},
    {title:'Step-by-step process with a worked example',paragraphs:[`You can reproduce the built-in example with these values: ${example}. It provides a known starting point for understanding the direction of the calculation or transformation before entering your own information.`,`Change one input at a time afterwards. This makes it easier to identify which variable causes a difference, compare scenarios and return to the example if the result stops looking plausible.`],steps:stepsFor(utility,lang),tools:[utility.slug]},
    {title:'Review and interpret the result',paragraphs:[`When the result appears, ${profile.interpretation}. A neatly formatted output does not prove that the inputs were correct; review the order of magnitude, signs and any rounding.`,`Perform a reverse check or use a simple case whose answer you already know. Agreement between both methods gives you more confidence before copying the value into the document, code or calculation you are preparing.`]},
    {title:'Privacy, limitations and a reliable workflow',paragraphs:[`Processing runs locally in the browser. Information entered into ${title} does not need to be sent to an API to produce the result, which is useful for drafts or internal data.`,`Even so, ${profile.caution}. Save the context with the result and record assumptions so the operation can be repeated and audited later.`]}
  ];
  return {
    title:es?`Cómo usar ${title}: guía paso a paso`:`How to use ${title}: step-by-step guide`,
    seoTitle:toolSeoTitle(title,'guide',lang),
    description:trimTo(es?`Aprende a usar ${title} con un ejemplo, revisión de entradas, errores que debes evitar y comprobaciones para obtener un resultado fiable.`:`Learn how to use ${title} with a worked example, input checks, common pitfalls and practical verification steps for a reliable result.`,158),
    intro:es?`Esta guía explica qué datos necesita ${title}, cómo reproducir su ejemplo y qué comprobaciones conviene realizar antes de utilizar el resultado. El objetivo es completar la tarea con un proceso claro, repetible y privado.`:`This guide explains which data ${title} needs, how to reproduce its example and which checks to perform before using the result. The goal is a clear, repeatable and private workflow.`,
    reading:es?'8 min de lectura':'8 min read',sections,
    takeaway:es?`Utiliza el ejemplo de ${title} como control, modifica una entrada cada vez y verifica el resultado antes de copiarlo.`:`Use the ${title} example as a control, change one input at a time and verify the result before copying it.`,
    methodology:methodology(utility,lang),
    faq:es?[
      {question:`¿${title} funciona sin subir datos?`,answer:'Sí. Esta herramienta realiza el procesamiento dentro del navegador y no necesita enviar las entradas a una API.'},
      {question:'¿Por qué debo comprobar el ejemplo?',answer:'Un ejemplo conocido permite confirmar el sentido de la operación y detectar rápidamente unidades o campos intercambiados.'},
      {question:'¿Puedo usar el resultado directamente?',answer:`Puedes copiarlo después de revisar entradas, unidades y redondeo. ${profile.caution}.`}
    ]:[
      {question:`Does ${title} work without uploading data?`,answer:'Yes. This tool processes the inputs inside the browser and does not need to send them to an API.'},
      {question:'Why should I check the example?',answer:'A known example confirms the direction of the operation and helps reveal swapped fields or units quickly.'},
      {question:'Can I use the result immediately?',answer:`Copy it after reviewing inputs, units and rounding. ${profile.caution}.`}
    ]
  };
};

const mistakesCopy = (utility:ExtraUtility,lang:Lang):GuideCopy => {
  const es=lang==='es',title=utility.title[lang],profile=profiles[utility.category][lang],fields=fieldSummary(utility,lang),example=exampleSummary(utility,lang);
  const sections:GuideSection[] = es ? [
    {title:`Por qué puede fallar ${title}`,paragraphs:[`${title} aplica una operación definida, pero no puede saber si un dato correcto en formato representa lo que querías calcular. La mayoría de resultados inesperados nacen en la preparación de las entradas, no en el botón de cálculo.`,`Empieza reproduciendo este caso de control: ${example}. Si funciona, sustituye los valores uno a uno y observa en qué momento cambia el resultado.`],tools:[utility.slug]},
    {title:'Error 1: confundir campos, unidades o formatos',paragraphs:[`La configuración concreta es: ${fields}`,`Para evitar confusiones, ${profile.validation}. Escribe la unidad al lado del dato original y normaliza separadores decimales, fechas o saltos de línea antes de pegarlo.`]},
    {title:'Error 2: aceptar un resultado plausible sin verificarlo',paragraphs:[`Un número o texto con buen aspecto también puede proceder de una premisa equivocada. ${profile.interpretation}.`,`Prueba un valor límite, un caso sencillo y, cuando sea posible, la operación inversa. Estas tres comprobaciones detectan errores que pueden pasar desapercibidos en un único ejemplo.`]},
    {title:'Error 3: perder el contexto al copiar',paragraphs:[`Copiar solo la salida elimina información necesaria para reproducirla. Guarda también las entradas, la fecha y cualquier opción elegida; en este ejemplo serían ${example}.`,`Si compartes el resultado con otra persona, explica qué representa y qué no representa. ${profile.caution}.`]},
    {title:'Flujo corto para corregir resultados inesperados',paragraphs:[`Restablece ${title}, carga el ejemplo y comprueba que la salida cambia cuando modificas un campo. Después introduce tus datos con el mismo orden, revisa los límites y copia únicamente la versión verificada.`,`El procesamiento local permite repetir estas pruebas sin subir el contenido. Aun así, conserva el original y documenta las decisiones si el resultado forma parte de un proceso importante.`],steps:stepsFor(utility,lang),tools:[utility.slug]}
  ] : [
    {title:`Why ${title} can produce an unexpected result`,paragraphs:[`${title} applies a defined operation, but it cannot know whether a correctly formatted value represents what you intended to calculate. Most surprising results begin during input preparation rather than at the calculation step.`,`Start by reproducing this control case: ${example}. If it works, replace values one by one and note the point at which the result changes.`],tools:[utility.slug]},
    {title:'Mistake 1: mixing up fields, units or formats',paragraphs:[`The exact configuration is: ${fields}`,`To prevent confusion, ${profile.validation}. Write the unit beside the source value and normalise decimal separators, dates or line breaks before pasting it.`]},
    {title:'Mistake 2: accepting a plausible result without checking it',paragraphs:[`A polished number or text output can still come from a wrong assumption. ${profile.interpretation}.`,`Try a boundary value, a simple known case and, where possible, the reverse operation. Those three checks reveal mistakes that a single realistic example can hide.`]},
    {title:'Mistake 3: losing context when copying',paragraphs:[`Copying only the output removes information needed to reproduce it. Save the inputs, date and selected options too; in this example they are ${example}.`,`When sharing the result, explain what it represents and what it does not. ${profile.caution}.`]},
    {title:'A short workflow for fixing unexpected results',paragraphs:[`Reset ${title}, load its example and confirm that the output changes when one field changes. Then enter your data in the same order, review limits and copy only the verified version.`,`Local processing lets you repeat these tests without uploading the content. Even so, preserve the original and document decisions when the result belongs to an important workflow.`],steps:stepsFor(utility,lang),tools:[utility.slug]}
  ];
  return {
    title:es?`${title}: errores comunes y cómo solucionarlos`:`${title}: common mistakes and practical fixes`,
    seoTitle:toolSeoTitle(title,'mistakes',lang),
    description:trimTo(es?`Evita los errores más habituales al usar ${title}: campos intercambiados, formatos incorrectos, resultados sin verificar y pérdida de contexto.`:`Avoid common ${title} mistakes, including swapped fields, wrong formats, unchecked results and lost context, with a reliable correction workflow.`,158),
    intro:es?`Cuando ${title} devuelve algo inesperado, conviene revisar el proceso en un orden fijo. Esta guía utiliza la configuración y el ejemplo real de la herramienta para localizar fallos sin repetir el trabajo al azar.`:`When ${title} returns something unexpected, review the workflow in a fixed order. This guide uses the tool's real configuration and example to locate mistakes without random trial and error.`,
    reading:es?'7 min de lectura':'7 min read',sections,
    takeaway:es?'Reproduce primero el ejemplo conocido, cambia una sola entrada y conserva siempre el contexto del resultado.':'Reproduce the known example first, change one input at a time and always preserve the context of the result.',
    methodology:methodology(utility,lang),
    faq:es?[
      {question:'¿Cuál es la primera comprobación?',answer:`Carga el ejemplo (${example}) y confirma que la herramienta responde antes de introducir tus datos.`},
      {question:'¿Qué hago si el resultado parece demasiado grande o pequeño?',answer:`Revisa las unidades, el orden de los campos y los separadores decimales. Después ${profile.interpretation}.`},
      {question:'¿Se guardan mis pruebas?',answer:'No se necesita una cuenta ni un envío a API. Guarda manualmente las entradas si quieres conservar un registro reproducible.'}
    ]:[
      {question:'What should I check first?',answer:`Load the example (${example}) and confirm that the tool responds before entering your own data.`},
      {question:'What if the result looks too large or too small?',answer:`Review units, field order and decimal separators. Then ${profile.interpretation}.`},
      {question:'Are my tests saved?',answer:'No account or API upload is required. Save the inputs yourself if you need a reproducible record.'}
    ]
  };
};

// A deterministic spread keeps all tool families represented while producing exactly 250 topics.
export const guideSourceUtilities = extraUtilities.filter((_,index)=>index%6!==0).slice(0,250);

export const generatedGuides:Guide[] = guideSourceUtilities.flatMap((utility)=>{
  const enHow=`how-to-use-${utility.slug}`;
  const esName=slugify(utility.title.es);
  const how:Guide={
    slug:enHow,
    localizedSlugs:{en:enHow,es:`como-usar-${esName}`},
    category:utility.category,kind:'how-to',primaryTool:utility.slug,published:PUBLISHED,modified:PUBLISHED,
    copy:{en:howToCopy(utility,'en'),es:howToCopy(utility,'es')}
  };
  const enMistakes=`${utility.slug}-common-mistakes`;
  const mistakes:Guide={
    slug:enMistakes,
    localizedSlugs:{en:enMistakes,es:`errores-comunes-${esName}`},
    category:utility.category,kind:'troubleshooting',primaryTool:utility.slug,published:PUBLISHED,modified:PUBLISHED,
    copy:{en:mistakesCopy(utility,'en'),es:mistakesCopy(utility,'es')}
  };
  return [how,mistakes];
});
