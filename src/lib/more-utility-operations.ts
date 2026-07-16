import { getMoreUtilitySpec } from '../data/more-utilities';

type Values=Record<string,string>;
const n=(v:Values,k:string)=>{const x=Number(v[k]);if(!Number.isFinite(x))throw new Error('invalid');return x};
const f=(x:number,locale:string,d=6)=>new Intl.NumberFormat(locale,{maximumFractionDigits:d}).format(x);
const tr=(locale:string,en:string,es:string)=>locale.startsWith('es')?es:en;
const nums=(s:string)=>s.split(/[\s,;]+/).filter(Boolean).map(Number).filter(Number.isFinite);
const words=(s:string)=>s.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu)??[];
const clean=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().replace(/[^a-z0-9]/g,'');
const gcd=(a:number,b:number):number=>b?gcd(b,a%b):Math.abs(a);
const randomInt=(max:number)=>{const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%max};
const randomChars=(length:number,alphabet='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-')=>Array.from({length},()=>alphabet[randomInt(alphabet.length)]).join('');
const slug=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const safeCount=(v:Values,k='count',max=100)=>Math.min(max,Math.max(1,Math.trunc(n(v,k))));

export function executeMoreUtility(operation:string,v:Values,locale='en'):string{
  const spec=getMoreUtilitySpec(operation);
  if(!spec)throw new Error(`Unknown operation: ${operation}`);
  if(spec.mode==='convert'){
    const units=spec.config?.units??{},from=units[v.from],to=units[v.to],value=n(v,'input');
    if(!Number.isFinite(from)||!Number.isFinite(to)||to===0)throw new Error('invalid');
    return `${f(value,locale)} ${v.from} = ${f(value*from/to,locale,12)} ${v.to}`;
  }
  const pct=(a:number,b:number)=>{if(b===0)throw new Error('invalid');return a/b*100};
  const money=(x:number)=>f(x,locale,2);
  const percentMap:Record<string,[string,string]>={
    'churn-rate-calculator':['lost','start'],'conversion-rate-calculator':['conversions','visits'],'email-open-rate-calculator':['opens','delivered'],'click-through-rate-calculator':['clicks','impressions'],'occupancy-rate-calculator':['occupied','available'],'debt-to-income-calculator':['debt','income'],'credit-utilization-calculator':['balance','limit'],'rent-income-ratio-calculator':['rent','income'],'dividend-yield-calculator':['dividend','price']
  };
  if(percentMap[operation]){const [a,b]=percentMap[operation];return `${f(pct(n(v,a),n(v,b)),locale,2)}%`;}
  const divideMap:Record<string,[string,string,string]>={
    'unit-price-calculator':['price','quantity',tr(locale,'Price per unit','Precio por unidad')],'cost-per-click-calculator':['cost','clicks','CPC'],'cost-per-acquisition-calculator':['cost','customers','CPA'],'revpar-calculator':['revenue','rooms','RevPAR'],'price-earnings-calculator':['price','eps','P/E'],'current-ratio-calculator':['assets','liabilities',tr(locale,'Current ratio','Ratio corriente')],'cash-runway-calculator':['cash','burn',tr(locale,'Months of runway','Meses de runway')]
  };
  if(divideMap[operation]){const[a,b,label]=divideMap[operation],den=n(v,b);if(!den)throw new Error('invalid');return `${label}: ${f(n(v,a)/den,locale,2)}`;}

  switch(operation){
    case'sales-tax-calculator':{const tax=n(v,'price')*n(v,'rate')/100;return `${tr(locale,'Tax','Impuesto')}: ${money(tax)}\n${tr(locale,'Total','Total')}: ${money(n(v,'price')+tax)}`}
    case'discount-price-calculator':{const saving=n(v,'price')*n(v,'rate')/100;return `${tr(locale,'Savings','Ahorro')}: ${money(saving)}\n${tr(locale,'Final price','Precio final')}: ${money(n(v,'price')-saving)}`}
    case'commission-calculator':{const x=n(v,'sales')*n(v,'rate')/100;return `${tr(locale,'Commission','Comisión')}: ${money(x)}\n${tr(locale,'After commission','Después de comisión')}: ${money(n(v,'sales')-x)}`}
    case'net-price-calculator':{const net=n(v,'gross')/(1+n(v,'rate')/100);return `${tr(locale,'Net price','Precio neto')}: ${money(net)}\n${tr(locale,'Tax included','Impuesto incluido')}: ${money(n(v,'gross')-net)}`}
    case'gross-profit-calculator':{const profit=n(v,'revenue')-n(v,'cost');return `${tr(locale,'Gross profit','Beneficio bruto')}: ${money(profit)}\n${tr(locale,'Gross margin','Margen bruto')}: ${f(pct(profit,n(v,'revenue')),locale,2)}%`}
    case'contribution-margin-calculator':{const margin=n(v,'price')-n(v,'variable');return `${tr(locale,'Contribution per unit','Contribución por unidad')}: ${money(margin)}\n${tr(locale,'Margin ratio','Ratio de margen')}: ${f(pct(margin,n(v,'price')),locale,2)}%`}
    case'inventory-turnover-calculator':{const inv=n(v,'inventory');if(!inv)throw 0;const turn=n(v,'cogs')/inv;return `${tr(locale,'Turnover','Rotación')}: ${f(turn,locale,2)}×\n${tr(locale,'Days in inventory','Días en inventario')}: ${f(365/turn,locale,1)}`}
    case'customer-lifetime-value-calculator':return `CLV: ${money(n(v,'order')*n(v,'frequency')*n(v,'years'))}`;
    case'cpm-calculator':return `CPM: ${money(n(v,'cost')/n(v,'impressions')*1000)}`;
    case'roas-calculator':return `ROAS: ${f(n(v,'revenue')/n(v,'spend'),locale,2)}×\n${f(pct(n(v,'revenue'),n(v,'spend')),locale,0)}%`;
    case'straight-line-depreciation':{const annual=(n(v,'cost')-n(v,'salvage'))/n(v,'years');return `${tr(locale,'Annual depreciation','Amortización anual')}: ${money(annual)}\n${tr(locale,'Monthly','Mensual')}: ${money(annual/12)}`}
    case'declining-balance-depreciation':{const value=n(v,'cost')*(1-n(v,'rate')/100)**n(v,'years');return `${tr(locale,'Book value','Valor contable')}: ${money(value)}\n${tr(locale,'Accumulated depreciation','Amortización acumulada')}: ${money(n(v,'cost')-value)}`}
    case'present-value-calculator':return `${tr(locale,'Present value','Valor presente')}: ${money(n(v,'future')/(1+n(v,'rate')/100)**n(v,'years'))}`;
    case'future-value-calculator':return `${tr(locale,'Future value','Valor futuro')}: ${money(n(v,'present')*(1+n(v,'rate')/100)**n(v,'years'))}`;
    case'inflation-impact-calculator':{const future=n(v,'amount')*(1+n(v,'rate')/100)**n(v,'years');return `${tr(locale,'Equivalent future cost','Coste futuro equivalente')}: ${money(future)}\n${tr(locale,'Increase','Aumento')}: ${money(future-n(v,'amount'))}`}
    case'purchasing-power-calculator':return `${tr(locale,'Future purchasing power','Poder adquisitivo futuro')}: ${money(n(v,'amount')/(1+n(v,'rate')/100)**n(v,'years'))}`;
    case'emergency-fund-calculator':return `${tr(locale,'Recommended fund','Fondo recomendado')}: ${money(n(v,'expenses')*n(v,'months'))}`;
    case'retirement-savings-calculator':{const r=n(v,'rate')/1200,m=n(v,'years')*12,total=n(v,'current')*(1+r)**m+n(v,'monthly')*((1+r)**m-1)/(r||1);return `${tr(locale,'Projected balance','Saldo proyectado')}: ${money(total)}\n${tr(locale,'Total contributions','Aportaciones totales')}: ${money(n(v,'current')+n(v,'monthly')*m)}`}
    case'mortgage-affordability-calculator':{const max=n(v,'income')*n(v,'ratio')/100-n(v,'debts');return `${tr(locale,'Estimated maximum housing payment','Pago máximo estimado de vivienda')}: ${money(Math.max(0,max))}\n${tr(locale,'Informational estimate only.','Estimación meramente orientativa.')}`}
    case'annualized-return-calculator':case'cagr-calculator':{const years=n(v,'years');if(years<=0||n(v,'initial')<=0)throw 0;return `${operation==='cagr-calculator'?'CAGR':tr(locale,'Annualized return','Rentabilidad anualizada')}: ${f(((n(v,'final')/n(v,'initial'))**(1/years)-1)*100,locale,2)}%`}
    case'earnings-per-share-calculator':return `EPS: ${money((n(v,'income')-n(v,'preferred'))/n(v,'shares'))}`;
    case'working-capital-calculator':return `${tr(locale,'Working capital','Capital circulante')}: ${money(n(v,'assets')-n(v,'liabilities'))}`;
    case'quick-ratio-calculator':return `${tr(locale,'Quick ratio','Prueba ácida')}: ${f((n(v,'cash')+n(v,'receivables'))/n(v,'liabilities'),locale,2)}`;
    case'absolute-difference-calculator':return `${tr(locale,'Absolute difference','Diferencia absoluta')}: ${f(Math.abs(n(v,'a')-n(v,'b')),locale)}`;
    case'ratio-calculator':{let a=Math.round(n(v,'a')),b=Math.round(n(v,'b'));const d=gcd(a,b);return `${a/d}:${b/d}\n${tr(locale,'Decimal ratio','Proporción decimal')}: ${f(a/b,locale,6)}`}
    case'quadratic-equation-solver':{const a=n(v,'a'),b=n(v,'b'),c=n(v,'c');if(!a)throw 0;const d=b*b-4*a*c;if(d<0)return `${tr(locale,'No real roots. Discriminant','No hay raíces reales. Discriminante')}: ${f(d,locale)}`;const x1=(-b+Math.sqrt(d))/(2*a),x2=(-b-Math.sqrt(d))/(2*a);return `x₁ = ${f(x1,locale,10)}\nx₂ = ${f(x2,locale,10)}\nΔ = ${f(d,locale)}`}
    case'circle-calculator':{const r=n(v,'radius');return `${tr(locale,'Area','Área')}: ${f(Math.PI*r*r,locale)}\n${tr(locale,'Circumference','Circunferencia')}: ${f(2*Math.PI*r,locale)}\n${tr(locale,'Diameter','Diámetro')}: ${f(2*r,locale)}`}
    case'rectangle-calculator':{const w=n(v,'width'),h=n(v,'height');return `${tr(locale,'Area','Área')}: ${f(w*h,locale)}\n${tr(locale,'Perimeter','Perímetro')}: ${f(2*(w+h),locale)}`}
    case'triangle-area-calculator':return `${tr(locale,'Area','Área')}: ${f(n(v,'base')*n(v,'height')/2,locale)}`;
    case'trapezoid-area-calculator':return `${tr(locale,'Area','Área')}: ${f((n(v,'a')+n(v,'b'))*n(v,'height')/2,locale)}`;
    case'sphere-calculator':{const r=n(v,'radius');return `${tr(locale,'Volume','Volumen')}: ${f(4/3*Math.PI*r**3,locale)}\n${tr(locale,'Surface area','Área superficial')}: ${f(4*Math.PI*r*r,locale)}`}
    case'cylinder-calculator':{const r=n(v,'radius'),h=n(v,'height');return `${tr(locale,'Volume','Volumen')}: ${f(Math.PI*r*r*h,locale)}\n${tr(locale,'Surface area','Área superficial')}: ${f(2*Math.PI*r*(r+h),locale)}`}
    case'cone-calculator':{const r=n(v,'radius'),h=n(v,'height'),s=Math.sqrt(r*r+h*h);return `${tr(locale,'Volume','Volumen')}: ${f(Math.PI*r*r*h/3,locale)}\n${tr(locale,'Surface area','Área superficial')}: ${f(Math.PI*r*(r+s),locale)}`}
    case'pythagorean-calculator':return `${tr(locale,'Hypotenuse','Hipotenusa')}: ${f(Math.hypot(n(v,'a'),n(v,'b')),locale)}`;
    case'distance-2d-calculator':return `${tr(locale,'Distance','Distancia')}: ${f(Math.hypot(n(v,'x2')-n(v,'x1'),n(v,'y2')-n(v,'y1')),locale)}`;
    case'midpoint-calculator':return `(${f((n(v,'x1')+n(v,'x2'))/2,locale)}, ${f((n(v,'y1')+n(v,'y2'))/2,locale)})`;
    case'slope-calculator':{const dx=n(v,'x2')-n(v,'x1');if(!dx)throw 0;return `${tr(locale,'Slope','Pendiente')}: ${f((n(v,'y2')-n(v,'y1'))/dx,locale)}`}
    case'standard-deviation-calculator':case'variance-calculator':{const a=nums(v.input);if(!a.length)throw 0;const mean=a.reduce((x,y)=>x+y,0)/a.length,variance=a.reduce((s,x)=>s+(x-mean)**2,0)/a.length;return `${tr(locale,'Mean','Media')}: ${f(mean,locale)}\n${tr(locale,'Variance','Varianza')}: ${f(variance,locale)}\n${tr(locale,'Standard deviation','Desviación estándar')}: ${f(Math.sqrt(variance),locale)}`}
    case'weighted-average-calculator':{const rows=v.input.split(/\r?\n/).map(x=>x.split(':').map(Number)).filter(x=>x.length===2&&x.every(Number.isFinite));const weight=rows.reduce((s,x)=>s+x[1],0);if(!weight)throw 0;return `${tr(locale,'Weighted average','Media ponderada')}: ${f(rows.reduce((s,x)=>s+x[0]*x[1],0)/weight,locale)}`}
    case'z-score-calculator':return `z = ${f((n(v,'value')-n(v,'mean'))/n(v,'sd'),locale)}`;
    case'factorial-calculator':{const x=Math.trunc(n(v,'input'));if(x<0||x>500)throw 0;let r=1n;for(let i=2n;i<=BigInt(x);i++)r*=i;return `${x}! = ${r}`}
    case'prime-checker':{const x=Math.trunc(n(v,'input'));let prime=x>=2;for(let i=2;i*i<=x&&prime;i++)if(x%i===0)prime=false;return prime?tr(locale,'Prime number.','Es un número primo.'):tr(locale,'Not a prime number.','No es un número primo.')}
    case'prime-factorization':{let x=Math.trunc(n(v,'input'));if(x<2)throw 0;const out=[];for(let p=2;p*p<=x;p++)while(x%p===0){out.push(p);x/=p}if(x>1)out.push(x);return out.join(' × ')}
    case'lcm-calculator':{const a=Math.trunc(n(v,'a')),b=Math.trunc(n(v,'b'));return `LCM / MCM = ${Math.abs(a*b)/gcd(a,b)}`}
    case'gcd-calculator':return `GCD / MCD = ${gcd(Math.trunc(n(v,'a')),Math.trunc(n(v,'b')))}`;
    case'modulo-calculator':return `${n(v,'a')} mod ${n(v,'b')} = ${n(v,'a')%n(v,'b')}`;
    case'logarithm-calculator':{const x=n(v,'value'),base=n(v,'base');if(x<=0||base<=0||base===1)throw 0;return `log${base}(${x}) = ${f(Math.log(x)/Math.log(base),locale,12)}`}
    case'nth-root-calculator':{const root=n(v,'root');if(!root)throw 0;return `${root}√${n(v,'value')} = ${f(Math.sign(n(v,'value'))*Math.abs(n(v,'value'))**(1/root),locale,12)}`}
    case'ohms-law-calculator':{const r=n(v,'resistance');if(!r)throw 0;const current=n(v,'voltage')/r;return `${tr(locale,'Current','Corriente')}: ${f(current,locale,6)} A\n${tr(locale,'Power','Potencia')}: ${f(n(v,'voltage')*current,locale,6)} W`}
    case'resistors-series-calculator':{const a=nums(v.input);if(!a.length)throw 0;return `${tr(locale,'Equivalent resistance','Resistencia equivalente')}: ${f(a.reduce((x,y)=>x+y,0),locale)} Ω`}
    case'resistors-parallel-calculator':{const a=nums(v.input);if(!a.length||a.some(x=>x===0))throw 0;return `${tr(locale,'Equivalent resistance','Resistencia equivalente')}: ${f(1/a.reduce((s,x)=>s+1/x,0),locale)} Ω`}
    case'led-resistor-calculator':{const current=n(v,'current')/1000;if(current<=0||n(v,'supply')<=n(v,'forward'))throw 0;const r=(n(v,'supply')-n(v,'forward'))/current;return `${tr(locale,'Minimum resistance','Resistencia mínima')}: ${f(r,locale,0)} Ω\n${tr(locale,'Resistor power','Potencia de la resistencia')}: ${f(current**2*r,locale,3)} W`}

    case'duplicate-word-remover':{const seen=new Set<string>();return words(v.input).filter(x=>!seen.has(x)&&seen.add(x)).join(' ')}
    case'smart-quotes-converter':return v.direction==='straight'?v.input.replace(/[“”]/g,'"').replace(/[‘’]/g,"'"):v.input.replace(/"([^"\n]+)"/g,'“$1”').replace(/'([^'\n]+)'/g,'‘$1’');
    case'tabs-spaces-converter':{const size=Math.max(1,Math.trunc(n(v,'size'))),spaces=' '.repeat(size);return v.direction==='spaces-to-tabs'?v.input.replace(new RegExp(spaces,'g'),'\t'):v.input.replaceAll('\t',spaces)}
    case'text-indent-tool':return v.input.split(/\r?\n/).map(x=>' '.repeat(Math.max(0,Math.trunc(n(v,'size'))))+x).join('\n');
    case'line-wrap-tool':{const width=Math.max(5,Math.trunc(n(v,'width'))),out:string[]=[];for(const paragraph of v.input.split(/\r?\n/)){let line='';for(const word of paragraph.split(/\s+/)){if(line&&line.length+word.length+1>width){out.push(line);line=word}else line+=(line?' ':'')+word}out.push(line)}return out.join('\n')}
    case'text-truncator':{const length=Math.max(1,Math.trunc(n(v,'length')));return Array.from(v.input).length<=length?v.input:Array.from(v.input).slice(0,Math.max(1,length-1)).join('').trimEnd()+'…'}
    case'excerpt-generator':{const a=v.input.trim().split(/\s+/),limit=Math.max(1,Math.trunc(n(v,'words')));return a.length<=limit?v.input:a.slice(0,limit).join(' ')+'…'}
    case'initials-generator':return v.input.trim().split(/\s+/).filter(Boolean).map(x=>[...x][0]?.toUpperCase()).join('');
    case'acronym-generator':return v.input.split(/\s+/).filter(x=>x.length>2&&!['and','the','for','with','from','para','con','del','las','los'].includes(x.toLowerCase())).map(x=>x[0]?.toUpperCase()).join('');
    case'hashtag-generator':return [...new Set(words(v.input))].map(x=>`#${x}`).join(' ');
    case'keyword-density-checker':{const a=words(v.input),key=v.keyword.toLowerCase(),count=a.filter(x=>x===key).length;return `${tr(locale,'Occurrences','Apariciones')}: ${count}\n${tr(locale,'Density','Densidad')}: ${f(a.length?count/a.length*100:0,locale,2)}%`}
    case'stop-word-remover':{const stop=new Set(['a','an','and','are','as','at','be','by','for','from','in','is','it','of','on','or','that','the','to','with','de','del','el','la','las','los','un','una','y','o','en','por','para','con','es']);return v.input.split(/(\s+)/).filter(x=>!stop.has(x.toLowerCase())).join('')}
    case'punctuation-remover':return v.input.replace(/[\p{P}\p{S}]/gu,'');
    case'emoji-remover':return v.input.replace(/[\p{Extended_Pictographic}\uFE0F]/gu,'');
    case'html-tag-stripper':return v.input.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,'').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>');
    case'markdown-link-extractor':return [...v.input.matchAll(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)].map(x=>`${x[1]}\t${x[2]}`).join('\n');
    case'csv-column-extractor':{const rows=v.input.split(/\r?\n/).map(x=>x.split(',')),index=/^\d+$/.test(v.column)?Number(v.column):rows[0]?.indexOf(v.column);if(index<0)throw 0;return rows.slice(1).map(x=>x[index]??'').join('\n')}
    case'log-line-filter':return v.input.split(/\r?\n/).filter(x=>x.toLowerCase().includes(v.query.toLowerCase())).join('\n');
    case'exclude-line-filter':return v.input.split(/\r?\n/).filter(x=>!x.toLowerCase().includes(v.query.toLowerCase())).join('\n');
    case'sort-lines-by-length':return v.input.split(/\r?\n/).sort((a,b)=>a.length-b.length).join('\n');
    case'rotate-lines':{const a=v.input.split(/\r?\n/),count=((Math.trunc(n(v,'count'))%a.length)+a.length)%a.length;return [...a.slice(count),...a.slice(0,count)].join('\n')}
    case'transpose-text-grid':{const rows=v.input.split(/\r?\n/).map(x=>x.split(v.separator)),width=Math.max(...rows.map(x=>x.length));return Array.from({length:width},(_,i)=>rows.map(x=>x[i]??'').join(v.separator)).join('\n')}
    case'join-lines-tool':return v.input.split(/\r?\n/).map(x=>x.trim()).filter(Boolean).join(v.separator);
    case'split-text-chunks':{const len=Math.max(1,Math.trunc(n(v,'length'))),a=Array.from(v.input);return Array.from({length:Math.ceil(a.length/len)},(_,i)=>a.slice(i*len,(i+1)*len).join('')).join('\n')}
    case'random-line-picker':{const a=v.input.split(/\r?\n/).filter(Boolean);if(!a.length)throw 0;return a[randomInt(a.length)]}
    case'numbered-list-to-bullets':return v.input.split(/\r?\n/).map(x=>`- ${x.replace(/^\s*\d+[.)]\s*/, '')}`).join('\n');
    case'bullets-to-numbered':return v.input.split(/\r?\n/).map((x,i)=>`${i+1}. ${x.replace(/^\s*[-*+]\s*/, '')}`).join('\n');
    case'quote-lines':{const q=v.quote||'"';return v.input.split(/\r?\n/).map(x=>`${q}${x}${q}`).join('\n')}
    case'unquote-lines':return v.input.split(/\r?\n/).map(x=>x.trim().replace(/^(["'“‘])(.*)(["'”’])$/,'$2')).join('\n');
    case'text-padding-tool':{const width=Math.max(1,Math.trunc(n(v,'width'))),ch=Array.from(v.character||' ')[0],pad=(s:string)=>{const need=Math.max(0,width-Array.from(s).length);return v.side==='left'?ch.repeat(need)+s:v.side==='both'?ch.repeat(Math.floor(need/2))+s+ch.repeat(Math.ceil(need/2)):s+ch.repeat(need)};return v.input.split(/\r?\n/).map(pad).join('\n')}
    case'plain-find-replace':{if(!v.find)throw 0;return v.input.split(v.find).join(v.replace)}
    case'substring-counter':{if(!v.query)throw 0;let count=0,index=0;while((index=v.input.indexOf(v.query,index))>=0){count++;index+=v.query.length}return `${tr(locale,'Occurrences','Apariciones')}: ${count}`}
    case'word-list-comparer':{const a=new Set(words(v.input)),b=new Set(words(v.second));return `${tr(locale,'Only in first','Solo en la primera')}: ${[...a].filter(x=>!b.has(x)).join(', ')}\n${tr(locale,'In both','En ambas')}: ${[...a].filter(x=>b.has(x)).join(', ')}\n${tr(locale,'Only in second','Solo en la segunda')}: ${[...b].filter(x=>!a.has(x)).join(', ')}`}
    case'common-words-finder':{const b=new Set(words(v.second));return [...new Set(words(v.input).filter(x=>b.has(x)))].join('\n')}
    case'unique-words-extractor':return [...new Set(words(v.input))].join('\n');
    case'anagram-checker':return [...clean(v.a)].sort().join('')===[...clean(v.b)].sort().join('')?tr(locale,'They are anagrams.','Son anagramas.'):tr(locale,'They are not anagrams.','No son anagramas.');
    case'isogram-checker':{const a=[...clean(v.input)];return new Set(a).size===a.length?tr(locale,'It is an isogram.','Es un isograma.'):tr(locale,'It is not an isogram.','No es un isograma.')}
    case'pangram-checker':{const set=new Set(clean(v.input));const missing=[...'abcdefghijklmnopqrstuvwxyz'].filter(x=>!set.has(x));return missing.length?`${tr(locale,'Missing letters','Letras ausentes')}: ${missing.join(' ')}`:tr(locale,'It contains every letter A–Z.','Contiene todas las letras A–Z.')}
    case'vowel-consonant-counter':{const a=clean(v.input),vowels=(a.match(/[aeiou]/g)??[]).length,letters=(a.match(/[a-z]/g)??[]).length;return `${tr(locale,'Vowels','Vocales')}: ${vowels}\n${tr(locale,'Consonants','Consonantes')}: ${letters-vowels}`}
    case'readability-score':{const a=words(v.input),sentences=Math.max(1,(v.input.match(/[.!?]+/g)??[]).length),syllables=a.reduce((s,w)=>s+Math.max(1,(w.match(/[aeiouyáéíóúü]+/gi)??[]).length),0),score=206.835-1.015*(a.length/sentences)-84.6*(syllables/Math.max(1,a.length));return `${tr(locale,'Estimated Flesch score','Puntuación Flesch estimada')}: ${f(score,locale,1)}\n${tr(locale,'Higher is easier to read.','Una puntuación mayor indica lectura más sencilla.')}`}

    case'ulid-generator':{const alphabet='0123456789ABCDEFGHJKMNPQRSTVWXYZ',encode=(x:bigint,len:number)=>{let out='';while(len--){out=alphabet[Number(x%32n)]+out;x/=32n}return out};return Array.from({length:safeCount(v)},()=>encode(BigInt(Date.now()),10)+randomChars(16,alphabet)).join('\n')}
    case'nanoid-generator':return Array.from({length:safeCount(v)},()=>randomChars(Math.min(128,Math.max(4,Math.trunc(n(v,'length')))))).join('\n');
    case'otp-generator':case'pin-generator':{const len=Math.min(12,Math.max(3,Math.trunc(n(v,'length'))));return Array.from({length:safeCount(v)},()=>randomChars(len,'0123456789')).join('\n')}
    case'random-hex-color-generator':return Array.from({length:safeCount(v)},()=>`#${randomChars(6,'0123456789ABCDEF')}`).join('\n');
    case'css-gradient-generator':return `background: linear-gradient(${n(v,'angle')}deg, ${v.start}, ${v.end});`;
    case'css-shadow-generator':return `box-shadow: ${n(v,'x')}px ${n(v,'y')}px ${Math.max(0,n(v,'blur'))}px ${n(v,'spread')}px ${v.color};`;
    case'border-radius-generator':return `border-radius: ${n(v,'topLeft')}px ${n(v,'topRight')}px ${n(v,'bottomRight')}px ${n(v,'bottomLeft')}px;`;
    case'css-grid-generator':return `.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, ${v.min}), 1fr));\n  gap: ${n(v,'gap')}px;\n}\n/* Preferred maximum: ${Math.trunc(n(v,'columns'))} columns */`;
    case'flexbox-generator':return `.flex {\n  display: flex;\n  flex-direction: ${v.direction};\n  justify-content: ${v.justify};\n  align-items: ${v.align};\n  gap: ${n(v,'gap')}px;\n}`;
    case'media-query-generator':return `@media (${v.type}: ${n(v,'width')}px) {\n  /* styles */\n}`;
    case'placeholder-avatar-svg':return `<svg xmlns="http://www.w3.org/2000/svg" width="${n(v,'size')}" height="${n(v,'size')}" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="${v.background}"/><circle cx="50" cy="38" r="18" fill="${v.foreground}"/><path d="M18 92c4-24 18-36 32-36s28 12 32 36" fill="${v.foreground}"/></svg>`;
    case'initials-avatar-svg':{const initials=v.initials.replace(/[<>&"']/g,'').slice(0,3).toUpperCase();return `<svg xmlns="http://www.w3.org/2000/svg" width="${n(v,'size')}" height="${n(v,'size')}" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="${v.background}"/><text x="50" y="54" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="system-ui,sans-serif" font-size="36" font-weight="700">${initials}</text></svg>`}
    case'svg-pattern-generator':return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240"><defs><pattern id="p" width="${n(v,'size')}" height="${n(v,'size')}" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="${v.color}"/></pattern></defs><rect width="100%" height="100%" fill="${v.background}"/><rect width="100%" height="100%" fill="url(#p)"/></svg>`;
    case'svg-blob-generator':{const count=Math.min(16,Math.max(4,Math.trunc(n(v,'points')))),pts=Array.from({length:count},(_,i)=>{const a=i/count*Math.PI*2,r=35+randomInt(16);return`${50+Math.cos(a)*r},${50+Math.sin(a)*r}`}).join(' ');return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="${pts}" fill="${v.color}"/></svg>`}
    case'svg-wave-generator':{const amp=Math.min(50,Math.max(1,n(v,'amplitude'))),freq=Math.min(10,Math.max(1,n(v,'frequency'))),pts=Array.from({length:101},(_,i)=>`${i},${50+Math.sin(i/100*Math.PI*2*freq)*amp}`).join(' ');return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polyline points="${pts}" fill="none" stroke="${v.color}" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>`}
    case'chart-data-generator':{const count=Math.min(100,safeCount(v,'points')),min=n(v,'min'),max=n(v,'max');if(max<min)throw 0;return JSON.stringify({labels:Array.from({length:count},(_,i)=>`Item ${i+1}`),data:Array.from({length:count},()=>Number((min+randomInt(10001)/10000*(max-min)).toFixed(2)))},null,2)}
    case'csv-test-data-generator':{const rows=Math.min(1000,safeCount(v,'rows',1000)),cols=Math.min(20,safeCount(v,'columns',20));return [Array.from({length:cols},(_,i)=>`column_${i+1}`).join(','),...Array.from({length:rows},(_,r)=>Array.from({length:cols},(_,c)=>`value_${r+1}_${c+1}`).join(','))].join('\n')}
    case'code-placeholder-generator':{const templates:Record<string,string[]>={javascript:['const items = [];','for (const item of items) {','  console.log(item);','}'],python:['items = []','for item in items:','    print(item)'],css:['.component {','  display: grid;','  gap: 1rem;','}'],html:['<section>','  <h2>Example</h2>','  <p>Content</p>','</section>']};const base=templates[v.language]??templates.javascript;return Array.from({length:Math.max(1,Math.trunc(n(v,'lines')))},(_,i)=>base[i%base.length]).join('\n')}
    case'git-branch-name-generator':return `${v.type}/${slug(v.description)}`;
    case'commit-message-helper':return `${v.type}${v.scope?`(${slug(v.scope)})`:''}: ${v.summary.trim().replace(/[.!]+$/,'').toLowerCase()}`;
    case'package-name-generator':{const name=slug(v.description);return v.style==='scope'?`@your-scope/${name}`:name}
    case'docker-compose-generator':return `services:\n  ${slug(v.service)}:\n    image: ${v.image}\n    ports:\n      - "${n(v,'hostPort')}:${n(v,'containerPort')}"\n    restart: unless-stopped`;
    case'nginx-redirect-generator':return `location = ${v.from} {\n  return ${v.status} ${v.to};\n}`;
    case'htaccess-redirect-generator':return `Redirect ${v.status==='301'?'permanent':'temp'} ${v.from} ${v.to}`;
    case'content-security-policy-builder':return `Content-Security-Policy: default-src ${v.defaultSrc}; script-src ${v.scriptSrc}; img-src ${v.imageSrc}; object-src 'none'; base-uri 'self'`;
    case'permissions-policy-builder':return `Permissions-Policy: ${v.disabled.split(',').map(x=>`${x.trim()}=()`).filter(x=>x!=='=()').join(', ')}`;
    case'cache-control-builder':return `Cache-Control: ${[v.visibility,v.visibility!=='no-store'?`max-age=${Math.max(0,n(v,'maxAge'))}`:'',v.revalidate!=='none'?v.revalidate:''].filter(Boolean).join(', ')}`;
    case'cors-header-builder':return `Access-Control-Allow-Origin: ${v.origin}\nAccess-Control-Allow-Methods: ${v.methods}\nAccess-Control-Allow-Headers: ${v.headers}\nVary: Origin`;
    case'cron-humanizer':{const known:Record<string,string>={'0 9 * * 1-5':tr(locale,'At 09:00, Monday through Friday','A las 09:00, de lunes a viernes'),'0 0 * * *':tr(locale,'Every day at midnight','Cada día a medianoche'),'*/5 * * * *':tr(locale,'Every 5 minutes','Cada 5 minutos'),'0 0 1 * *':tr(locale,'At midnight on the first day of every month','A medianoche el primer día de cada mes')};return known[v.input.trim()]??tr(locale,'Valid five-field cron; use the builder for custom schedules.','Cron de cinco campos; usa el constructor para horarios personalizados.')}
    case'unix-signal-reference':{const map:Record<string,string>={SIGHUP:'1 — terminal hangup / reload',SIGINT:'2 — interrupt from keyboard',SIGQUIT:'3 — quit and core dump',SIGKILL:'9 — immediate termination (cannot be caught)',SIGTERM:'15 — graceful termination request',SIGSTOP:'19 — stop process',SIGCONT:'18 — continue process'};const key=v.input.toUpperCase(),entry=map[key]??Object.entries(map).find(([,x])=>x.startsWith(`${key} `))?.[1];return entry?`${key}: ${entry}`:tr(locale,'Signal not found in the local reference.','Señal no encontrada en la referencia local.')}
    case'keyboard-keycode-reference':{const map:Record<string,string>={Enter:'key: Enter · code: Enter · legacy keyCode: 13',Escape:'key: Escape · code: Escape · legacy keyCode: 27',Space:'key: " " · code: Space · legacy keyCode: 32',Tab:'key: Tab · code: Tab · legacy keyCode: 9',ArrowUp:'key: ArrowUp · code: ArrowUp · legacy keyCode: 38'};return map[v.input]??`${v.input}: key value depends on keyboard layout; prefer KeyboardEvent.code for physical keys.`}
    case'css-easing-reference':{const map:Record<string,string>={ease:'cubic-bezier(0.25, 0.1, 0.25, 1)', 'ease-in':'cubic-bezier(0.42, 0, 1, 1)','ease-out':'cubic-bezier(0, 0, 0.58, 1)','ease-in-out':'cubic-bezier(0.42, 0, 0.58, 1)',linear:'cubic-bezier(0, 0, 1, 1)'};return `${v.input}\n${map[v.input]}`}
    case'html-doctype-generator':{const map:Record<string,string>={html5:'<!doctype html>','html4-strict':'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">','xhtml1-strict':'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'};return map[v.input]}
    case'regex-cheatsheet':{const map:Record<string,string>={characters:'. any character\n\\d digit\n\\w word character\n\\s whitespace\n[^x] not x',groups:'(...) capture group\n(?:...) non-capturing\n(?<name>...) named group\n\\1 backreference',quantifiers:'* zero or more\n+ one or more\n? zero or one\n{n} exactly n\n{n,m} between n and m',anchors:'^ start\n$ end\n\\b word boundary',lookaround:'(?=...) positive lookahead\n(?!...) negative lookahead\n(?<=...) positive lookbehind\n(?<!...) negative lookbehind'};return map[v.input]}
    case'http-header-reference':{const map:Record<string,string>={'cache-control':'Controls browser and intermediary caching.','content-type':'Declares the media type of the body.','authorization':'Carries credentials for authenticated requests.','accept':'Lists response media types accepted by the client.','etag':'Identifies a specific representation for cache validation.','vary':'Lists request headers that affect the cached response.','location':'Provides a redirect target or created resource URL.'};const key=v.input.toLowerCase();return map[key]?`${v.input}: ${map[key]}`:tr(locale,'Header not found in the compact local reference.','Cabecera no encontrada en la referencia local compacta.')}
    case'country-code-lookup':{const rows=[['Spain','ES','ESP','724'],['France','FR','FRA','250'],['Germany','DE','DEU','276'],['Italy','IT','ITA','380'],['Portugal','PT','PRT','620'],['United Kingdom','GB','GBR','826'],['United States','US','USA','840'],['Mexico','MX','MEX','484'],['Argentina','AR','ARG','032'],['Brazil','BR','BRA','076'],['Japan','JP','JPN','392'],['China','CN','CHN','156'],['India','IN','IND','356']];const q=v.input.toLowerCase(),row=rows.find(x=>x.some(y=>y.toLowerCase()===q));return row?`${row[0]} — ISO 3166-1 alpha-2: ${row[1]} · alpha-3: ${row[2]} · numeric: ${row[3]}`:tr(locale,'Country not found in the compact local reference.','País no encontrado en la referencia local compacta.')}
    case'language-code-lookup':{const rows=[['Spanish','es','spa'],['English','en','eng'],['French','fr','fra'],['German','de','deu'],['Italian','it','ita'],['Portuguese','pt','por'],['Japanese','ja','jpn'],['Chinese','zh','zho'],['Arabic','ar','ara'],['Hindi','hi','hin'],['Russian','ru','rus']];const q=v.input.toLowerCase(),row=rows.find(x=>x.some(y=>y.toLowerCase()===q));return row?`${row[0]} — ISO 639-1: ${row[1]} · ISO 639-2: ${row[2]}`:tr(locale,'Language not found in the compact local reference.','Idioma no encontrado en la referencia local compacta.')}
    case'timezone-list-filter':{const q=v.input.toLowerCase(),zones=Intl.supportedValuesOf('timeZone').filter(x=>x.toLowerCase().includes(q)).slice(0,50);return zones.length?zones.join('\n'):tr(locale,'No matching IANA timezones.','No hay zonas horarias IANA coincidentes.')}
    case'file-signature-reference':{const map:Record<string,string>={png:'89 50 4E 47 0D 0A 1A 0A',jpg:'FF D8 FF',jpeg:'FF D8 FF',gif:'47 49 46 38',pdf:'25 50 44 46',zip:'50 4B 03 04',webp:'52 49 46 46 … 57 45 42 50',gz:'1F 8B',exe:'4D 5A',elf:'7F 45 4C 46'};const key=v.input.toLowerCase().replace('.','');return map[key]?`.${key}: ${map[key]}`:tr(locale,'Signature not found in the local reference.','Firma no encontrada en la referencia local.')}
    default:throw new Error(`Unknown operation: ${operation}`);
  }
}
