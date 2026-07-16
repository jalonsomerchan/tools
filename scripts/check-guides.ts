import { guides, getGuidePath } from '../src/data/guides';
import { generatedGuides, guideSourceUtilities } from '../src/data/generated-guides';
import { tools } from '../src/data/tools';

const failures:string[]=[];
const expect=(condition:boolean,message:string)=>{if(!condition)failures.push(message)};
const unique=(values:string[])=>new Set(values).size===values.length;
const duplicates=(values:string[])=>[...new Set(values.filter((value,index)=>values.indexOf(value)!==index))];
const wordCount=(value:string)=>value.trim().split(/\s+/).filter(Boolean).length;

expect(generatedGuides.length===500,`Expected 500 generated guides, found ${generatedGuides.length}`);
expect(guideSourceUtilities.length===250,`Expected 250 source tools, found ${guideSourceUtilities.length}`);
expect(guides.length===504,`Expected 504 total guides, found ${guides.length}`);
expect(unique(guides.map((guide)=>guide.slug)),'Duplicate canonical guide slug');
expect(unique(guides.map((guide)=>getGuidePath(guide,'en'))),'Duplicate English guide path');
expect(unique(guides.map((guide)=>getGuidePath(guide,'es'))),'Duplicate Spanish guide path');

for(const lang of ['en','es'] as const){
  expect(unique(guides.map((guide)=>guide.copy[lang].title)),`Duplicate ${lang} H1 title`);
  const seoTitles=guides.map((guide)=>guide.copy[lang].seoTitle||guide.copy[lang].title);
  expect(unique(seoTitles),`Duplicate ${lang} SEO titles: ${duplicates(seoTitles).join(' | ')}`);
  expect(unique(guides.map((guide)=>guide.copy[lang].description)),`Duplicate ${lang} meta description`);
  for(const guide of guides){
    const copy=guide.copy[lang];
    expect(copy.title.length>=20,`${guide.slug} ${lang}: short title`);
    expect(copy.description.length>=(guide.kind==='foundational'?80:105)&&copy.description.length<=160,`${guide.slug} ${lang}: description length ${copy.description.length}`);
    expect(copy.sections.length>=3,`${guide.slug} ${lang}: fewer than 3 sections`);
    expect(copy.sections.every((section)=>section.paragraphs.length>0),`${guide.slug} ${lang}: empty section`);
    if(guide.kind!=='foundational'){
      const body=[copy.intro,...copy.sections.flatMap((section)=>[section.title,...section.paragraphs,...(section.steps||[])]),...(copy.faq||[]).flatMap((item)=>[item.question,item.answer]),copy.takeaway,copy.methodology||''].join(' ');
      expect(copy.sections.length===5,`${guide.slug} ${lang}: generated guide must have 5 sections`);
      expect(wordCount(body)>=450,`${guide.slug} ${lang}: only ${wordCount(body)} words`);
      expect((copy.faq?.length||0)>=3,`${guide.slug} ${lang}: missing FAQ`);
      expect(Boolean(copy.methodology),`${guide.slug} ${lang}: missing methodology disclosure`);
    }
  }
}

const toolSlugs=new Set(tools.map((tool)=>tool.slug));
for(const guide of generatedGuides){
  expect(Boolean(guide.primaryTool&&toolSlugs.has(guide.primaryTool)),`${guide.slug}: unknown primary tool`);
  for(const section of guide.copy.en.sections){for(const slug of section.tools||[])expect(toolSlugs.has(slug),`${guide.slug}: broken tool link ${slug}`)}
}

if(failures.length){console.error(failures.slice(0,100).join('\n'));process.exitCode=1}else console.log(`Validated ${generatedGuides.length} generated guides (${guides.length} total) in English and Spanish.`);
