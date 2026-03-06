import { createContext, useRef } from "react";
import { type Video } from "@/types";
import React from "react";

type videoCallbacksType = {
    onVideoChange: (newVideo: Video | null) => void;
    onSeek: (time: number) => void;
    onPlay: () => void;
    onPause: () => void;
    onVideoPlaybackRateChange: (newVideo: Video | null) => void;
    onVideoSync: (newVideo: Video | null) => void;
}
type VideoControlesContextType = {
    playing: boolean;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    currentTime: number;
    setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    bufferedTime: number;
    setBufferedTime: React.Dispatch<React.SetStateAction<number>>;
    videoDuration: number;
    setVideoDuration: React.Dispatch<React.SetStateAction<number>>;
    callbacks: {
        onVideoChange: (newVideo: Video | null) => void;
        onSeek: (time: number) => void;
        onPlay: () => void;
        onPause: () => void;
        onVideoPlaybackRateChange: (newVideo: Video | null) => void;
        onVideoSync: (newVideo: Video | null) => void;
    };
    onVideoChange: (callback: (newVideo: Video | null) => void) => void;
    onSeek: (callback: (time: number) => void) => void;
    onPlay: (callback: () => void) => void;
    onPause: (callback: () => void) => void;
    onVideoPlaybackRateChange: (callback: (newVideo: Video | null) => void) => void;
    onVideoSync: (callback: (newVideo: Video | null) => void) => void;
}

const VideoControlesContext = createContext<VideoControlesContextType | null>(null);

const VideoControlesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [playing, setPlaying] = React.useState<boolean>(false);
    const [currentTime, setCurrentTime] = React.useState<number>(0);
    const [bufferedTime, setBufferedTime] = React.useState<number>(0);
    const [videoDuration, setVideoDuration] = React.useState<number>(0);

    const videoCallbacks =  useRef<videoCallbacksType>({
        onVideoChange: () => {},
        onSeek: () => {},
        onPlay: () => {},
        onPause: () => {},
        onVideoPlaybackRateChange: () => {},
        onVideoSync: () => {},
    });

    const handleVideoChange = (callback: (newVideo: Video | null) => void) => {
        videoCallbacks.current.onVideoChange = callback;
    }

    const handleSeek = (callback: (time: number) => void) => {
        videoCallbacks.current.onSeek = callback;
    }

    const handlePlay = (callback: () => void) => {
        videoCallbacks.current.onPlay = callback;
    }

    const handlePause = (callback: () => void) => {
        videoCallbacks.current.onPause = callback;
    }

    const handleVideoPlaybackRateChange = (callback: (newVideo: Video | null) => void) => {
        videoCallbacks.current.onVideoPlaybackRateChange = callback;
    }

    const handleVideoSync = (callback: (newVideo: Video | null) => void) => {
        videoCallbacks.current.onVideoSync = callback;
    }

    const videoContextValue = {
        playing,
        bufferedTime,
        currentTime,
        videoDuration,
        callbacks: videoCallbacks.current,
        setPlaying,
        setCurrentTime,
        setBufferedTime,
        setVideoDuration,
        onVideoChange: handleVideoChange,
        onSeek: handleSeek,
        onPlay: handlePlay,
        onPause: handlePause,
        onVideoPlaybackRateChange: handleVideoPlaybackRateChange,
        onVideoSync: handleVideoSync,
    };

    return (
        <VideoControlesContext.Provider value={videoContextValue}>
            {children}
        </VideoControlesContext.Provider>
    );
}

export const useVideoControles = () => {
    const context = React.useContext(VideoControlesContext);
    if (!context) {
        throw new Error("useVideoControles must be used within a VideoControlesContextProvider");
    }
    return context;
}

export default VideoControlesContextProvider;