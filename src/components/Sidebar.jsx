import { useState } from "react";
import { Link } from "react-router-dom";
import { Playlists } from "./Playlists";

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = window.innerWidth < 768;

  const styles = {
    sidebar: {
      width: "220px",
      backgroundColor: "#121212",
      padding: "16px",
      paddingTop: "36px",
      borderRight: "1px solid #333",
      position: isMobile ? "fixed" : "relative",
      top: 0,
      left: 0,
      height: "100%",
      transform: menuOpen || !isMobile ? "translateX(0)" : "translateX(-100%)",
      // transition: "transform 0.3s ease",
      transition: "transform 0.3s ease-in-out",
      zIndex: 999,
      overflowY: "auto",
    },
    hamburger: {
      display: isMobile ? "block" : "none",
      position: "fixed",
      top: "15px",
      left: "15px",
      background: "none",
      border: "none",
      fontSize: "2rem",
      color: "white",
      zIndex: 100,
      cursor: "pointer",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      zIndex: 998,
    },
    closeButton: {
      position: "absolute",
      top: 15,
      right: 15,
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      color: "white",
      cursor: "pointer",
    },
  };

  return (
    <>
      {menuOpen && isMobile && (
        <div style={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}

      {isMobile && (
        <button style={styles.hamburger} onClick={() => setMenuOpen(true)}>
          ☰
        </button>
      )}

      <aside style={styles.sidebar}>
        {isMobile && (
          <button style={styles.closeButton} onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        )}
        <h2 style={{ color: "white" }}>🎵 PlayLists</h2>
        <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
          {Object.entries(Playlists).map(([id, pl]) => (
            <li key={id} style={{ marginBottom: "10px" }}>
              <Link
                to={`/playlist/${id}`}
                style={{
                  color: "#b3b3b3",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {pl.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
