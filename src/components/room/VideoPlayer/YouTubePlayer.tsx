import React, { useEffect, useRef, useCallback } from "react";
import YouTube, { type YouTubeEvent } from "react-youtube";
import { getYouTubeErrorMessage } from "@/utils";
import useRoomVideo from "@/hooks/useRoomVideo";

interface YouTubePlayerProps {
  id: string;
  onError?: (msg: string) => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ id, onError }) => {
  const playerRef = useRef<YouTube>(null);
  const isRemoteAction = useRef(false);

  const {
    currentVideo: currentContent,
    videoDuration,
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

  const getPlayer = useCallback(() => {
    return playerRef.current?.getInternalPlayer();
  }, []);

  // Register remote action callbacks
  useEffect(() => {
    onRemotePlay(() => {
      const player = getPlayer();
      if (!player) return;
      isRemoteAction.current = true;
      player.playVideo();
    });

    onRemotePause(() => {
      const player = getPlayer();
      if (!player) return;
      isRemoteAction.current = true;
      player.pauseVideo();
    });

    onRemoteSeek((time: number) => {
      const player = getPlayer();
      if (!player) return;
      isRemoteAction.current = true;
      player.seekTo(time, true);
    });

    onRemotePlaybackRateChange((video) => {
      const player = getPlayer();
      if (!player || !video) return;
      player.setPlaybackRate(video.playbackRate);
    });
  }, [getPlayer, onRemotePlay, onRemotePause, onRemoteSeek, onRemotePlaybackRateChange]);

  // Poll current time and buffered fraction
  useEffect(() => {
    const interval = setInterval(async () => {
      const player = getPlayer();
      if (!player) return;

      try {
        const time = await player.getCurrentTime();
        setCurrentTime(time);

        const duration = await player.getDuration();
        if (duration > 0 && duration !== videoDuration) {
          setVideoDuration(duration);
        }

        const loadedFraction = await player.getVideoLoadedFraction();
        setBufferedTime(loadedFraction * duration);
      } catch {
        // Player might not be ready yet
      }
    }, 250);

    return () => clearInterval(interval);
  }, [getPlayer, setCurrentTime, setBufferedTime, setVideoDuration, videoDuration]);

  // YouTube ready — sync initial state
  const handleReady = useCallback(
    async (event: YouTubeEvent) => {
      const player = event.target;

      const duration = await player.getDuration();
      setVideoDuration(duration);

      if (currentContent?.videoTime) {
        player.seekTo(currentContent.videoTime, true);
      }

      if (currentContent?.isPlaying) {
        player.playVideo();
      }
    },
    [currentContent, setVideoDuration],
  );

  // Iframe play — broadcast only if triggered by user
  const handlePlay = useCallback(() => {
    if (isRemoteAction.current) {
      isRemoteAction.current = false;
      return;
    }
    broadcastVideoPlay();
  }, [broadcastVideoPlay]);

  // Iframe pause — broadcast only if triggered by user
  const handlePause = useCallback(() => {
    if (isRemoteAction.current) {
      isRemoteAction.current = false;
      return;
    }
    broadcastVideoPause();
  }, [broadcastVideoPause]);

  // Playback rate changed inside iframe
  const handlePlaybackRateChange = useCallback(
    (event: YouTubeEvent<number>) => {
      broadcastVideoPlaybackRateChange(event.data);
    },
    [broadcastVideoPlaybackRateChange],
  );

  return (
    <YouTube
      ref={playerRef}
      videoId={id}
      onReady={handleReady}
      onPlay={handlePlay}
      onPause={handlePause}
      onPlaybackRateChange={handlePlaybackRateChange}
      onError={(e) => {
        const errorMessage = getYouTubeErrorMessage(e.data);
        onError?.(errorMessage);
      }}
      iframeClassName="w-full h-full"
      className="h-full w-full"
      title="YouTube Video"
      opts={{
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          controls: 0,
        },
      }}
    />
  );
};

export default YouTubePlayer;