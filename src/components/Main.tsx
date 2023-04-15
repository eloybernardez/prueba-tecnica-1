import { useFetchFact } from '../hooks/useFetchFact';
import { useFetchCatImage } from '../hooks/useFetchCatImage';
import '../styles/Main.css';

function Main() {
  const { fact, factError } = useFetchFact();
  const { catImage,loading, imageError } = useFetchCatImage(fact);

  
  return (
    <main className='centeredContent'>
      <h1>Cat facts</h1>
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
