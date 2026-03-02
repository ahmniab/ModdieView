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
    const [duration, setDuration] = useState<number>(0);

    const {
        playing,
        currentVideo : currentContent,
        bufferedTime,
        currentTime,
        setBufferedTime,
        setCurrentTime,
        broadcastVideoPause,
        broadcastVideoPlay,
        brodacastVideoSeek,
        onPause,
        onPlay,
        onSeek,
    } = useRoomVideo();

    // Handle local user actions -> broadcast to room
    const handlePlay = () => {
        broadcastVideoPlay();
        console.log("Video play event broadcasted");
    };
    
    const handlePause = () => {
        broadcastVideoPause();
        console.log("Video pause event broadcasted");
    };

    const handleSeek = (time: number) => {
        brodacastVideoSeek(time);
        console.log("Video seek event broadcasted:", time);
    };

    // Handle remote actions -> control local video
    useEffect(() => {
        if (!playerRef.current)  return;

        const video = playerRef.current;

        video.ontimeupdate = () => {
            setCurrentTime(video.currentTime);
            console.log("Video time update:", currentTime);
            if (!playerRef.current || currentContent === null) return;
            if(currentTime >= duration) {
                // broadcastVideoPause();
                // brodacastVideoSeek(0);
                playerRef.current.currentTime = 0;
            } 
        };

        video.onloadeddata = () => {
            setDuration(video.duration);
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
        broadcastVideoPause, 
        broadcastVideoPlay, 
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
            <VideoToolBar 
                isPlaying={playing} 
                maxTime={duration}
                onPlay={handlePlay} 
                onPause={handlePause} 
                onSeek={(d) => handleSeek(d)}
                currentTime={currentTime}
                bufferTime={bufferedTime}
            />
        </div>
    );
};

export default UrlVideoPlayer;