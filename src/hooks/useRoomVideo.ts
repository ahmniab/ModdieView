import { useRoom } from "@/contexts/RoomContext";
import { useEffect, useRef } from "react";
import IoEvents from "@/utils/ioEventsNames";
import { type RoomContent } from "@/types/room";
import { useVideoControles } from "@/contexts/VideoControlesContext";

const useRoomVideo = () => {
    const { room, socket } = useRoom();
    const currentVideo = useRef<RoomContent>(null);
    const { 
        callbacks, 
        onPause, 
        onPlay, 
        onSeek, 
        onVideoPlaybackRateChange, 
        onVideoChange
    } = useVideoControles();

    const setVideo = (newVideo: RoomContent | null) => {
        currentVideo.current = newVideo;
    }

    const handleEventVideoUpdate = (updatedVideo: RoomContent) => {
        setVideo(updatedVideo);
        callbacks.onVideoChange(updatedVideo);
    };
    
    const handleEventVideoPlaybackRateChange = (updatedVideo: RoomContent) => {
        setVideo(updatedVideo);
        callbacks.onVideoPlaybackRateChange(updatedVideo);
    }

    const handleEventVideoSeek = (updatedVideo: RoomContent) => {
        setVideo(updatedVideo);
        callbacks.onSeek(updatedVideo);
    }

    const handleEventVideoPause = () => {
        if (currentVideo.current) {
            currentVideo.current.isPlaying = false;
        }
        callbacks.onPause();
    }
    
    const handleEventVideoPlay = () => {
        if (currentVideo.current) {
            currentVideo.current.isPlaying = true;
        }
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
        if (!socket) return;
        socket.emit(IoEvents.CONTENT_VIDEO_PAUSE);
    }

    const broadcastVideoPlay = () => {
        if (!socket) return;
        socket.emit(IoEvents.CONTENT_VIDEO_PLAY);
    }

    useEffect(() => {
        if (!socket) return;

        socket.on(IoEvents.CONTENT_CHANGE, handleEventVideoUpdate);
        socket.on(IoEvents.CONTENT_VIDEO_PLAY, handleEventVideoPlay);
        socket.on(IoEvents.CONTENT_VIDEO_PAUSE, handleEventVideoPause);
        socket.on(IoEvents.CONTENT_VIDEO_SEEK, handleEventVideoSeek);
        socket.on(IoEvents.CONTENT_VIDEO_PLAYBACK_RATE_CHANGE, handleEventVideoPlaybackRateChange);

        setVideo(room?.roomContent || null);
    }, [socket]);

    return {
        currentVideo: currentVideo.current,
        broadcastVideoChange,
        broadcastVideoPlaybackRateChange,
        broadcastVideoPause,
        broadcastVideoPlay,
        onPause,
        onPlay,
        onSeek,
        onVideoPlaybackRateChange,
        onVideoChange
    }; 

}

export default useRoomVideo;