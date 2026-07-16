import { extraUtilities } from '../src/data/extra-utilities';
import { executeExtraUtility } from '../src/lib/extra-utility-operations';

if (extraUtilities.length !== 100) throw new Error(`Expected 100 utilities, found ${extraUtilities.length}`);
if (new Set(extraUtilities.map((utility) => utility.slug)).size !== 100) throw new Error('Utility slugs must be unique');

for (const utility of extraUtilities) {
  const values = Object.fromEntries(utility.fields.map((field) => [field.id, field.value ?? field.options?.[0]?.value ?? '']));
  Object.assign(values, utility.example);
  const output = executeExtraUtility(utility.operation, values, 'en');
  if (typeof output !== 'string' || !output.trim()) throw new Error(`${utility.slug} returned an empty result`);
}

console.log(`Validated ${extraUtilities.length} local utilities and their example inputs.`);
