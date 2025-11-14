import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import APlayerWrapper from "./APlayerWrapper";
import { Playlists } from "./Playlists";

const Layout = () => {
  const location = useLocation();
  const isPlaylistRoute = /^\/playlist\/[^/]+$/.test(location.pathname);
  const isMobile = window.innerWidth < 768;

  const [activePlayers, setActivePlayers] = useState({});
  const [visiblePlayerId, setVisiblePlayerId] = useState(null);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #1db954 100%)",
          color: "white",
        }}
      >
        <Sidebar />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingTop: "50px",
            paddingBottom: isMobile ? "40px" : "120px",
          }}
        >
          <Outlet
            context={{
              activePlayers,
              setActivePlayers,
              visiblePlayerId,
              setVisiblePlayerId,
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          visibility: isPlaylistRoute ? "visible" : "hidden",
          bottom: 0,
          left: isMobile ? 0 : "240px",
          right: 0,
          top: isMobile ? "144px" : "180px",
          paddingTop: "48px",
          // inset: "24px 0px 0px",
          // padding: "10px 20px",
        }}
      >
        {Object.entries(activePlayers).map(([id, ref]) => (
          <APlayerWrapper
            key={id}
            tracks={{ id, list: Playlists[id].tracks }}
            visible={visiblePlayerId === id}
            ref={ref}
          />
        ))}
      </div>
    </>
  );
};

export default Layout;
