import { FaPlay, FaPause} from "react-icons/fa";
import { RiFullscreenFill } from "react-icons/ri";
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
        brodacastVideoSeek, 
        broadcastVideoPlay, 
        broadcastVideoPause 
    } = useRoomVideo();
    const [nigativeTime, setNegativeTime] = useState<boolean>(false);

    return (
        <div className="flex w-full items-center justify-center gap-2 p-1">
            <VideoControllerWrapper 
                onClick={playing ? broadcastVideoPause : broadcastVideoPlay} 
            >
                {playing ? <FaPause /> : <FaPlay />}
            </VideoControllerWrapper>
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
            <div className="flex gap-1 cursor-default select-none" onClick={() => {setNegativeTime(!nigativeTime)}}>
                {nigativeTime ? '-' : '\u00A0'} 
                <span className="text-purple-300">
                    { formatDurationWithSeconds(nigativeTime ? videoDuration - currentTime : currentTime)}
                </span>
                /
                <span className="text-violet-500">{formatDurationWithSeconds(videoDuration)}</span>
            </div>
            {/* disabled for now */}
            {/* <VideoControllerWrapper className="p-1"> 
                <RiFullscreenFill />
            </VideoControllerWrapper> */}
        </div>
    );
};

export default VideoToolBar;