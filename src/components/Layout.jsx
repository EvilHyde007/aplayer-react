import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import APlayerWrapper from "./APlayerWrapper";

const Layout = () => {
  const location = useLocation();
  const isPlaylistRoute = /^\/playlist\/[^/]+$/.test(location.pathname);
  const [currentTracks, setCurrentTracks] = useState({ id: null, list: [] });


  // 🔁 Limpiar los tracks si salís de la ruta de playlist
  // useEffect(() => {
  //   if (!isPlaylistRoute) {
  //     setCurrentTracks([]);
  //   }
  // }, [location.pathname]);

  const isMobile = window.innerWidth < 768;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #1db954, #191414)",
        color: "white",
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          // padding: "48px",
          paddingTop: "50px",
          paddingBottom: currentTracks.length > 0 && isPlaylistRoute ? "100px" : "40px",
        }}
      >
        <Outlet context={{ setCurrentTracks }} />
      </div>
     <APlayerWrapper tracks={currentTracks} visible={isPlaylistRoute} />






      
      {/* {currentTracks.length > 0 && isPlaylistRoute && (
        <APlayerWrapper tracks={currentTracks} fixed={false} />
      )} */}
    </div>
  );
};

export default Layout;
