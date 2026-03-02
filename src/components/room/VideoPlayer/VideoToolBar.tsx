import { FaPlay, FaPause} from "react-icons/fa";
import VideoControllerWrapper from "./VideoControllerWrapper";
import { IoPlayBackSharp, IoPlayForwardSharp } from "react-icons/io5";
import { VideoSeekSlider } from 'react-video-seek-slider';
import { useState } from "react";
import 'react-video-seek-slider/styles.css';
import './slider-styles.css';

interface VideoToolBarProps {
    isPlaying: boolean;
    maxTime: number;
    currentTime: number;
    bufferTime: number;
    seekAmount?: number;
    onPlay: () => void;
    onPause: () => void;
    onSeek: (time: number) => void;
}

const VideoToolBar: React.FC<VideoToolBarProps> = ({ 
    isPlaying, 
    maxTime, 
    currentTime, 
    bufferTime,
    seekAmount = 5,
    onPlay, 
    onPause, 
    onSeek,
}) => {
    return (
        <div className="absolute bottom-4 flex w-full items-center justify-center flex-col p-4">
            <div className="flex gap-20 ml-4 mr-4">
                <VideoControllerWrapper onClick={() => onSeek(currentTime - seekAmount)}>
                    <IoPlayBackSharp className="text-white" />
                </VideoControllerWrapper>
                <VideoControllerWrapper 
                    onClick={isPlaying ? onPause : onPlay} 
                >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </VideoControllerWrapper>
                <VideoControllerWrapper onClick={() => onSeek(currentTime + seekAmount)}>
                    <IoPlayForwardSharp className="text-white" />
                </VideoControllerWrapper>
            </div>
            <div className="w-full">
                <VideoSeekSlider
                    max={maxTime * 1000}
                    currentTime={currentTime * 1000}
                    onChange={(time) => onSeek(time / 1000)}
                    bufferTime={bufferTime * 1000}
                    minutesPrefix="00:"
                    secondsPrefix="00:"
                />
            </div>
        </div>
    );
};

export default VideoToolBar;