import { useEffect, useState } from 'react';
import { Cat } from '../types/cat';

const CAT_FACT_API: string = 'https://catfact.ninja/fact';

export const useFetchFact = () => {
  const [fact, setFact] = useState('')
  const [factError, setFactError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCatFact() {
      try {
        const catResponse = await fetch(CAT_FACT_API);
        const catData: Cat = await catResponse.json();

        if (catData.length === 0) throw new Error('No cat fact found');

        const catFact = catData.fact;
        setFact(catFact);

      } catch (error: unknown) {
        if (error instanceof Error) {
          setFactError(error?.message);
        } else {
          setFactError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    }

    getCatFact();
  }, []);

  return { fact, factError, loading }
}