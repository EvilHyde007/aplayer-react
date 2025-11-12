import { Link } from 'react-router-dom';
import { Playlists } from './Playlists';

function Home() {
  const isMobile = window.innerWidth < 768;

const styles = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    backgroundColor: '#282828',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'white',
    transition: 'transform 0.2s ease',
    width: isMobile ? 'calc(50% - 20px)' : '150px', // ✅ 2 por fila en mobile
    boxSizing: 'border-box',
  },
  img: {
    width: '100%',
    borderRadius: '4px',
    marginBottom: '10px',
  },
};


  return (
    <div>
      <div style={{display: "flex", justifyContent: "center"}}>
      <h1>🎧 Mis Playlists</h1>
      </div>
      <div style={styles.grid}>
        {Object.entries(Playlists).map(([id, pl]) => (
          <Link key={id} to={`/playlist/${id}`} style={styles.card}>
            <img src={pl.cover} alt={pl.name} style={styles.img} />
            <h3>{pl.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
