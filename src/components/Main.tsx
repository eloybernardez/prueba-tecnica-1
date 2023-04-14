import { memo } from 'react';
import { useFetchCat } from '../hooks/useFetchCat';
import '../styles/Main.css';

function Main() {
  const [data, loading, error] = useFetchCat();

  return (
    <main className='centeredContent'>
      <h1>Cat facts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {data.length > 0 && (
        <div className='centeredContent'>
          <p>{data.fact}</p>
          <img
            src={data.img}
            alt='cat pic using the first word of the fact'
          />
        </div>
      )}
    </main>
  );
}

export default memo(Main);
