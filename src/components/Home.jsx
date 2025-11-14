import { Link } from "react-router-dom"
import { Playlists } from './Playlists';
import { useState } from 'react';

function Home() {
  const isMobile = window.innerWidth < 768;

  const styles = {
    container: {
      padding: isMobile ? '24px 16px 60px' : '40px 60px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '3rem',
      fontSize: isMobile ? '2rem' : '2.5rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile 
        ? 'repeat(2, 1fr)' 
        : window.innerWidth < 1024 
          ? 'repeat(3, 1fr)' 
          : 'repeat(4, 1fr)',
      gap: '1.5rem',
      padding: '0',
    },
    card: {
      backgroundColor: '#1e1e1e',
      borderRadius: '12px',
      padding: '16px',
      textAlign: 'center',
      textDecoration: 'none',
      color: 'white',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      border: '1px solid #282828',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    cardHover: {
      transform: 'translateY(-8px)',
      backgroundColor: '#252525',
      borderColor: '#1db954',
      boxShadow: '0 12px 24px rgba(29, 185, 84, 0.2)',
    },
    img: {
      width: '100%',
      aspectRatio: '1',
      borderRadius: '8px',
      marginBottom: '12px',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },
    imgHover: {
      transform: 'scale(1.05)',
    },
    title: {
      fontSize: '0.95rem',
      fontWeight: '600',
      marginTop: 'auto',
      color: '#ffffff',
    },
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎧 Mis Playlists</h1>
      <div style={styles.grid}>
        {Object.entries(Playlists).map(([id, pl]) => (
          <Link 
            key={id} 
            to={`/playlist/${id}`} 
            style={{
              ...styles.card,
              ...(hoveredCard === id ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img 
              src={pl.cover || "/placeholder.svg"} 
              alt={pl.name} 
              style={{
                ...styles.img,
                ...(hoveredCard === id ? styles.imgHover : {}),
              }}
            />
            <h3 style={styles.title}>{pl.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;