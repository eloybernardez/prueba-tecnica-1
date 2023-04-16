import { useEffect, useState } from 'react';
import { CatImage } from '../types/catImage';

const CAT_IMAGE_API = (firstWord: string) =>
  `https://cataas.com/cat/says/${firstWord}?json=true`;
const CAT_PREFIX_URL = 'https://cataas.com';

export const useCatImage = (fact: string) => {
  const [catImage, setCatImage] = useState('')
  const [imageError, setImageError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get cat image data
    if (!fact) return;
    const firstWord = fact.split(' ')[0].toLowerCase();

    async function getImageData(firstWord: string) {
      try {
        if (!loading) setLoading(true);
        const catImageResponse = await fetch(CAT_IMAGE_API(firstWord));
        const catImageData: CatImage = await catImageResponse.json();

        if (!catImageData?.url) throw new Error('No cat image found');

        const catImageUrl = `${CAT_PREFIX_URL}${catImageData.url}`;

        setCatImage(catImageUrl);
      } catch (error) {
        if (error instanceof Error) {
          setImageError(error?.message);
        } else {
          setImageError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    }

    getImageData(firstWord);
  }, [fact])

  return { catImage, imageError, loading }
}