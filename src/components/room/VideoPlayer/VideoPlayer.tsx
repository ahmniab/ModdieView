import { default as YouTubePlayer } from "../VideoPlayer/YouTubePlayer";
import { extractVideoUrl } from "@/utils";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import { default as VimeoPlayer} from "./VimeoPlayer";
import UrlVideoPlayer from "./UrlVideoPlayer";
import VideoToolBar from "./VideoToolBar";

  
interface VideoPlayerProps {
  video: string;
  userName: string;
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const extractedVideo = extractVideoUrl(video);
 const [ error, setError ] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorVideoId, setErrorVideoId] = useState<string | null>(null);
  const hasError = errorVideoId === video;  


  return (
      <div className="w-full h-full bg-black sm:w-full sm:h-full md:w-[95%] md:h-[70%] lg:w-[90%] lg:h-[80%]
      border border-gray-700 overflow-hidden  relative flex flex-col">

        <div className="flex-1 min-h-0">
        { !extractedVideo || hasError ? (
          <div className="h-full w-full flex-1 flex items-center justify-center flex-col">
            <div className="text-red-500 text-[36px] sm:text-[50px] font-semibold flex items-center justify-center">
              <MdErrorOutline className="inline size-10 sm:size-14 mr-2"/>Error
            </div>
            <div className="text-white/60 text-sm sm:text-lg mt-1 sm:mt-2 md:mt-3 lg:mt-4 font-medium text-center">
              {errorMessage || "Invalid video. Please check the URL and try again." } 
            </div>
          </div>

        ) : ( "platform" in extractedVideo ? (
              ( extractedVideo.platform === "youtube") ? (

                <YouTubePlayer id={extractedVideo.id} 
                  onError={(msg) => {
                    setErrorMessage(msg);
                    setErrorVideoId(video);
                  }}
                />)
                :(
                  
                  <VimeoPlayer videoId={extractedVideo.id} 
                  onError={(msg) => {
                    setErrorMessage(msg);
                    setErrorVideoId(video);
                  }} />
                ))
                : (
                  <UrlVideoPlayer 
                    src={extractedVideo.url}
                    setErrorMessage={setErrorMessage}
                    setError={setError}
                  />
          ))}
          </div>
          <VideoToolBar />
      </div>
  );

};
export default VideoPlayer;