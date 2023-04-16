import { useCatFact } from '../hooks/useCatFact';
import { useCatImage } from '../hooks/useCatImage';
import { getCatFact } from '../services/getCatFact';
import '../styles/Main.css';

function Main() {
  const { fact, refreshRandomFact, factError } = useCatFact();
  const { catImage, loading, imageError } = useCatImage(fact);

  const handleClick = refreshRandomFact

  return (
    <main className='centeredContent'>
      <h1>Cat facts</h1>
      <button onClick={handleClick}>Get a new fact</button>
      {loading && !(factError || imageError) && <p>Loading...</p>}
      {(factError || imageError) && <p>Error:{factError || imageError}</p>}
      {!loading && !(factError || imageError) && fact && (
        <div className='centeredContent'>
          <p>{fact}</p>
          <img
            src={catImage}
            alt='cat pic using the first word of the fact'
          />
        </div>
      )}
    </main>
  );
}

export default Main;
