import { useEffect, useRef } from "react";
import useRoomVideo from "@/hooks/useRoomVideo";

interface UrlVideoPlayerProps {
    src: string;
    setErrorMessage: (msg: string) => void;
    setError: (error: boolean) => void;
}

const UrlVideoPlayer = ({ src, setErrorMessage, setError }: UrlVideoPlayerProps) => {
    const playerRef = useRef<HTMLVideoElement | null>(null);

    const {
        currentVideoRef : currentContent,
        currentTime,
        videoDuration,
        setBufferedTime,
        setCurrentTime,
        setVideoDuration,
        onPause,
        onPlay,
        onSeek,
        onVideoSync,
    } = useRoomVideo();

    // Handle remote actions -> control local video
    useEffect(() => {
        if (!playerRef.current)  return;

        const video = playerRef.current;

        const syncVideoState = () => {
            if (!currentContent.current) return;
            
            const timeDifference = Math.abs(video.currentTime - currentContent.current.videoTime);
            const needsTimeSync = timeDifference > 0.5;
            const needsPlayStateSync = video.paused === currentContent.current.isPlaying;
            
            if (needsTimeSync) {
                video.currentTime = currentContent.current.videoTime;
            }
            
            if (needsPlayStateSync) {
                if (currentContent.current.isPlaying) {
                    video.play().catch((e) => {
                        console.error("Error playing video:", e);
                        setErrorMessage("Failed to play video. Please try again.");
                        setError(true);
                    });
                } else {
                    video.pause();
                }
            }
        };

        video.ontimeupdate = () => {
            setCurrentTime(video.currentTime);
            console.log("Video time update:", video.currentTime);
            if (!playerRef.current || currentContent.current === null) return;
            if(video.currentTime === videoDuration) {
                playerRef.current.currentTime = 0;
            } 
        };

        video.onloadeddata = () => {
            setVideoDuration(video.duration);
            console.log("Video loaded, duration set to:", video.duration);
            video.currentTime = currentContent.current?.videoTime || 0;
            console.log("Video current time set to:", currentContent.current?.videoTime);
        };

        video.onprogress = () => {
            if (video.buffered.length > 0) {
                setBufferedTime(video.buffered.end(video.buffered.length - 1));
            }
        };

        onPlay(() => {
            console.log("Video play event received");
            video.play().catch((e) => {
                console.error("Error playing video:", e);
                setErrorMessage("Failed to play video. Please try again.");
                setError(true);
            });
        });
        
        onPause(() => {
            console.log("Video pause event received");
            video.pause();
        });

        onSeek((time) => {
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
        playerRef.current, 
        setCurrentTime, 
        setBufferedTime
    ]);

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