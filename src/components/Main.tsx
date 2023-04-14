import { memo } from 'react';
import { useFetchCat } from '../hooks/useFetchCat';

function Main() {
  const [data, loading, error] = useFetchCat('https://catfact.ninja/fact');

  return (
    <main>
      <h1>Cat facts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data.length > 0 && (
        <div>
          <p>{data.fact}</p>
          <img
            src={data.img}
            alt='cat pic'
          />
        </div>
      )}
    </main>
  );
}

export default memo(Main);
