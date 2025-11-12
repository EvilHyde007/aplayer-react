import { useParams, Link } from "react-router-dom";
import APlayerWrapper from "../components/APlayerWrapper";
import { Playlists } from "./Playlists";

function Player() {
  const { id } = useParams();
  const playlist = Playlists[id];

  if (!playlist) {
    return <div>Playlist no encontrada</div>;
  }

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
      <APlayerWrapper tracks={playlist.tracks} />
    </div>
  );
}

export default Player;
