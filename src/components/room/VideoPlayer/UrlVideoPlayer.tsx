import { useEffect, useRef } from "react";
import useRoomVideo from "@/hooks/useRoomVideo";
import useRemoteAction from "@/hooks/useRemoteAction";

interface UrlVideoPlayerProps {
    src: string;
    setErrorMessage: (msg: string) => void;
    setError: (error: boolean) => void;
}

const UrlVideoPlayer = ({ src, setErrorMessage, setError }: UrlVideoPlayerProps) => {
    const playerRef = useRef<HTMLVideoElement | null>(null);
    const { markRemoteAction, isRemoteActionRecent } = useRemoteAction();

    const {
        currentVideo: currentContent,
        currentTime,
        videoDuration,
        isMuted,
        volume,
        setIsMuted,
        setBufferedTime,
        setCurrentTime,
        setVideoDuration,
        onPause,
        onPlay,
        onSeek,
        onVideoSync,
        broadcastVideoSync,
    } = useRoomVideo();
    // Handle remote actions -> control local video
    useEffect(() => {
        if (!playerRef.current)  return;

        const video = playerRef.current;

        const syncVideoState = () => {
            if (!currentContent) return;
            console.log("syncVideoState: currentContent:", currentContent);
            markRemoteAction();
            const timeDifference = Math.abs(video.currentTime - currentContent.videoTime);
            const needsTimeSync = timeDifference > 0.5;
            const needsPlayStateSync = video.paused !== !currentContent.isPlaying;
            
            if (needsTimeSync) {
                console.log("syncVideoState: time sync needed video.currentTime:", video.currentTime, "currentContent.videoTime:", currentContent.videoTime);
                video.currentTime = currentContent.videoTime;
            }
            
            if (needsPlayStateSync) {
                if (currentContent.isPlaying) {
                    video.play().catch((e) => {
                        console.error("Autoplay blocked, trying muted:", e);
                        // Try muted autoplay as fallback
                        video.muted = true;
                        setIsMuted(true);
                        video.play().catch((mutedError) => {
                            console.error("Autoplay blocked even with muted:", mutedError);
                        });
                    });
                } else {
                    video.pause();
                }
            }
        };

        video.ontimeupdate = () => {
            setCurrentTime(video.currentTime);
            console.log("Video time update:", video.currentTime);
            if (!playerRef.current || currentContent === null || isRemoteActionRecent()) return;
            if(video.currentTime === videoDuration) {
                playerRef.current.currentTime = 0;
            } 
        };

        video.onloadeddata = () => {
            setVideoDuration(video.duration);
            console.log("Video loaded, duration set to:", video.duration);
            video.currentTime = currentContent?.videoTime || 0;
            console.log("Video current time set to:", currentContent?.videoTime);
        };

        video.onprogress = () => {
            if (video.buffered.length > 0) {
                setBufferedTime(video.buffered.end(video.buffered.length - 1));
            }
        };

        onPlay(() => {
            markRemoteAction();
            console.log("Video play event received");
            console.log("currentContent:", currentContent);
            if (currentContent?.videoTime !== undefined) {
                video.currentTime = currentContent.videoTime;
            }
            video.play().catch((e) => {
                console.error("Error playing video:", e);
                setErrorMessage("Failed to play video. Please try again.");
                setError(true);
            });
        });
        
        onPause(() => {
            markRemoteAction();
            console.log("Video pause event received");
            console.log("currentContent:", currentContent);
            console.log("Video paused at time:", video.currentTime, "currentTime from state:", currentTime);
            video.pause();
            console.log("Video paused at time:", video.currentTime, "currentTime from state:", currentTime);
        });

        onSeek((time) => {
            markRemoteAction();
            console.log("Video seek event received:", time);
            video.currentTime = time;
        });
        
        onVideoSync((updatedVideo) => {
            console.log("Video sync event received:", updatedVideo);
            if (!updatedVideo) return;
            syncVideoState();
        });


    }, [
        playerRef, 
        setCurrentTime, 
        setBufferedTime,
        setVideoDuration,
        onPlay,
        onPause,
        onSeek,
        onVideoSync,
        broadcastVideoSync,
    ]);

    // Sync volume and mute state with video element
    useEffect(() => {
        if (!playerRef.current) return;
        const video = playerRef.current;
        
        video.muted = isMuted;
        video.volume = volume;
    }, [isMuted, volume]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log("timeout: Current time:", currentContent?.videoTime);
            broadcastVideoSync();
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="relative w-full h-full">
            <video
                ref={playerRef}
                src={src}
                width="100%"
                height="100%"
                onError={(e) => {
                    console.error("Video error:", e);
                    setErrorMessage("Failed to load video. Please check the URL.");
                    setError(true);
                }}
                controls={false}
            />
        </div>
    );
};

export default UrlVideoPlayer;