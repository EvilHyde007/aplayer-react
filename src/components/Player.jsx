import { useRef, useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { Playlists } from "./Playlists";

function Player() {
  const { id } = useParams();
  const playlist = Playlists[id];
  const { activePlayers, setActivePlayers, setVisiblePlayerId } =
    useOutletContext();

  const localRef = useRef(null);

  useEffect(() => {
    if (!activePlayers[id]) {
      setActivePlayers((prev) => ({ ...prev, [id]: localRef }));
    }
  }, [id, activePlayers, setActivePlayers]);

  useEffect(() => {
    setVisiblePlayerId(id);
    return () => setVisiblePlayerId(null);
  }, [id, setVisiblePlayerId]);

  useEffect(() => {
    const ap = localRef.current;
    if (!ap) return;

    ap.on("play", () => {
      document.querySelectorAll(".aplayer").forEach((el) => {
        const otherAp = el.__aplayer;
        if (otherAp && otherAp !== ap) {
          otherAp.pause();
        }
      });
    });
  }, []);

  if (!playlist) {
    return <div>Playlist no encontrada</div>;
  }

  const styles = {
  backButton: {
    display: "inline-block",
    marginBottom: "20px",
    padding: "10px 20px",
    backgroundColor: "#1db954",
    color: "white",
    borderRadius: "24px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
    border: "none",
    cursor: "pointer",
  },
  heading: {
    marginBottom: "30px",
    fontSize: "2rem",
    fontWeight: "700",
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // padding: "40px 20px",
  },
};

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backButton}>
        ← Volver al menú
      </Link>
      <h2 style={styles.heading}>{playlist.name}</h2>
    </div>
  );
}

export default Player;
