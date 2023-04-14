import { useState, useEffect } from 'react';

export interface Cat {
  fact: string;
  length: number;
  img?: string;
}

export const useFetchCat = (url: string): [Cat, boolean, boolean] => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Cat>({ fact: '', length: 0, img: '' });

  useEffect(() => {
    async function getData(url: string) {
      const response = await fetch(url);
      const data: Cat = await response.json();
      const wordEndIndex = data.fact.indexOf(' ') + 1;

      const catData: Cat = {
        ...data,
        img: `https://cataas.com/cat/says/${data.fact
          .toLowerCase()
          .slice(0, wordEndIndex)}`,
      };

      return catData;
    }

    getData(url)
      .then((data: Cat) => {
        if (data.length > 0) {
          setData(data);
        } else {
          setError(true);
        }
      })
      .catch((error: boolean) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return [data, loading, error];
};
