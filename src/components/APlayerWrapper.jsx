import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";

const APlayerWrapper = forwardRef(({ tracks, visible }, ref) => {
  const playerRef = useRef(null);
  const apRef = useRef(null);

  useImperativeHandle(ref, () => apRef.current, []);

  useEffect(() => {
    if (!playerRef.current) return;

    if (!apRef.current) {
      setTimeout(() => {
        const ap = new APlayer({
          container: playerRef.current,
          audio: tracks.list,
          theme: "#f82c08",
          listFolded: false,
          listMaxHeight: "390px",
          autoplay: false,
        });

        apRef.current = ap;

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

        ap.on("play", () => {
          document.querySelectorAll(".aplayer").forEach((el) => {
            const otherAp = el.__aplayer;
            if (otherAp && otherAp !== ap) {
              otherAp.pause();
            }
          });
        });

        // Log para detectar pausas inesperadas
        // ap.on("pause", () => {
        //   console.log("⚠️ Reproductor pausado:", ap.list.audios[ap.list.index]);
        // });
      }, 50); 
    } else if (tracks?.list?.length) {
      const ap = apRef.current;

      if (ap.__playlistId !== tracks.id) {
        ap.list.clear();
        ap.list.add(tracks.list);
        ap.__playlistId = tracks.id;
      }
    }
  }, [tracks.id]); 

  return (
    <div
      ref={playerRef}
      style={{
        display: visible ? "block" : "none",
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        paddingBottom: "20px",
        height: "auto",
      }}
    />
  );
});

export default APlayerWrapper;
