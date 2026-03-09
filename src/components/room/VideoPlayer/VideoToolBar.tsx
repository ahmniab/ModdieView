import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import VideoControllerWrapper from "./VideoControllerWrapper";
import { VideoSeekSlider } from 'react-video-seek-slider';
import 'react-video-seek-slider/styles.css';
import './slider-styles.css';
import useRoomVideo from "@/hooks/useRoomVideo";
import { formatDurationWithSeconds } from "@/utils";
import { useState } from "react";

interface VideoToolBarProps {
}

const VideoToolBar: React.FC<VideoToolBarProps> = ({ 
}) => {
    const { 
        playing, 
        currentTime, 
        bufferedTime,
        videoDuration,
        isMuted,
        volume,
        setIsMuted,
        setVolume,
        brodacastVideoSeek, 
        broadcastVideoPlay, 
        broadcastVideoPause 
    } = useRoomVideo();
    const [nigativeTime, setNegativeTime] = useState<boolean>(false);

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
        if (newVolume === 0) {
            setIsMuted(true);
        } else if (isMuted) {
            setIsMuted(false);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="flex w-full items-center justify-center gap-2 p-1">
            <VideoControllerWrapper 
                onClick={playing ? broadcastVideoPause : broadcastVideoPlay} 
            >
                {playing ? <FaPause /> : <FaPlay />}
            </VideoControllerWrapper>
            <div className="flex gap-1 cursor-default select-none bg-slate-800/20 rounded-lg p-0.5 z-40" onClick={() => {setNegativeTime(!nigativeTime)}}>
                {nigativeTime ? '-' : '\u00A0'} 
                <span className="text-purple-300">
                    { formatDurationWithSeconds(nigativeTime ? videoDuration - currentTime : currentTime)}
                </span>
            </div>
            <div className="w-full mt-auto mb-auto pb-4">
                <VideoSeekSlider
                    max={videoDuration * 1000}
                    currentTime={currentTime * 1000}
                    onChange={(time) => brodacastVideoSeek(time / 1000)}
                    bufferTime={bufferedTime * 1000}
                    minutesPrefix="00:"
                    secondsPrefix="00:"
                />
            </div>
            <div className="flex gap-1 cursor-default select-none bg-slate-800/20 rounded-lg p-0.5 z-40">
                <span className="text-violet-500">{formatDurationWithSeconds(videoDuration)}</span>
            </div>
            <div className="flex items-center gap-2 min-w-[120px] z-40">
                <VideoControllerWrapper onClick={toggleMute}>
                    {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                </VideoControllerWrapper>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:border-0"
                    style={{
                        background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${(isMuted ? 0 : volume) * 100}%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`
                    }}
                />
            </div>
            {/* disabled for now */}
            {/* <VideoControllerWrapper className="p-1"> 
                <RiFullscreenFill />
            </VideoControllerWrapper> */}
        </div>
    );
};

export default VideoToolBar;