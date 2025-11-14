import { useState } from "react";
import { Link } from "react-router-dom";
import { Playlists } from "./Playlists";

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = window.innerWidth < 768;

  const styles = {
    sidebar: {
      width: "240px",
      backgroundColor: "#0f0f0f",
      padding: "24px 16px",
      paddingTop: "40px",
      borderRight: "1px solid #282828",
      position: isMobile ? "fixed" : "relative",
      top: 0,
      left: 0,
      height: "100vh",
      transform: menuOpen || !isMobile ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: 999,
      overflowY: "auto",
      boxShadow: isMobile && menuOpen ? "-4px 0 12px rgba(0, 0, 0, 0.5)" : "none",
    },
    hamburger: {
      display: isMobile ? "block" : "none",
      position: "fixed",
      top: "15px",
      left: "15px",
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      color: "white",
      zIndex: 100,
      cursor: "pointer",
      padding: "8px",
    },
    overlay: {
      display: menuOpen && isMobile ? "block" : "none",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.7)",
      zIndex: 998,
    },
    closeButton: {
      position: "absolute",
      top: 12,
      right: 12,
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      color: "white",
      cursor: "pointer",
      padding: "8px",
      display: isMobile ? "block" : "none",
    },
    heading: {
      color: "white",
      fontSize: "1.3rem",
      fontWeight: "700",
      marginBottom: "24px",
      letterSpacing: "-0.5px",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    listItem: {
      margin: 0,
    },
    link: {
      color: "#b3b3b3",
      fontWeight: "500",
      textDecoration: "none",
      display: "block",
      padding: "10px 12px",
      borderRadius: "6px",
      transition: "all 0.2s ease",
      fontSize: "0.95rem",
    },
  };

  return (
    <>
      <div style={styles.overlay} onClick={() => setMenuOpen(false)} />

      <button style={styles.hamburger} onClick={() => setMenuOpen(true)}>
        ☰
      </button>

      <aside style={styles.sidebar}>
        <button style={styles.closeButton} onClick={() => setMenuOpen(false)}>
          ✕
        </button>
        <h2 style={styles.heading}>🎵 Playlists</h2>
        <ul style={styles.list}>
          {Object.entries(Playlists).map(([id, pl]) => (
            <li key={id} style={styles.listItem}>
              <Link
                to={`/playlist/${id}`}
                style={styles.link}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#1db954";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#b3b3b3";
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