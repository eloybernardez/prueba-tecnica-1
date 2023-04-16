import { useEffect, useState } from 'react';
import { getCatFact } from '../services/getCatFact';

export const useCatFact = () => {
  const [fact, setFact] = useState('');
  const [factError, setFactError] = useState('');

  const refreshRandomFact = () => {
    getCatFact()
      .then((newFact) => {
        if (!newFact) throw new Error('No cat fact found');
        setFact(newFact)
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setFactError(error?.message);
        } else {
          setFactError('Something went wrong');
        }
      })
  }
  useEffect(refreshRandomFact, [])

  return { fact, refreshRandomFact, factError };
};
