import { tools } from '../data/tools';
import { toolCategoryLabels } from '../data/tools';
import { guideSlugs } from '../data/guides';

const site = 'https://tools.alon.one';

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export function GET() {
  const paths = [
    '/',
    '/guides/',
    ...Object.keys(toolCategoryLabels).map((category) => `/tools/${category}/`),
    ...guideSlugs.map((guide) => `/guides/${guide}/`),
    ...tools.map((tool) => `/${tool.slug}/`)
  ];
  const urls = paths.flatMap((path) => [path, `/es${path}`]);
  const body = urls.map((path) => {
    const priority = path === '/' || path === '/es/' ? '1.0' : path.includes('/tools/') || path.includes('/guides/') ? '0.7' : '0.8';
    return `  <url>\n    <loc>${escapeXml(`${site}${path}`)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
