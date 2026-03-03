import Player from "@vimeo/player";
import type { RefObject } from "react";
import { useEffect, useRef, useCallback } from "react";
import useRoomVideo from "./useRoomVideo";

export const useVimeoPlayer = (
  iframeRef: RefObject<HTMLIFrameElement>,
  videoId: number,
  onError?: (msg: string) => void,
) => {
  const playerRef = useRef<Player | null>(null);
  const isRemoteAction = useRef(false);

  const {
    currentVideo: currentContent,
    setBufferedTime,
    setCurrentTime,
    setVideoDuration,
    broadcastVideoPlay,
    broadcastVideoPause,
    broadcastVideoPlaybackRateChange,
    onPause: onRemotePause,
    onPlay: onRemotePlay,
    onSeek: onRemoteSeek,
    onVideoPlaybackRateChange: onRemotePlaybackRateChange,
  } = useRoomVideo();

  const getPlayer = useCallback(() => playerRef.current, []);

  // Register remote action callbacks
  useEffect(() => {
    onRemotePlay(() => {
      const player = getPlayer();
      if (!player) return;
      isRemoteAction.current = true;
      player.play().catch(() => {});
    });

    onRemotePause(() => {
      const player = getPlayer();
      if (!player) return;
      isRemoteAction.current = true;
      player.pause().catch(() => {});
    });

    onRemoteSeek((time: number) => {
      const player = getPlayer();
      if (!player) return;
      isRemoteAction.current = true;
      player.setCurrentTime(time).catch(() => {});
    });

    onRemotePlaybackRateChange((video) => {
      const player = getPlayer();
      if (!player || !video) return;
      player.setPlaybackRate(video.playbackRate).catch(() => {});
    });
  }, [getPlayer, onRemotePlay, onRemotePause, onRemoteSeek, onRemotePlaybackRateChange]);

  // Initialize Vimeo player and attach event listeners
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = async () => {
      const player = new Player(iframe);
      playerRef.current = player;

      try {
        await player.ready();
      } catch {
        onError?.("Failed to load Vimeo player");
        return;
      }

      player.on("error", (err) => {
        onError?.(err.message || "Vimeo error");
      });

      // Initial sync
      try {
        const duration = await player.getDuration();
        setVideoDuration(duration);

        if (currentContent?.videoTime) {
          await player.setCurrentTime(currentContent.videoTime);
        }
        if (currentContent?.isPlaying) {
          await player.play();
        }
      } catch {
        // Player may not be fully initialised yet
      }

      // Time tracking
      player.on("timeupdate", (data) => {
        setCurrentTime(data.seconds);
      });

      player.on("progress", (data) => {
        setBufferedTime(data.seconds);
      });

      player.on("loaded", async () => {
        try {
          const duration = await player.getDuration();
          setVideoDuration(duration);
        } catch {
          // ignore
        }
      });

      // Local iframe interactions → broadcast to room
      player.on("play", () => {
        if (isRemoteAction.current) {
          isRemoteAction.current = false;
          return;
        }
        broadcastVideoPlay();
      });

      player.on("pause", () => {
        if (isRemoteAction.current) {
          isRemoteAction.current = false;
          return;
        }
        broadcastVideoPause();
      });

      player.on("playbackratechange", (data) => {
        broadcastVideoPlaybackRateChange(data.playbackRate);
      });
    };

    iframe.addEventListener("load", handleLoad);

    return () => {
      iframe.removeEventListener("load", handleLoad);
      if (playerRef.current) {
        playerRef.current.destroy().catch(() => {});
        playerRef.current = null;
      }
    };
  }, [iframeRef, videoId]);
};
