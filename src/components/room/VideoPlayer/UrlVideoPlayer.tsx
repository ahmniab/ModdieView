import { use, useEffect, useRef, useState } from "react";
import useRoomVideo from "@/hooks/useRoomVideo";
import VideoToolBar from "./VideoToolBar";

interface UrlVideoPlayerProps {
    src: string;
    setErrorMessage: (msg: string) => void;
    setError: (error: boolean) => void;
}

const UrlVideoPlayer = ({ src, setErrorMessage, setError }: UrlVideoPlayerProps) => {
    const playerRef = useRef<HTMLVideoElement | null>(null);

    const {
        currentVideo : currentContent,
        currentTime,
        videoDuration,
        setBufferedTime,
        setCurrentTime,
        setVideoDuration,
        onPause,
        onPlay,
        onSeek,
    } = useRoomVideo();

    // Handle remote actions -> control local video
    useEffect(() => {
        if (!playerRef.current)  return;

        const video = playerRef.current;

        video.ontimeupdate = () => {
            setCurrentTime(video.currentTime);
            console.log("Video time update:", currentTime);
            if (!playerRef.current || currentContent === null) return;
            if(currentTime >= videoDuration) {
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