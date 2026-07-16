import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const sitemap=readFileSync(join(root,'dist/sitemap.xml'),'utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match)=>match[1].replaceAll('&amp;','&'));
const guideUrls=urls.filter((url)=>new URL(url).pathname.includes('/guides/'));
const articleUrls=guideUrls.filter((url)=>!new URL(url).pathname.endsWith('/guides/')&&!new URL(url).pathname.includes('/guides/topics/'));
const failures=[];const records=[];const titles=[];const descriptions=[];const canonicals=[];
const text=(html)=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&[a-z0-9#]+;/gi,' ').replace(/\s+/g,' ').trim();
const attr=(html,pattern)=>html.match(pattern)?.[1]||'';
const count=(html,pattern)=>(html.match(pattern)||[]).length;

for(const url of articleUrls){
  const pathname=new URL(url).pathname;const file=join(root,'dist',pathname.replace(/^\//,''),'index.html');const html=readFileSync(file,'utf8');const issues=[];
  const title=attr(html,/<title>([\s\S]*?)<\/title>/i);const description=attr(html,/<meta name="description" content="([^"]*)"/i);const canonical=attr(html,/<link rel="canonical" href="([^"]*)"/i);const lang=attr(html,/<html lang="([^"]+)"/i);const en=attr(html,/<link rel="alternate" hreflang="en" href="([^"]*)"/i);const es=attr(html,/<link rel="alternate" hreflang="es" href="([^"]*)"/i);const articleText=text(attr(html,/<article class="guide-page"[^>]*>([\s\S]*?)<\/article>/i));
  let schema;try{schema=JSON.parse(attr(html,/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i))}catch{issues.push('invalid JSON-LD')}
  const graph=schema?.['@graph']||[];const article=graph.find((item)=>item['@type']==='Article');const breadcrumb=graph.find((item)=>item['@type']==='BreadcrumbList');
  const generated=en.includes('/how-to-use-')||en.includes('-common-mistakes/');
  if(count(html,/<h1\b/gi)!==1)issues.push('expected exactly one H1');
  if(title.length<35||title.length>65)issues.push(`title length ${title.length}`);
  if(description.length<105||description.length>160)issues.push(`description length ${description.length}`);
  if(canonical!==url)issues.push('canonical does not match sitemap URL');
  if(!en||!es||en===es)issues.push('missing localized alternates');
  if(lang!==(pathname.startsWith('/es/')?'es':'en'))issues.push(`wrong lang ${lang}`);
  if(!article||!article.datePublished||!article.dateModified||!article.author)issues.push('incomplete Article schema');
  if(!breadcrumb||breadcrumb.itemListElement?.length<4)issues.push('incomplete breadcrumb schema');
  if(count(html,/<h2\b/gi)<4)issues.push('insufficient heading structure');
  if(count(html,/<a\b/gi)<8)issues.push('insufficient internal links');
  if(/fonts\.googleapis|use\.typekit|fonts\.gstatic/i.test(html))issues.push('external font detected');
  if(generated&&articleText.split(/\s+/).length<500)issues.push(`thin generated article (${articleText.split(/\s+/).length} words)`);
  if(generated&&!/How this guide was prepared|Cómo se ha preparado esta guía/.test(articleText))issues.push('missing methodology disclosure');
  if(generated&&count(html,/<details\b/gi)<3)issues.push('missing visible FAQ');
  if(generated&&!/Use tool|Usar herramienta/.test(articleText))issues.push('missing primary tool CTA');
  failures.push(...issues.map((issue)=>`${pathname}: ${issue}`));records.push({url,lang,titleLength:title.length,descriptionLength:description.length,wordCount:articleText.split(/\s+/).length,generated,issues});titles.push(`${lang}:${title}`);descriptions.push(`${lang}:${description}`);canonicals.push(canonical);
}

if(new Set(urls).size!==urls.length)failures.push('Duplicate URL in sitemap');
if(new Set(canonicals).size!==canonicals.length)failures.push('Duplicate guide canonical');
if(new Set(titles).size!==titles.length)failures.push('Duplicate localized guide title');
if(new Set(descriptions).size!==descriptions.length)failures.push('Duplicate localized guide description');
if(articleUrls.length!==1008)failures.push(`Expected 1008 localized article pages, found ${articleUrls.length}`);
const report={generatedAt:new Date().toISOString(),summary:{sitemapUrls:urls.length,guideUrls:guideUrls.length,articlePages:articleUrls.length,passed:records.filter((item)=>!item.issues.length).length,failed:records.filter((item)=>item.issues.length).length,findings:failures.length},failures,records};
mkdirSync(join(root,'reports'),{recursive:true});writeFileSync(join(root,'reports/guide-seo-audit.json'),JSON.stringify(report,null,2));
if(failures.length){console.error(failures.slice(0,100).join('\n'));process.exitCode=1}else console.log(`Audited ${articleUrls.length} localized guide pages: all passed. Sitemap contains ${urls.length} URLs.`);
