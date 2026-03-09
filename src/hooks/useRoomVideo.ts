import { useRoom } from "@/contexts/RoomContext";
import { useEffect, useRef } from "react";
import IoEvents from "@/utils/ioEventsNames";
import { type RoomContent } from "@/types/room";
import { useVideoControles } from "@/contexts/VideoControlesContext";
import { calculateVideoTime } from "@/utils/video";
import useKeyboardShortcut from "./useKeyboardShortcut";

const useRoomVideo = () => {
    const { room, socket } = useRoom();
    const currentVideo = useRef<RoomContent>(null);
    const { 
        playing,
        bufferedTime,
        currentTime,
        callbacks, 
        videoDuration,
        isMuted,
        volume,
        setCurrentTime,
        setBufferedTime,
        setVideoDuration,
        setIsMuted,
        setVolume,
        onPause, 
        onPlay, 
        onSeek, 
        onVideoPlaybackRateChange, 
        onVideoChange,
        setPlaying,
        onVideoSync,
    } = useVideoControles();


    const updateVideoRef = (updatedVideo: RoomContent | null) => {
        if (!currentVideo.current) {
            currentVideo.current = updatedVideo;
        }
        if (!currentVideo.current || !updatedVideo) 
            return;

        currentVideo.current.videoTime = updatedVideo.videoTime;
        // setCurrentTime(currentVideo.current.videoTime);
        setPlaying(updatedVideo.isPlaying);
        currentVideo.current.isPlaying = updatedVideo.isPlaying;

        if(updatedVideo.isPlaying) currentVideo.current.lastTimePlayed = updatedVideo.lastTimePlayed;
        currentVideo.current.playbackRate = updatedVideo.playbackRate;
        currentVideo.current.url = updatedVideo.url;
    }

    const handleEventVideoUpdate = (updatedVideo: RoomContent) => {
        if (!updatedVideo) {
            return;
        }
        updateVideoRef(updatedVideo);

        callbacks.onVideoChange(updatedVideo);
    };
    
    const handleEventVideoPlaybackRateChange = (updatedVideo: RoomContent) => {
        updateVideoRef(updatedVideo);
        callbacks.onVideoPlaybackRateChange(updatedVideo);
    }

    const handleEventVideoSeek = (updatedVideo: RoomContent) => {
        updateVideoRef(updatedVideo);
        if (!updatedVideo) return;
        console.log("Video seek event received with time:", updatedVideo.videoTime);
        callbacks.onSeek(updatedVideo.videoTime);
    }

    const handleEventVideoPause = (updatedVideo: RoomContent) => {
        if (!updatedVideo) {
            return;
        }
        console.log("updated video received in pause event", updatedVideo);
        updateVideoRef(updatedVideo);  
        callbacks.onPause();
    }

    const handleVideoSync = (updatedVideo: RoomContent) => {
        console.log("updated video received in sync event", updatedVideo);
        updateVideoRef(updatedVideo);  
        callbacks.onVideoSync(updatedVideo);
    }
    
    const handleEventVideoPlay = (updatedVideo: RoomContent) => {
        console.log("updated video received in play event", updatedVideo);
        if (!updatedVideo) {
            return;
        }
        console.log("received play event with video", updatedVideo);
        updateVideoRef(updatedVideo);
        callbacks.onPlay();
    }

    const broadcastVideoChange = (newVideo: RoomContent | null) => {
        if (!socket) return;
        socket.emit(IoEvents.CONTENT_CHANGE, newVideo);
    }

    const broadcastVideoPlaybackRateChange = (playbackRate: number) => {
        if (!socket) return;
        socket.emit(IoEvents.CONTENT_VIDEO_PLAYBACK_RATE_CHANGE, playbackRate);
    }

    const broadcastVideoPause = () => {
        console.log("Broadcasting video pause event");
        if (!socket) return;
        socket.emit(IoEvents.CONTENT_VIDEO_PAUSE);
    }

    const broadcastVideoPlay = () => {
        if (!socket) return;
        socket.emit(IoEvents.CONTENT_VIDEO_PLAY);
    }
    const brodacastVideoSeek = (videoTime: number) => {
        if (!socket) return;
        socket.emit(IoEvents.CONTENT_VIDEO_SEEK, videoTime);
    }


    const getCurrentVideoTime = () => {
        if (!currentVideo.current) return 0;
        return calculateVideoTime(
            currentVideo.current.videoTime, 
            currentVideo.current.lastTimePlayed
        );
    }

    const syncVideoState = () => {
        if (socket) {
            socket.emit(IoEvents.CONTENT_VIDEO_SYNC);
        }
    }

    useEffect(() => {
        if (!socket) return;

        socket.on(IoEvents.CONTENT_CHANGE, handleEventVideoUpdate);
        socket.on(IoEvents.CONTENT_VIDEO_PLAY, handleEventVideoPlay);
        socket.on(IoEvents.CONTENT_VIDEO_PAUSE, handleEventVideoPause);
        socket.on(IoEvents.CONTENT_VIDEO_SEEK, handleEventVideoSeek);
        socket.on(IoEvents.CONTENT_VIDEO_PLAYBACK_RATE_CHANGE, handleEventVideoPlaybackRateChange);  
        socket.on(IoEvents.CONTENT_VIDEO_SYNC, handleVideoSync);      

        updateVideoRef(room?.roomContent || null);
        syncVideoState();

        return () => {
            socket.off(IoEvents.CONTENT_CHANGE, handleEventVideoUpdate);
            socket.off(IoEvents.CONTENT_VIDEO_PLAY, handleEventVideoPlay);
            socket.off(IoEvents.CONTENT_VIDEO_PAUSE, handleEventVideoPause);
            socket.off(IoEvents.CONTENT_VIDEO_SEEK, handleEventVideoSeek);
            socket.off(IoEvents.CONTENT_VIDEO_PLAYBACK_RATE_CHANGE, handleEventVideoPlaybackRateChange);  
            socket.off(IoEvents.CONTENT_VIDEO_SYNC, handleVideoSync);      
        }
    }, [socket]);

    useKeyboardShortcut({
        shortcutKeys: [" "],
        callback: () => {
            if (playing)
                broadcastVideoPause();
            else
                broadcastVideoPlay();
        }
    });

    useKeyboardShortcut({
        shortcutKeys: ["arrowright"],
        callback: () => {
            brodacastVideoSeek(currentTime + 5);
        }
    });

    useKeyboardShortcut({
        shortcutKeys: ["arrowleft"],
        callback: () => {
            brodacastVideoSeek(Math.max(0, currentTime - 5));
    }
    });


    return {
        playing,
        currentTime,
        currentVideoRef: currentVideo,
        bufferedTime,
        videoDuration,
        isMuted,
        volume,
        setBufferedTime,
        setCurrentTime,
        setVideoDuration,
        setIsMuted,
        setVolume,
        broadcastVideoChange,
        broadcastVideoPlaybackRateChange,
        broadcastVideoPause,
        broadcastVideoPlay,
        brodacastVideoSeek,
        broadcastVideoSync: syncVideoState,
        getCurrentVideoTime,
        onPause,
        onPlay,
        onSeek,
        onVideoPlaybackRateChange,
        onVideoChange,
        onVideoSync
    }; 

}

export default useRoomVideo;