import Player from "@vimeo/player";
import type { RefObject } from "react";
import { useEffect } from "react";

export const useVimeoPlayer = (
  iframeRef: RefObject<HTMLIFrameElement>,
  videoId: number,
  onError?: (msg: string) => void) => {
    
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const player = new Player(iframe);

      player.ready().catch(() => {
        onError?.("Failed to load Vimeo player");
      });

      player.on("error", (err) => {
        onError?.(err.message || "Vimeo error");
      });
    };

    iframe.addEventListener("load", handleLoad);

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, [iframeRef, videoId, onError]);
};
