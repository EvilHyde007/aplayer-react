import { useParams, Link, useOutletContext } from "react-router-dom";
import { Playlists } from "./Playlists";
import { useEffect } from "react";

function Player() {
  const { id } = useParams();
  const playlist = Playlists[id];
  const { setCurrentTracks } = useOutletContext(); // ✅ primero obtenemos la función

  if (!playlist) {
    return <div>Playlist no encontrada</div>;
  }

  // ✅ Actualiza los tracks globalmente con un ID único
  useEffect(() => {
  setCurrentTracks({ id, list: playlist.tracks });
}, [id, playlist, setCurrentTracks]);


  const styles = {
    backButton: {
      display: "inline-block",
      marginBottom: "20px",
      padding: "8px 16px",
      backgroundColor: "#1db954",
      color: "white",
      borderRadius: "20px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "0.9rem",
    },
    heading: {
      marginBottom: "20px",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backButton}>← Volver al menú</Link>
      <h2 style={styles.heading}>{playlist.name}</h2>
    </div>
  );
}

export default Player;
