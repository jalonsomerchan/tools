import type { Lang } from '../i18n/ui';
import type { ToolCategoryId } from './tools';

export type UtilityField = {
  id: string;
  type: 'textarea' | 'text' | 'number' | 'date' | 'datetime-local' | 'select';
  label: Record<Lang, string>;
  value?: string;
  placeholder?: Record<Lang, string>;
  min?: string;
  max?: string;
  step?: string;
  options?: { value: string; label: Record<Lang, string> }[];
};

export type ExtraUtility = {
  slug: string;
  category: ToolCategoryId;
  icon: string;
  operation: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  fields: UtilityField[];
  example: Record<string, string>;
};

const L = (en: string, es: string): Record<Lang, string> => ({ en, es });
const textarea = (en = 'Input', es = 'Entrada', value = '', placeholderEn = 'Paste or type your content…', placeholderEs = 'Pega o escribe el contenido…'): UtilityField => ({ id: 'input', type: 'textarea', label: L(en, es), value, placeholder: L(placeholderEn, placeholderEs) });
const text = (id: string, en: string, es: string, value = ''): UtilityField => ({ id, type: 'text', label: L(en, es), value });
const number = (id: string, en: string, es: string, value = '0', min?: string, step = 'any'): UtilityField => ({ id, type: 'number', label: L(en, es), value, min, step });
const date = (id: string, en: string, es: string, value = ''): UtilityField => ({ id, type: 'date', label: L(en, es), value });
const datetime = (id: string, en: string, es: string, value = ''): UtilityField => ({ id, type: 'datetime-local', label: L(en, es), value });
const select = (id: string, en: string, es: string, options: [string, string, string][]): UtilityField => ({ id, type: 'select', label: L(en, es), options: options.map(([value, enLabel, esLabel]) => ({ value, label: L(enLabel, esLabel) })) });
const U = (slug: string, category: ToolCategoryId, icon: string, en: string, es: string, fields: UtilityField[], example: Record<string, string>): ExtraUtility => ({
  slug, category, icon, operation: slug, title: L(en, es),
  description: L(`${en} locally in your browser, with a clear result you can copy.`, `${es} localmente en tu navegador, con un resultado claro que puedes copiar.`),
  fields, example
});

export const extraUtilities: ExtraUtility[] = [
  U('reverse-text','writing','↶','Reverse text','Invertir texto',[textarea()],{input:'Alon Tools'}),
  U('remove-line-breaks','writing','↵','Remove line breaks','Eliminar saltos de línea',[textarea()],{input:'First line\nSecond line\nThird line'}),
  U('whitespace-normalizer','writing','SP','Whitespace normalizer','Normalizador de espacios',[textarea()],{input:'  Too    many   spaces.  \n\n Next line. '}),
  U('word-frequency','writing','FREQ','Word frequency counter','Contador de frecuencia de palabras',[textarea()],{input:'tools make work easier and good tools save time'}),
  U('reading-time-calculator','writing','READ','Reading time calculator','Calculadora de tiempo de lectura',[textarea(),number('speed','Words per minute','Palabras por minuto','220','1')],{input:'Paste a longer article here to estimate its reading time.',speed:'220'}),
  U('text-to-binary','development','01','Text to binary','Texto a binario',[textarea()],{input:'Hello'}),
  U('binary-to-text','development','ABC','Binary to text','Binario a texto',[textarea()],{input:'01001000 01100101 01101100 01101100 01101111'}),
  U('text-to-morse','writing','·—','Text to Morse code','Texto a código Morse',[textarea()],{input:'SOS tools'}),
  U('morse-to-text','writing','A','Morse code to text','Código Morse a texto',[textarea()],{input:'... --- ... / - --- --- .-.. ...'}),
  U('nato-phonetic-converter','writing','NATO','NATO phonetic alphabet converter','Conversor al alfabeto fonético OTAN',[textarea()],{input:'ALON'}),
  U('duplicate-line-finder','writing','DUP','Duplicate line finder','Buscador de líneas duplicadas',[textarea()],{input:'apple\npear\napple\norange\npear'}),
  U('line-number-adder','writing','1.','Add line numbers','Añadir números de línea',[textarea(),number('start','Start at','Empezar en','1')],{input:'First\nSecond\nThird',start:'1'}),
  U('line-number-remover','writing','№','Remove line numbers','Eliminar números de línea',[textarea()],{input:'1. First\n2. Second\n3. Third'}),
  U('prefix-suffix-adder','writing','±','Add prefix and suffix','Añadir prefijo y sufijo',[textarea(),text('prefix','Prefix','Prefijo','- '),text('suffix','Suffix','Sufijo','')],{input:'apple\npear\norange',prefix:'- ',suffix:''}),
  U('text-repeater','writing','×N','Text repeater','Repetidor de texto',[textarea(),number('count','Repetitions','Repeticiones','3','1'),text('separator','Separator','Separador','\n')],{input:'Hello',count:'3',separator:'\n'}),
  U('word-shuffler','writing','MIX','Word shuffler','Mezclador de palabras',[textarea()],{input:'one two three four five six'}),
  U('sentence-sorter','writing','A–Z','Sentence sorter','Ordenador de frases',[textarea()],{input:'Zebras are striped. Apples are fruit. Tools save time.'}),
  U('extract-emails','writing','@','Email extractor','Extractor de correos',[textarea()],{input:'Contact ana@example.com or support@alon.one for help.'}),
  U('extract-urls','writing','URL','URL extractor','Extractor de URL',[textarea()],{input:'Visit https://tools.alon.one and https://example.org/docs today.'}),
  U('extract-numbers','writing','123','Number extractor','Extractor de números',[textarea()],{input:'Invoice 2048 costs 19.95 EUR and has 3 items.'}),
  U('remove-accents','writing','Á→A','Remove accents','Eliminar acentos',[textarea()],{input:'Árbol, pingüino, café, corazón'}),
  U('invisible-character-detector','writing','¶','Invisible character detector','Detector de caracteres invisibles',[textarea()],{input:'Tab\there, spaces  here and\nnew line'}),
  U('text-statistics','writing','STAT','Text statistics','Estadísticas de texto',[textarea()],{input:'A short text. It has two sentences and several words!'}),
  U('alphabetical-word-sorter','writing','ABC','Alphabetical word sorter','Ordenador alfabético de palabras',[textarea()],{input:'pear apple orange banana grape'}),
  U('palindrome-checker','writing','↔','Palindrome checker','Comprobador de palíndromos',[textarea()],{input:'Anita lava la tina'}),

  U('json-to-csv','development','J→C','JSON to CSV','JSON a CSV',[textarea('JSON','JSON','[{"name":"Ana","age":32},{"name":"Leo","age":28}]')],{input:'[{"name":"Ana","age":32},{"name":"Leo","age":28}]'}),
  U('json-path-extractor','development','$.','JSON path extractor','Extractor de rutas JSON',[textarea('JSON','JSON'),text('path','Path (dot notation)','Ruta (notación con puntos)','user.name')],{input:'{"user":{"name":"Ana","roles":["admin","editor"]}}',path:'user.roles.0'}),
  U('query-string-parser','development','?=','Query string parser','Analizador de query strings',[textarea('Query string or URL','Query string o URL')],{input:'https://example.com/search?q=tools&page=2&tag=web&tag=dev'}),
  U('query-string-builder','development','&','Query string builder','Constructor de query strings',[textarea('Key-value pairs (one per line)','Pares clave-valor (uno por línea)')],{input:'q=offline tools\npage=2\nlang=es'}),
  U('unicode-escape-converter','development','\\u','Unicode escape converter','Conversor de escapes Unicode',[textarea(),select('direction','Direction','Dirección',[['encode','Text to escapes','Texto a escapes'],['decode','Escapes to text','Escapes a texto']])],{input:'Hola 👋',direction:'encode'}),
  U('ascii-table','development','ASCII','ASCII table lookup','Consulta de tabla ASCII',[text('input','Character or code','Carácter o código','A')],{input:'A'}),
  U('hex-to-text','development','HEX','Hex to text','Hexadecimal a texto',[textarea()],{input:'48 65 6c 6c 6f'}),
  U('text-to-hex','development','0x','Text to hex','Texto a hexadecimal',[textarea()],{input:'Hello'}),
  U('http-status-lookup','development','HTTP','HTTP status lookup','Consulta de estados HTTP',[number('input','HTTP status code','Código de estado HTTP','404','100','1')],{input:'404'}),
  U('mime-type-lookup','development','MIME','MIME type lookup','Consulta de tipos MIME',[text('input','Extension or MIME type','Extensión o tipo MIME','.json')],{input:'.json'}),
  U('port-number-lookup','development','PORT','Port number lookup','Consulta de puertos',[number('input','Port','Puerto','443','0','1')],{input:'443'}),
  U('user-agent-parser','development','UA','User-agent parser','Analizador de user-agent',[textarea()],{input:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36'}),
  U('gitignore-generator','development','GIT','Gitignore generator','Generador de .gitignore',[select('stack','Project type','Tipo de proyecto',[['node','Node / Astro / React','Node / Astro / React'],['python','Python','Python'],['rust','Rust','Rust'],['go','Go','Go'],['mac','macOS generic','macOS genérico']])],{stack:'node'}),
  U('docker-run-builder','development','DOCK','Docker run builder','Constructor de docker run',[text('image','Image','Imagen','nginx:alpine'),text('name','Container name','Nombre del contenedor','web'),number('hostPort','Host port','Puerto local','8080','1','1'),number('containerPort','Container port','Puerto del contenedor','80','1','1')],{image:'nginx:alpine',name:'web',hostPort:'8080',containerPort:'80'}),
  U('ssh-command-builder','development','SSH','SSH command builder','Constructor de comandos SSH',[text('host','Host','Servidor','example.com'),text('user','User','Usuario','deploy'),number('port','Port','Puerto','22','1','1'),text('key','Private key path','Ruta de clave privada','~/.ssh/id_ed25519')],{host:'example.com',user:'deploy',port:'22',key:'~/.ssh/id_ed25519'}),
  U('regex-escape','development','\\.*','Regex escape tool','Escapar texto para regex',[textarea()],{input:'price is $19.99 (today)'}),
  U('regex-flags-explainer','development','/gi','Regex flags explainer','Explicador de flags regex',[text('input','Flags','Flags','gim')],{input:'gimsuy'}),
  U('json-sorter','development','JSON','JSON key sorter','Ordenador de claves JSON',[textarea('JSON','JSON')],{input:'{"z":1,"a":{"d":4,"b":2},"m":3}'}),
  U('json-flattener','development','FLAT','JSON flattener','Aplanador de JSON',[textarea('JSON','JSON')],{input:'{"user":{"name":"Ana","address":{"city":"Madrid"}},"active":true}'}),
  U('json-unflattener','development','NEST','JSON unflattener','Desaplanador de JSON',[textarea('Flat JSON','JSON plano')],{input:'{"user.name":"Ana","user.address.city":"Madrid","active":true}'}),
  U('json-schema-generator','development','SCHEMA','JSON Schema generator','Generador de JSON Schema',[textarea('JSON example','Ejemplo JSON')],{input:'{"name":"Ana","age":32,"active":true,"tags":["dev"]}'}),
  U('xml-escape','development','XML','XML escape and unescape','Escapar y desescapar XML',[textarea(),select('direction','Direction','Dirección',[['encode','Escape XML','Escapar XML'],['decode','Unescape XML','Desescapar XML']])],{input:'<note title="Tools & tips">Hello</note>',direction:'encode'}),
  U('sql-in-list-builder','development','IN()','SQL IN list builder','Constructor de listas SQL IN',[textarea('Values (one per line)','Valores (uno por línea)')],{input:'Madrid\nBarcelona\nValencia'}),
  U('environment-variable-parser','development','ENV','Environment variable parser','Analizador de variables de entorno',[textarea('.env content','Contenido .env')],{input:'API_URL=https://example.com\nDEBUG=true\nPORT=3000'}),
  U('ini-parser','development','INI','INI to JSON converter','Conversor INI a JSON',[textarea('INI content','Contenido INI')],{input:'[server]\nhost=localhost\nport=8080\n\n[app]\ndebug=true'}),
  U('semver-compare','development','1.2.3','Semantic version comparator','Comparador de versiones semánticas',[text('a','Version A','Versión A','1.4.2'),text('b','Version B','Versión B','2.0.0-beta.1')],{a:'1.4.2',b:'2.0.0-beta.1'}),
  U('semver-bump','development','↑VER','Semantic version bumper','Incrementador de versión semántica',[text('input','Version','Versión','1.4.2'),select('level','Bump','Incremento',[['major','Major','Major'],['minor','Minor','Minor'],['patch','Patch','Patch']])],{input:'1.4.2',level:'minor'}),
  U('color-contrast-checker','development','Aa','Color contrast checker','Comprobador de contraste',[text('foreground','Text color','Color de texto','#111827'),text('background','Background color','Color de fondo','#ffffff')],{foreground:'#111827',background:'#ffffff'}),
  U('css-clamp-calculator','development','CLAMP','CSS clamp calculator','Calculadora CSS clamp',[number('min','Minimum size (px)','Tamaño mínimo (px)','16'),number('max','Maximum size (px)','Tamaño máximo (px)','40'),number('minViewport','Minimum viewport (px)','Viewport mínimo (px)','320'),number('maxViewport','Maximum viewport (px)','Viewport máximo (px)','1280')],{min:'16',max:'40',minViewport:'320',maxViewport:'1280'}),
  U('data-uri-generator','development','DATA','Text data URI generator','Generador de URI de datos de texto',[textarea(),select('mime','MIME type','Tipo MIME',[['text/plain','Plain text','Texto plano'],['text/html','HTML','HTML'],['image/svg+xml','SVG','SVG'],['application/json','JSON','JSON']])],{input:'Hello from a local data URI',mime:'text/plain'}),
  U('checksum-compare','development','==','Checksum comparator','Comparador de checksums',[text('a','Checksum A','Checksum A'),text('b','Checksum B','Checksum B')],{a:'d41d8cd98f00b204e9800998ecf8427e',b:'D41D8CD98F00B204E9800998ECF8427E'}),
  U('random-data-generator','development','RAND','Random test data generator','Generador de datos de prueba',[number('count','Records','Registros','5','1','1'),select('format','Format','Formato',[['json','JSON','JSON'],['csv','CSV','CSV']])],{count:'5',format:'json'}),
  U('fake-user-generator','development','USER','Fake user generator','Generador de usuarios ficticios',[number('count','Users','Usuarios','3','1','1')],{count:'3'}),
  U('api-response-mocker','development','API','API response mocker','Simulador de respuestas API',[select('resource','Resource','Recurso',[['users','Users','Usuarios'],['products','Products','Productos'],['posts','Posts','Publicaciones']]),number('count','Items','Elementos','3','1','1')],{resource:'users',count:'3'}),
  U('graphql-query-minifier','development','GQL','GraphQL query minifier','Minificador de consultas GraphQL',[textarea('GraphQL query','Consulta GraphQL')],{input:'query User($id: ID!) {\n  user(id: $id) {\n    id\n    name\n    email\n  }\n}'}),

  U('tip-calculator','finance','TIP','Tip calculator','Calculadora de propinas',[number('amount','Bill amount','Importe de la cuenta','42.50','0'),number('percent','Tip percentage','Porcentaje de propina','10','0')],{amount:'42.50',percent:'10'}),
  U('split-bill-calculator','finance','SPLIT','Split bill calculator','Calculadora para dividir la cuenta',[number('amount','Bill amount','Importe','120','0'),number('tip','Tip percentage','Propina (%)','10','0'),number('people','People','Personas','4','1','1')],{amount:'120',tip:'10',people:'4'}),
  U('loan-payment-calculator','finance','LOAN','Loan payment calculator','Calculadora de cuotas de préstamo',[number('principal','Loan amount','Importe del préstamo','200000','0'),number('rate','Annual interest (%)','Interés anual (%)','3.5','0'),number('years','Years','Años','25','1')],{principal:'200000',rate:'3.5',years:'25'}),
  U('compound-interest-calculator','finance','A%','Compound interest calculator','Calculadora de interés compuesto',[number('principal','Initial amount','Capital inicial','10000','0'),number('rate','Annual rate (%)','Tasa anual (%)','5'),number('years','Years','Años','10','0'),number('frequency','Compounds per year','Capitalizaciones al año','12','1','1')],{principal:'10000',rate:'5',years:'10',frequency:'12'}),
  U('simple-interest-calculator','finance','I%','Simple interest calculator','Calculadora de interés simple',[number('principal','Principal','Capital','5000','0'),number('rate','Annual rate (%)','Tasa anual (%)','4'),number('years','Years','Años','3','0')],{principal:'5000',rate:'4',years:'3'}),
  U('savings-goal-calculator','finance','GOAL','Savings goal calculator','Calculadora de objetivo de ahorro',[number('goal','Savings goal','Objetivo de ahorro','20000','0'),number('current','Current savings','Ahorro actual','5000','0'),number('months','Months','Meses','24','1','1')],{goal:'20000',current:'5000',months:'24'}),
  U('roi-calculator','finance','ROI','ROI calculator','Calculadora de ROI',[number('cost','Investment cost','Coste de inversión','5000'),number('return','Final value','Valor final','6500')],{cost:'5000',return:'6500'}),
  U('profit-margin-calculator','finance','MARGIN','Profit margin calculator','Calculadora de margen de beneficio',[number('cost','Cost','Coste','40'),number('price','Sale price','Precio de venta','65')],{cost:'40',price:'65'}),
  U('markup-calculator','finance','MARK','Markup calculator','Calculadora de markup',[number('cost','Cost','Coste','40'),number('price','Sale price','Precio de venta','65')],{cost:'40',price:'65'}),
  U('break-even-calculator','finance','B/E','Break-even calculator','Calculadora de punto de equilibrio',[number('fixed','Fixed costs','Costes fijos','10000','0'),number('price','Price per unit','Precio por unidad','50'),number('variable','Variable cost per unit','Coste variable por unidad','30')],{fixed:'10000',price:'50',variable:'30'}),
  U('salary-hourly-converter','finance','€/H','Salary to hourly rate','Salario a tarifa por hora',[number('salary','Annual salary','Salario anual','30000','0'),number('hours','Hours per week','Horas por semana','40','1'),number('weeks','Working weeks','Semanas trabajadas','52','1')],{salary:'30000',hours:'40',weeks:'52'}),
  U('freelance-rate-calculator','finance','RATE','Freelance rate calculator','Calculadora de tarifa freelance',[number('target','Target annual income','Ingresos anuales objetivo','40000','0'),number('costs','Annual business costs','Costes anuales','6000','0'),number('hours','Billable hours per year','Horas facturables al año','1200','1')],{target:'40000',costs:'6000',hours:'1200'}),
  U('fuel-cost-calculator','finance','FUEL','Fuel cost calculator','Calculadora de coste de combustible',[number('distance','Distance (km)','Distancia (km)','500','0'),number('consumption','Consumption (L/100 km)','Consumo (L/100 km)','6.5','0'),number('price','Fuel price per litre','Precio por litro','1.65','0')],{distance:'500',consumption:'6.5',price:'1.65'}),
  U('electricity-cost-calculator','finance','kWh','Electricity cost calculator','Calculadora de coste eléctrico',[number('watts','Power (W)','Potencia (W)','1000','0'),number('hours','Hours used','Horas de uso','3','0'),number('price','Price per kWh','Precio por kWh','0.18','0')],{watts:'1000',hours:'3',price:'0.18'}),
  U('pace-calculator','finance','PACE','Running pace calculator','Calculadora de ritmo de carrera',[number('distance','Distance (km)','Distancia (km)','10','0'),number('hours','Hours','Horas','0','0','1'),number('minutes','Minutes','Minutos','50','0','1'),number('seconds','Seconds','Segundos','0','0','1')],{distance:'10',hours:'0',minutes:'50',seconds:'0'}),
  U('bmi-calculator','finance','BMI','BMI calculator','Calculadora de IMC',[number('weight','Weight (kg)','Peso (kg)','70','1'),number('height','Height (cm)','Altura (cm)','175','1')],{weight:'70',height:'175'}),
  U('calorie-needs-calculator','finance','KCAL','Daily calorie needs estimator','Estimador de calorías diarias',[number('weight','Weight (kg)','Peso (kg)','70','1'),number('height','Height (cm)','Altura (cm)','175','1'),number('age','Age','Edad','35','1'),select('sex','Sex','Sexo',[['male','Male','Hombre'],['female','Female','Mujer']]),select('activity','Activity','Actividad',[['1.2','Sedentary','Sedentaria'],['1.375','Light','Ligera'],['1.55','Moderate','Moderada'],['1.725','High','Alta']])],{weight:'70',height:'175',age:'35',sex:'male',activity:'1.55'}),
  U('body-fat-estimator','finance','FAT','Body fat estimator','Estimador de grasa corporal',[number('bmi','BMI','IMC','22.9','1'),number('age','Age','Edad','35','1'),select('sex','Sex','Sexo',[['male','Male','Hombre'],['female','Female','Mujer']])],{bmi:'22.9',age:'35',sex:'male'}),
  U('rule-of-three-calculator','finance','3','Rule of three calculator','Calculadora de regla de tres',[number('a','A','A','2'),number('b','B','B','8'),number('c','C','C','5')],{a:'2',b:'8',c:'5'}),
  U('fraction-simplifier','finance','½','Fraction simplifier','Simplificador de fracciones',[number('numerator','Numerator','Numerador','42'),number('denominator','Denominator','Denominador','56')],{numerator:'42',denominator:'56'}),
  U('fraction-to-decimal','finance','F→D','Fraction to decimal','Fracción a decimal',[number('numerator','Numerator','Numerador','1'),number('denominator','Denominator','Denominador','8')],{numerator:'1',denominator:'8'}),
  U('decimal-to-fraction','finance','D→F','Decimal to fraction','Decimal a fracción',[number('input','Decimal','Decimal','0.125')],{input:'0.125'}),
  U('scientific-notation-converter','finance','×10ⁿ','Scientific notation converter','Conversor de notación científica',[text('input','Number','Número','0.00000125')],{input:'0.00000125'}),
  U('average-calculator','finance','AVG','Average calculator','Calculadora de media',[textarea('Numbers','Números')],{input:'12, 18, 21, 25, 29'}),
  U('median-calculator','finance','MED','Median calculator','Calculadora de mediana',[textarea('Numbers','Números')],{input:'12, 7, 22, 3, 16, 9'}),

  U('age-calculator','finance','AGE','Age calculator','Calculadora de edad',[date('birth','Birth date','Fecha de nacimiento','1990-01-15'),date('target','At date','En la fecha','')],{birth:'1990-01-15'}),
  U('date-difference','finance','ΔD','Date difference calculator','Calculadora de diferencia entre fechas',[date('start','Start date','Fecha inicial','2026-01-01'),date('end','End date','Fecha final','2026-12-31')],{start:'2026-01-01',end:'2026-12-31'}),
  U('business-days-calculator','finance','WORK','Business days calculator','Calculadora de días laborables',[date('start','Start date','Fecha inicial','2026-07-01'),date('end','End date','Fecha final','2026-07-31')],{start:'2026-07-01',end:'2026-07-31'}),
  U('date-add-subtract','finance','D±','Add or subtract days','Sumar o restar días',[date('start','Start date','Fecha inicial','2026-07-16'),number('days','Days (negative to subtract)','Días (negativo para restar)','30','-100000','1')],{start:'2026-07-16',days:'30'}),
  U('week-number-calculator','finance','W#','ISO week number calculator','Calculadora de semana ISO',[date('input','Date','Fecha','2026-07-16')],{input:'2026-07-16'}),
  U('day-of-year-calculator','finance','D#','Day of year calculator','Calculadora de día del año',[date('input','Date','Fecha','2026-07-16')],{input:'2026-07-16'}),
  U('leap-year-checker','finance','366','Leap year checker','Comprobador de año bisiesto',[number('input','Year','Año','2028','1','1')],{input:'2028'}),
  U('timezone-offset-converter','finance','UTC','UTC offset time converter','Conversor de hora por offset UTC',[datetime('input','Date and time','Fecha y hora','2026-07-16T12:00'),number('from','Source UTC offset','Offset UTC de origen','2','-12'),number('to','Target UTC offset','Offset UTC de destino','-4','-12')],{input:'2026-07-16T12:00',from:'2',to:'-4'}),
  U('countdown-calculator','finance','T−','Countdown calculator','Calculadora de cuenta atrás',[datetime('input','Target date and time','Fecha y hora objetivo','2027-01-01T00:00')],{input:'2027-01-01T00:00'}),
  U('hours-minutes-calculator','finance','H:M','Hours and minutes calculator','Calculadora de horas y minutos',[number('hoursA','Hours A','Horas A','2'),number('minutesA','Minutes A','Minutos A','45'),number('hoursB','Hours B','Horas B','1'),number('minutesB','Minutes B','Minutos B','35'),select('operation','Operation','Operación',[['add','Add','Sumar'],['subtract','Subtract','Restar']])],{hoursA:'2',minutesA:'45',hoursB:'1',minutesB:'35',operation:'add'}),
  U('cooking-unit-converter','finance','CUP','Cooking unit converter','Conversor de unidades de cocina',[number('input','Amount','Cantidad','1'),select('from','From','Desde',[['ml','Millilitres','Mililitros'],['l','Litres','Litros'],['tsp','Teaspoons','Cucharaditas'],['tbsp','Tablespoons','Cucharadas'],['cup','Cups','Tazas'],['floz','Fluid ounces','Onzas líquidas']]),select('to','To','Hasta',[['ml','Millilitres','Mililitros'],['l','Litres','Litros'],['tsp','Teaspoons','Cucharaditas'],['tbsp','Tablespoons','Cucharadas'],['cup','Cups','Tazas'],['floz','Fluid ounces','Onzas líquidas']])],{input:'1',from:'cup',to:'ml'}),
  U('angle-converter','finance','°','Angle converter','Conversor de ángulos',[number('input','Value','Valor','180'),select('from','From','Desde',[['deg','Degrees','Grados'],['rad','Radians','Radianes'],['grad','Gradians','Gradianes'],['turn','Turns','Vueltas']]),select('to','To','Hasta',[['deg','Degrees','Grados'],['rad','Radians','Radianes'],['grad','Gradians','Gradianes'],['turn','Turns','Vueltas']])],{input:'180',from:'deg',to:'rad'}),
  U('speed-converter','finance','KM/H','Speed converter','Conversor de velocidad',[number('input','Value','Valor','100'),select('from','From','Desde',[['kmh','km/h','km/h'],['ms','m/s','m/s'],['mph','mph','mph'],['knot','knots','nudos']]),select('to','To','Hasta',[['kmh','km/h','km/h'],['ms','m/s','m/s'],['mph','mph','mph'],['knot','knots','nudos']])],{input:'100',from:'kmh',to:'mph'}),
  U('pressure-converter','finance','Pa','Pressure converter','Conversor de presión',[number('input','Value','Valor','1'),select('from','From','Desde',[['pa','Pascal','Pascal'],['kpa','Kilopascal','Kilopascal'],['bar','Bar','Bar'],['psi','PSI','PSI'],['atm','Atmosphere','Atmósfera']]),select('to','To','Hasta',[['pa','Pascal','Pascal'],['kpa','Kilopascal','Kilopascal'],['bar','Bar','Bar'],['psi','PSI','PSI'],['atm','Atmosphere','Atmósfera']])],{input:'1',from:'bar',to:'psi'}),
  U('energy-converter','finance','J','Energy converter','Conversor de energía',[number('input','Value','Valor','1'),select('from','From','Desde',[['j','Joules','Julios'],['kj','Kilojoules','Kilojulios'],['cal','Calories','Calorías'],['kcal','Kilocalories','Kilocalorías'],['wh','Watt-hours','Vatios-hora'],['kwh','Kilowatt-hours','Kilovatios-hora']]),select('to','To','Hasta',[['j','Joules','Julios'],['kj','Kilojoules','Kilojulios'],['cal','Calories','Calorías'],['kcal','Kilocalories','Kilocalorías'],['wh','Watt-hours','Vatios-hora'],['kwh','Kilowatt-hours','Kilovatios-hora']])],{input:'1',from:'kwh',to:'kj'})
];

export const extraUtilitySlugs = extraUtilities.map((utility) => utility.slug);
export const getExtraUtility = (slug: string) => extraUtilities.find((utility) => utility.slug === slug);
