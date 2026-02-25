import { createContext, use, useRef } from "react";
import { type Video } from "@/types";
import React from "react";

type videoCallbacksType = {
    onVideoChange: (newVideo: Video | null) => void;
    onSeek: (newVideo: Video | null) => void;
    onPlay: () => void;
    onPause: () => void;
    onVideoPlaybackRateChange: (newVideo: Video | null) => void;
}
type VideoControlesContextType = {
    callbacks: {
        onVideoChange: (newVideo: Video | null) => void;
        onSeek: (newVideo: Video | null) => void;
        onPlay: () => void;
        onPause: () => void;
        onVideoPlaybackRateChange: (newVideo: Video | null) => void;
    };
    onVideoChange: (callback: (newVideo: Video | null) => void) => void;
    onSeek: (callback: (newVideo: Video | null) => void) => void;
    onPlay: (callback: () => void) => void;
    onPause: (callback: () => void) => void;
    onVideoPlaybackRateChange: (callback: (newVideo: Video | null) => void) => void;
}

const VideoControlesContext = createContext<VideoControlesContextType | null>(null);

const VideoControlesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const videoCallbacks =  useRef<videoCallbacksType>({
        onVideoChange: () => {},
        onSeek: () => {},
        onPlay: () => {},
        onPause: () => {},
        onVideoPlaybackRateChange: () => {},
    });

    const handleVideoChange = (callback: (newVideo: Video | null) => void) => {
        videoCallbacks.current.onVideoChange = callback;
    }

    const handleSeek = (callback: (newVideo: Video | null) => void) => {
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

    const videoContextValue = {
        callbacks: videoCallbacks.current,
        onVideoChange: handleVideoChange,
        onSeek: handleSeek,
        onPlay: handlePlay,
        onPause: handlePause,
        onVideoPlaybackRateChange: handleVideoPlaybackRateChange,
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