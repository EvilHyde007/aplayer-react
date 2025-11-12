import { useEffect, useRef } from "react";
import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";

function APlayerWrapper({ tracks, visible }) {
  const playerRef = useRef(null);
  const apRef = useRef(null);

  useEffect(() => {
  if (!playerRef.current) return;

  if (!apRef.current) {
    const ap = new APlayer({
      container: playerRef.current,
      audio: tracks.list,
      theme: "#f82c08",
      listFolded: false,
      listMaxHeight: "390px",
    });

    apRef.current = ap;

    // Media Session API
    if ("mediaSession" in navigator) {
      const updateMetadata = () => {
        const current = ap.list.audios[ap.list.index];
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: current.name,
          artist: current.artist,
          artwork: [
            { src: current.cover, sizes: "512x512", type: "image/jpeg" },
          ],
        });
      };

      ap.on("play", updateMetadata);
      ap.on("listswitch", updateMetadata);

      navigator.mediaSession.setActionHandler("previoustrack", () =>
        ap.skipBack()
      );
      navigator.mediaSession.setActionHandler("nexttrack", () =>
        ap.skipForward()
      );
    }
   } else if (tracks?.list?.length) {
    const ap = apRef.current;

    // ✅ Solo actualizamos si el ID cambió
    if (ap.__playlistId !== tracks.id) {
      ap.list.clear();
      ap.list.add(tracks.list);
      ap.list.switch(0);
      ap.__playlistId = tracks.id;
    }
  }
}, [tracks]);



 return (
  <div
    ref={playerRef}
    style={{
      display: visible ? "block" : "none", // 👈 esto oculta sin desmontar
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
      paddingBottom: "20px",
      height: "auto",
    }}
  />
);

}

export default APlayerWrapper;
