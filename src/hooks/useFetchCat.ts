import { useState, useEffect } from 'react';

export interface Cat {
  fact: string;
  length: number;
  img?: string;
}

export interface CatImage {
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  validated: boolean;
  owner: string;
  file: string;
  mimetype: string;
  size: number;
  url: string;
}

const CAT_IMAGE_API = (firstWord: string) => `https://cataas.com/cat/says/${firstWord}?json=true`
const CAT_PREFIX_URL = 'https://cataas.com'
const CAT_FACT_API: string = 'https://catfact.ninja/fact'

export const useFetchCat = (): [Cat, boolean, boolean] => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Cat>({ fact: '', length: 0, img: '' });

  useEffect(() => {
    // Fetch function
    async function getData<t>(url: string): Promise<t> {
      const response = await fetch(url);
      const data: t = await response.json();

      return data;
    }

    // Get cat image data
    async function getImageData(firstWord: string) {
      const catImageData: CatImage = await getData(CAT_IMAGE_API(firstWord));
      const catImageUrl = `${CAT_PREFIX_URL}${catImageData.url}`;

      return catImageUrl;
    }
    // Get cat fact data
    async function getCatData() {
      const catData: Cat = await getData(CAT_FACT_API);

      const { fact } = catData
      const firstWordOfFact = fact.split(' ')[0].toLowerCase()


      const catImageUrl = await getImageData(firstWordOfFact);

      return { ...catData, img: catImageUrl }
    }

    // Get final data
    getCatData()
      .then((data: Cat) => {
        if (data.length > 0) {
          setData(data);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return [data, loading, error];
};
