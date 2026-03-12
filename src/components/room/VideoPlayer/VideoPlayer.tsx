import { default as YouTubePlayer } from "../VideoPlayer/YouTubePlayer";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import { default as VimeoPlayer} from "./VimeoPlayer";
import UrlVideoPlayer from "./UrlVideoPlayer";
import VideoToolBar from "./VideoToolBar";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import { useRef } from "react";
import type { Video } from "@/types";

  
interface VideoPlayerProps {
  video: Video;
  userName: string;
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const [ error, setError ] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const toggleFullscreen = () => {
    const el = videoContainerRef.current;
    if (!document.fullscreenElement) {
      el?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useKeyboardShortcut({
    shortcutKeys: ["f"],
    callback: toggleFullscreen
  });

  return (
      <div ref={videoContainerRef} className="w-full h-full bg-black sm:w-full sm:h-full md:w-[95%] md:h-[70%] lg:w-[90%] lg:h-[80%]
      border border-gray-700 overflow-hidden relative flex flex-col">

        <div className="flex-1 min-h-0">

        {!video ? (
          <div className="h-full w-full flex items-center justify-center flex-col text-white/60 text-[36px] sm:text-[36px] font-semibold">
            No video selected
          </div>

        ) : error ? (
          <div className="h-full w-full flex-1 flex items-center justify-center flex-col">
            <div className="text-red-500 text-[36px] sm:text-[50px] font-semibold flex items-center justify-center">
              <MdErrorOutline className="inline size-10 sm:size-14 mr-2"/>Error
            </div>
            <div className="text-white/60 text-sm sm:text-lg mt-1 sm:mt-2 md:mt-3 lg:mt-4 font-medium text-center">
              {errorMessage || "Invalid video. Please check the URL and try again."}
            </div>
          </div>

        ) : (video.platform === "youtube") ? (

          <YouTubePlayer id={video.id}
            onError={(msg) => {
              setErrorMessage(msg);
              setError(true);
            }}
          />

        ) : (video.platform === "vimeo") ? (

          <VimeoPlayer videoId={video.id}
            onError={(msg) => {
              setErrorMessage(msg);
              setError(true);
            }}
          />

        ) : (

          <UrlVideoPlayer
            src={video.url}
            setErrorMessage={setErrorMessage}
            setError={setError}
          />

        )}

      </div>
          {video && !error && <VideoToolBar />}
      </div>
  );

};
export default VideoPlayer;