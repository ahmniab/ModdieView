import { useEffect, useRef } from "react";
import YouTube, { type YouTubeEvent } from "react-youtube";
import socket  from "@/network/socket";
import { handleVideoState } from "@/network/socket/handlers";
import { SOCKET_EVENTS } from "@/network/socket/events";
import type { VideoAction } from "@/types/VideoAction";

interface VideoPlayerProps {
  videoId: string;
  userName: string;
}

const VideoPlayer = ({ videoId, userName }: VideoPlayerProps) => {

  const playerRef = useRef<YT.Player | null>(null);
  const isRemoteAction = useRef(false);
  const lastTimeRef = useRef(0);
  const currentUserRef= useRef(userName);
  const isSeekingRef = useRef(false);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    currentUserRef.current = userName;
  }, [userName]);

  useEffect(() => {
    const handler = (data: any) => {
      isRemoteAction.current = true;
      handleVideoState(playerRef, isRemoteAction)(data);
    };
    socket.on(SOCKET_EVENTS.VIDEO_STATE, handler);
    return () => {
      socket.off(SOCKET_EVENTS.VIDEO_STATE, handler);
  };
  }, []);

  useEffect(() => {
  const interval = setInterval(() => {
    if (playerRef.current && !isRemoteAction.current) {
      lastTimeRef.current = parseFloat(playerRef.current.getCurrentTime().toFixed(2));
    }
  }, 1000);
  return () => clearInterval(interval);
}, []);

  const onReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    lastTimeRef.current = parseFloat(event.target.getCurrentTime().toFixed(2));
  };

  const onPlay = (event : YouTubeEvent) => {
    wasPlayingRef.current = true;
    if (!playerRef.current || isRemoteAction.current) {
      isRemoteAction.current = false;
      return;
    }
    lastTimeRef.current = parseFloat(event.target.getCurrentTime().toFixed(2));
    if (!socket.connected) return;
    if (isSeekingRef.current) {
      isSeekingRef.current = false;
      return;
    }
    socket.emit(SOCKET_EVENTS.VIDEO_PLAY, {
      action: "play",
      videoId,
      time: lastTimeRef.current,
      userName: currentUserRef.current,
    } satisfies VideoAction);
    console.log(`userName: ${currentUserRef.current} play video at time: ${lastTimeRef.current}`);
  };

  const onPause = (event : YouTubeEvent) => {
    wasPlayingRef.current = false;
    if (!playerRef.current || isRemoteAction.current) {
      isRemoteAction.current = false;
      return;
    }
    const currentTime = parseFloat(event.target.getCurrentTime().toFixed(2));
    lastTimeRef.current = currentTime;
    if (!socket.connected || isSeekingRef.current) return;
    socket.emit(SOCKET_EVENTS.VIDEO_PAUSE, {
      action: "pause",
      videoId,
      time: lastTimeRef.current,
      userName: currentUserRef.current,
    } satisfies VideoAction);
    console.log(`userName: ${currentUserRef.current} pause video at time: ${lastTimeRef.current}`);
  };

  const onStateChange = (event: YouTubeEvent) => {
  const state = event.data;
  const currentTime = parseFloat(event.target.getCurrentTime().toFixed(2));
  const delta = Math.abs(currentTime - lastTimeRef.current);
  const isActuallySeeking = delta > 2.0;
  
  if (!playerRef.current) return;
    if (isRemoteAction.current) {
      if (state === YT.PlayerState.PLAYING || state === YT.PlayerState.PAUSED) {
        setTimeout(() => { 
          isRemoteAction.current = false; 
        }, 100);
      }
      lastTimeRef.current = currentTime;
      return;
    }
      if (isActuallySeeking) {
        if (!socket.connected) return;
        isSeekingRef.current = true;
        socket.emit(SOCKET_EVENTS.VIDEO_SEEK, {
          action: "seek",
          videoId,
          time: currentTime,
          userName: currentUserRef.current,
        } satisfies VideoAction);
        console.log(`userName: ${currentUserRef.current} seek video to time: ${currentTime}`);
      }
    lastTimeRef.current = currentTime;
  };

  const onPlaybackRateChange = (event: YouTubeEvent) => {
    const speed = event.target.getPlaybackRate();
    if (!playerRef.current || isRemoteAction.current) {
      isRemoteAction.current = false;
      return;
    }
    if (!socket.connected) return;
    socket.emit(SOCKET_EVENTS.VIDEO_SPEED, {
      action: "speed",
      videoId,
      time: parseFloat(event.target.getCurrentTime().toFixed(2)),
      userName: currentUserRef.current,
      speed,
    } satisfies VideoAction);
    console.log(`userName: ${currentUserRef.current} change speed to: ${speed}`);
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-900">
      <div className="w-[90%] h-[80%] rounded-lg bg-black border border-gray-700 overflow-hidden">
        <YouTube
          videoId={videoId}
          iframeClassName="w-full h-full"
          className="h-full w-full"
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
          onPlaybackRateChange={onPlaybackRateChange}
          onStateChange={onStateChange}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
            autoplay: 0,
            controls: 1,
            },
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;