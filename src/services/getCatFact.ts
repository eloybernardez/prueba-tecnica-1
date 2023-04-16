import { Cat } from '../types/cat';

// this will be used in a handler function attached to a button on Main component
const CAT_FACT_API: string = 'https://catfact.ninja/fact';

export async function getCatFact() {
  const catResponse = await fetch(CAT_FACT_API);
  const catData: Cat = await catResponse.json();

  const { fact } = catData;

  return fact;
}
