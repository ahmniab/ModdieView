import { useRoom } from "@/contexts/RoomContext";
import { useEffect } from "react";
import IoEvents from "@/utils/ioEventsNames";
import { type RoomContent } from "@/types/room";
import { useVideoControles } from "@/contexts/VideoControlesContext";
import { calculateVideoTime } from "@/utils/video";
import useKeyboardShortcut from "./useKeyboardShortcut";

const useRoomVideo = () => {
    const { room, socket, currentVideo, setCurrentVideo } = useRoom();

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

    useEffect(() => {
        if (!currentVideo){
            setCurrentTime(0);
            setBufferedTime(0);
            setVideoDuration(0);
            setPlaying(false);
            return;
        }
        callbacks.onVideoChange(currentVideo);
        setPlaying(currentVideo.isPlaying);
        if (currentVideo.isPlaying) {
            callbacks.onPlay();
        }
    }, [currentVideo]);


    const updateVideoState = (updatedVideo: RoomContent | null) => {
        if (!updatedVideo) return;

        setCurrentVideo(updatedVideo);
        setPlaying(updatedVideo.isPlaying);
    };

    const handleEventVideoPlaybackRateChange = (updatedVideo: RoomContent) => {
        updateVideoState(updatedVideo);
        callbacks.onVideoPlaybackRateChange(updatedVideo);
    };

    const handleEventVideoSeek = (updatedVideo: RoomContent) => {
        if (!updatedVideo) return;

        updateVideoState(updatedVideo);
        callbacks.onSeek(updatedVideo.videoTime);
    };

    const handleEventVideoPause = (updatedVideo: RoomContent) => {
        if (!updatedVideo) return;

        updateVideoState(updatedVideo);
        callbacks.onPause();
    };

    const handleVideoSync = (updatedVideo: RoomContent) => {
        if (!updatedVideo) return;

        updateVideoState(updatedVideo);
        callbacks.onVideoSync(updatedVideo);
    };

    const handleEventVideoPlay = (updatedVideo: RoomContent) => {
        if (!updatedVideo) return;

        updateVideoState(updatedVideo);
        callbacks.onPlay();
    };

    const broadcastVideoChange = (newVideo: RoomContent | null) => {
        if (!socket || !newVideo) return;

        const video = {
            ...newVideo,
            lastTimePlayed: Date.now(),
        };

        setCurrentVideo(video);
        socket.emit(IoEvents.CONTENT_CHANGE, video);
    };

    const broadcastVideoPlaybackRateChange = (playbackRate: number) => {
        if (!socket) return;
        socket.emit(IoEvents.CONTENT_VIDEO_PLAYBACK_RATE_CHANGE, playbackRate);
    };

    const broadcastVideoPause = () => {
        if (!socket) return;
        socket.emit(IoEvents.CONTENT_VIDEO_PAUSE);
    };

    const broadcastVideoPlay = () => {
        if (!socket) return;
        socket.emit(IoEvents.CONTENT_VIDEO_PLAY);
    };

    const broadcastVideoSeek = (videoTime: number) => {
        if (!socket) return;
        socket.emit(IoEvents.CONTENT_VIDEO_SEEK, videoTime);
    };

    const getCurrentVideoTime = () => {
        if (!currentVideo) return 0;

        return calculateVideoTime(
            currentVideo.videoTime,
            currentVideo.lastTimePlayed
        );
    };

    const syncVideoState = () => {
        if (!socket) return;
        socket.emit(IoEvents.CONTENT_VIDEO_SYNC);
    };

    useEffect(() => {
        if (!socket) return;
        socket.on(IoEvents.CONTENT_VIDEO_PLAY, handleEventVideoPlay);
        socket.on(IoEvents.CONTENT_VIDEO_PAUSE, handleEventVideoPause);
        socket.on(IoEvents.CONTENT_VIDEO_SEEK, handleEventVideoSeek);
        socket.on(
            IoEvents.CONTENT_VIDEO_PLAYBACK_RATE_CHANGE,
            handleEventVideoPlaybackRateChange
        );
        socket.on(IoEvents.CONTENT_VIDEO_SYNC, handleVideoSync);
        updateVideoState(room?.roomContent || null);
        syncVideoState();

        return () => {
            socket.off(IoEvents.CONTENT_VIDEO_PLAY, handleEventVideoPlay);
            socket.off(IoEvents.CONTENT_VIDEO_PAUSE, handleEventVideoPause);
            socket.off(IoEvents.CONTENT_VIDEO_SEEK, handleEventVideoSeek);
            socket.off(
                IoEvents.CONTENT_VIDEO_PLAYBACK_RATE_CHANGE,
                handleEventVideoPlaybackRateChange
            );
            socket.off(IoEvents.CONTENT_VIDEO_SYNC, handleVideoSync);
        };
    }, [socket]);

    useKeyboardShortcut({
        shortcutKeys: [" "],
        callback: () => {
            if (playing) broadcastVideoPause();
            else broadcastVideoPlay();
        },
    });

    useKeyboardShortcut({
        shortcutKeys: ["arrowright"],
        callback: () => {
            broadcastVideoSeek(currentTime + 5);
        },
    });

    useKeyboardShortcut({
        shortcutKeys: ["arrowleft"],
        callback: () => {
            broadcastVideoSeek(Math.max(0, currentTime - 5));
        },
    });

    return {
        playing,
        currentTime,
        currentVideo,
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
        broadcastVideoSeek,
        broadcastVideoSync: syncVideoState,
        getCurrentVideoTime,
        onPause,
        onPlay,
        onSeek,
        onVideoPlaybackRateChange,
        onVideoChange,
        onVideoSync,
    };
};

export default useRoomVideo;