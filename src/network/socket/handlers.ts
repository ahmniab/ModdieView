import type { VideoState } from "@/types/VideoState";

export const handleVideoState =
  (playerRef: React.RefObject<YT.Player | null>,
   isRemoteAction: React.MutableRefObject<boolean>) =>
  (state: VideoState) => {
    isRemoteAction.current = true;
    playerRef.current?.seekTo(state.time, true);
    if (typeof state.speed === "number") {
        playerRef.current?.setPlaybackRate(state.speed);
    }

    if (state.isPlaying) {
      playerRef.current?.playVideo();
    } else {
      playerRef.current?.pauseVideo();
    }
};