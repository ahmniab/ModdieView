import { default as YouTubePlayer } from "../VideoPlayer/YouTubePlayer";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import { default as VimeoPlayer} from "./VimeoPlayer";
import UrlVideoPlayer from "./UrlVideoPlayer";
import VideoToolBar from "./VideoToolBar";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import { useRef } from "react";
import { shortcutKeys, type RoomContent } from "@/types";
import { toggleFullscreen } from "@/utils/fullscreen";

  
interface VideoPlayerProps {
  video: RoomContent;
  userName: string;
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const [ errorId, setErrorId ] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const handleFullscreen = () => {
  toggleFullscreen(videoContainerRef.current);
};

  useKeyboardShortcut({
    shortcutKeys: [shortcutKeys.FULLSCREEN],
    callback: handleFullscreen
  });

  const shouldShowError = () => {
    if (!video) return false;
    const identicalIdentefier = errorId === (video.platform === "directMedia" ? video.url : video.id);
    return errorId && identicalIdentefier;
  }
  
  return (
      <div ref={videoContainerRef} className="w-full h-full bg-black sm:w-full sm:h-full md:w-[95%] md:h-[50%] lg:w-[90%] lg:h-[80%]
      border border-gray-700 overflow-hidden relative flex flex-col">

        <div className="flex-1 flex items-center justify-center min-h-0" onDoubleClick={handleFullscreen}>
          <div className="w-full max-h-full aspect-video">

        {!video ? (
          <div className="h-full w-full flex items-center justify-center flex-col text-white/60 text-[36px] sm:text-[36px] font-semibold">
            No video selected
          </div>

        ) : shouldShowError() ? (
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
              setErrorId(video.id);
            }}
          />

        ) : (video.platform === "vimeo") ? (

          <VimeoPlayer videoId={video.id}
            onError={(msg) => {
              setErrorMessage(msg);
              setErrorId(video.id.toString());
            }}
          />

        ) : (

          <UrlVideoPlayer
            src={video.url}
            setErrorMessage={setErrorMessage}
            setError={(errorId) => setErrorId(errorId)}
          />

        )}
      </div>
    </div>
    <div className="flex-shrink-0">
      {video && !shouldShowError() && <VideoToolBar />}  </div> 
    </div>
  );

};
export default VideoPlayer;