import { useRoom } from "@/contexts/RoomContext";
import { useEffect, useRef } from "react";
import IoEvents from "@/utils/ioEventsNames";
import { type RoomContent } from "@/types/room";
import { useVideoControles } from "@/contexts/VideoControlesContext";
import { calculateVideoTime } from "@/utils/video";

const useRoomVideo = () => {
    const { room, socket } = useRoom();
    const currentVideo = useRef<RoomContent>(null);
    const { 
        playing,
        bufferedTime,
        currentTime,
        callbacks, 
        videoDuration,
        setCurrentTime,
        setBufferedTime,
        setVideoDuration,
        onPause, 
        onPlay, 
        onSeek, 
        onVideoPlaybackRateChange, 
        onVideoChange,
        setPlaying
    } = useVideoControles();


    const updateVideoRef = (updatedVideo: RoomContent | null) => {
        if (!currentVideo.current) {
            currentVideo.current = updatedVideo;
        }
        if (!currentVideo.current || !updatedVideo) 
            return;

        currentVideo.current.videoTime = calculateVideoTime(
            updatedVideo.videoTime, 
            updatedVideo.lastTimePlayed
        );
        // setCurrentTime(currentVideo.current.videoTime);
        setPlaying(updatedVideo.isPlaying);
        currentVideo.current.isPlaying = playing;

        currentVideo.current.lastTimePlayed = updatedVideo.lastTimePlayed;
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
        console.log(`Emitting pause event to server (${IoEvents.CONTENT_VIDEO_PAUSE})`);
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

    useEffect(() => {
        if (!socket) return;

        socket.on(IoEvents.CONTENT_CHANGE, handleEventVideoUpdate);
        socket.on(IoEvents.CONTENT_VIDEO_PLAY, handleEventVideoPlay);
        socket.on(IoEvents.CONTENT_VIDEO_PAUSE, handleEventVideoPause);
        socket.on(IoEvents.CONTENT_VIDEO_SEEK, handleEventVideoSeek);
        socket.on(IoEvents.CONTENT_VIDEO_PLAYBACK_RATE_CHANGE, handleEventVideoPlaybackRateChange);        

        updateVideoRef(room?.roomContent || null);
    }, [socket]);


    return {
        playing,
        currentTime,
        currentVideo: currentVideo.current,
        bufferedTime,
        videoDuration,
        setBufferedTime,
        setCurrentTime,
        setVideoDuration,
        broadcastVideoChange,
        broadcastVideoPlaybackRateChange,
        broadcastVideoPause,
        broadcastVideoPlay,
        brodacastVideoSeek,
        getCurrentVideoTime,
        onPause,
        onPlay,
        onSeek,
        onVideoPlaybackRateChange,
        onVideoChange
    }; 

}

export default useRoomVideo;