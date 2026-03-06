import React, { useEffect, useRef, useCallback } from "react";
import YouTube, { type YouTubeEvent } from "react-youtube";
import { getYouTubeErrorMessage } from "@/utils";
import useRoomVideo from "@/hooks/useRoomVideo";
import useRemoteAction from "@/hooks/useRemoteAction";

interface YouTubePlayerProps {
  id: string;
  onError?: (msg: string) => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ id, onError }) => {
  const playerRef = useRef<YouTube>(null);
  const { markRemoteAction, isRemoteActionRecent } = useRemoteAction();

  const {
    currentVideoRef: currentContent,
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
    onVideoSync: onRemoteVideoSync,
    onVideoPlaybackRateChange: onRemotePlaybackRateChange,
  } = useRoomVideo();

  const getPlayer = useCallback(() => {
    return playerRef.current?.getInternalPlayer();
  }, []);
  const syncVideoState = useCallback(() => {
    if (currentContent.current && playerRef.current) {
      markRemoteAction();
      if (currentContent.current.isPlaying)
        playerRef.current.getInternalPlayer().playVideo();
      else
        playerRef.current.getInternalPlayer().pauseVideo();
    }
  }, [currentContent, playerRef, markRemoteAction]);

  // Register remote action callbacks
  useEffect(() => {
    onRemotePlay(() => {
      const player = getPlayer();
      if (!player) return;
      markRemoteAction();
      player.seekTo(currentContent.current?.videoTime, true);
      player.playVideo();
    });

    onRemotePause(() => {
      const player = getPlayer();
      if (!player) return;
      markRemoteAction();
      player.pauseVideo();
    });

    onRemoteSeek((time: number) => {
      const player = getPlayer();
      if (!player) return;
      markRemoteAction();
      player.seekTo(time, true);
    });

    onRemotePlaybackRateChange((video) => {
      const player = getPlayer();
      if (!player || !video) return;
      markRemoteAction();
      player.setPlaybackRate(video.playbackRate);
    });

    onRemoteVideoSync((_video) => {
      const player = getPlayer();
      if (!player || !currentContent.current) return;

      markRemoteAction();
      console.log("Syncing video state:", currentContent.current);
      player.seekTo(currentContent.current.videoTime, true);
      syncVideoState();
    });
  }, [getPlayer, markRemoteAction, syncVideoState, onRemotePlay, onRemotePause, onRemoteSeek, onRemotePlaybackRateChange, onRemoteVideoSync]);

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
  }, [
    getPlayer, 
    setCurrentTime, 
    setBufferedTime, 
    setVideoDuration, 
    videoDuration, 
    playerRef, 
    playerRef.current
  ]);

  // YouTube ready — sync initial state
  const handleReady = useCallback(
    async (event: YouTubeEvent) => {
      const player = event.target;
      markRemoteAction();

      const duration = await player.getDuration();
      setVideoDuration(duration);

      if (currentContent.current?.videoTime) {
        player.seekTo(currentContent.current.videoTime, true);
      }

      if (currentContent.current?.isPlaying) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    },
    [currentContent, setVideoDuration, markRemoteAction],
  );

  // Iframe play — broadcast only if triggered by user
  const handlePlay = useCallback(() => {
    if (isRemoteActionRecent()) return;
    broadcastVideoPlay();
  }, [broadcastVideoPlay, isRemoteActionRecent]);

  // Iframe pause — broadcast only if triggered by user
  const handlePause = useCallback(() => {
    if (isRemoteActionRecent()) return;
    broadcastVideoPause();
  }, [broadcastVideoPause, isRemoteActionRecent]);

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