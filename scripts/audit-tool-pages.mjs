import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const home = readFileSync(join(dist, 'index.html'), 'utf8');
const cssBundle = readdirSync(join(dist, '_astro')).filter((file) => file.endsWith('.css')).map((file) => readFileSync(join(dist, '_astro', file), 'utf8')).join('\n');
const cards = [...home.matchAll(/data-tool-path="([^"]+)"[^>]*data-local="(true|false)"/g)];
const tools = [...new Map(cards.map((match) => [match[1], { path: match[1], local: match[2] === 'true' }])).values()];
const text = (html, pattern) => html.match(pattern)?.[1]?.replace(/<[^>]+>/g, '').trim() ?? '';
const count = (html, pattern) => [...html.matchAll(pattern)].length;

const inspect = (tool, lang) => {
  const relative = `${lang === 'es' ? 'es/' : ''}${tool.path.replace(/^\//, '')}index.html`;
  const html = readFileSync(join(dist, relative), 'utf8');
  const semanticHtml = html.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  const issues = [];
  const title = text(html, /<title>([\s\S]*?)<\/title>/i);
  const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? '';
  const expectedCanonical = `https://tools.alon.one${lang === 'es' ? '/es' : ''}${tool.path}`;
  const controls = count(semanticHtml, /<(?:input|select|textarea)\b/gi);
  const labels = count(semanticHtml, /<label\b/gi);
  const labelFors = new Set([...semanticHtml.matchAll(/<label\b[^>]*\bfor="([^"]+)"/gi)].map((match) => match[1]));
  let labelDepth = 0;
  let unlabeledControls = 0;
  const unlabeled = [];
  for (const token of semanticHtml.matchAll(/<\/label\s*>|<label\b[^>]*>|<(input|select|textarea)\b([^>]*)>/gi)) {
    if (/^<label/i.test(token[0])) labelDepth += 1;
    else if (/^<\/label/i.test(token[0])) labelDepth = Math.max(0, labelDepth - 1);
    else {
      const attrs = token[2] ?? '';
      const id = attrs.match(/\bid="([^"]+)"/i)?.[1];
      const hidden = /\btype="hidden"/i.test(attrs);
      const named = /\baria-label(?:ledby)?="[^"]+"/i.test(attrs);
      if (!hidden && !named && labelDepth === 0 && !(id && labelFors.has(id))) {
        unlabeledControls += 1;
        unlabeled.push(id ?? attrs.match(/\bname="([^"]+)"/i)?.[1] ?? token[1]);
      }
    }
  }
  const buttons = [...semanticHtml.matchAll(/<button\b([^>]*)>/gi)];
  const ids = [...semanticHtml.matchAll(/\sid="([^"]+)"/gi)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];

  if (count(html, /<h1\b/gi) !== 1) issues.push('Debe existir exactamente un h1.');
  if (!title || title.length < 10 || title.length > 80) issues.push('Title ausente o fuera de longitud útil.');
  if (!description || description.length < 50 || description.length > 180) issues.push('Meta description ausente o fuera de longitud útil.');
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) issues.push('Canonical incorrecta.');
  if (!html.includes(`hreflang="en"`) || !html.includes(`hreflang="es"`)) issues.push('Faltan alternates bilingües.');
  if (!html.includes(`<html lang="${lang}"`)) issues.push('Idioma HTML incorrecto.');
  if (!html.includes('"@type":"WebApplication"')) issues.push('Falta schema WebApplication.');
  if (!html.includes('<main')) issues.push('Falta main semántico.');
  if (duplicateIds.length) issues.push(`ID duplicados: ${duplicateIds.join(', ')}.`);
  if (buttons.some((button) => !/\btype=/.test(button[1]))) issues.push('Hay botones sin type explícito.');
  if (unlabeledControls) issues.push(`${unlabeledControls} controles sin etiqueta accesible: ${unlabeled.join(', ')}.`);
  if (/fonts\.googleapis|fonts\.gstatic|use\.typekit/i.test(html)) issues.push('Carga fuentes externas.');
  if (tool.local && !/100% local|Local processing|Procesamiento local/.test(html)) issues.push('No comunica claramente el procesamiento local.');
  if (!/:focus-visible|shadow-focus/.test(cssBundle)) issues.push('No se detecta estilo de foco visible.');

  return { lang, title, descriptionLength: description.length, controls, labels, unlabeledControls, unlabeled, issues };
};

const results = tools.map((tool) => {
  const pages = [inspect(tool, 'en'), inspect(tool, 'es')];
  return { ...tool, passed: pages.every((page) => page.issues.length === 0), pages };
});
const report = {
  generatedAt: new Date().toISOString(),
  totalTools: tools.length,
  totalPages: tools.length * 2,
  passedTools: results.filter((tool) => tool.passed).length,
  toolsWithFindings: results.filter((tool) => !tool.passed).length,
  results
};

mkdirSync(join(root, 'reports'), { recursive: true });
writeFileSync(join(root, 'reports/tool-usability-audit.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Audited ${report.totalTools} tools (${report.totalPages} localized pages): ${report.passedTools} passed, ${report.toolsWithFindings} with findings.`);
if (report.toolsWithFindings) {
  for (const tool of results.filter((item) => !item.passed).slice(0, 20)) console.log(`${tool.path}: ${tool.pages.flatMap((page) => page.issues).join(' | ')}`);
  process.exitCode = 1;
}
