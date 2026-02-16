import { default as YouTubePlayer } from "../VideoPlayer/YouTubePlayer";
import { extractVideoUrl, getYouTubeErrorMessage } from "@/utils";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import { default as VimeoPlayer} from "./VimeoPlayer";

  
interface VideoPlayerProps {
  video: string;
  userName: string;
}

const VideoPlayer = ({ video}: VideoPlayerProps) => {
  const extractedVideo = extractVideoUrl(video);
  const [ error, setError ] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-900">
      <div className="w-[90%] h-[80%] rounded-lg bg-black border border-gray-700 overflow-hidden">

        { !extractedVideo || error ? (
          <div className="h-full w-full flex-1 flex items-center justify-center flex-col">
            <div className="text-red-500 text-[50px] font-semibold flex items-center justify-center">
              <MdErrorOutline className="inline mr-2" size={50} />Error
            </div>
            <div className="text-white/60 text-lg mt-4 font-medium">
              {errorMessage || "Invalid video. Please check the URL and try again." } 
            </div>
          </div>

        ) : ( "platform" in extractedVideo ? (
              ( extractedVideo.platform === "youtube") ? (

                <YouTubePlayer id={extractedVideo.id} 
                  onError={(msg) => {
                    setErrorMessage(msg);
                    setError(true);
                  }}
                />)
                :(
                  
                  <VimeoPlayer videoId={extractedVideo.id} 
                  onError={(msg) => {
                    setErrorMessage(msg);
                    setError(true);
                  }} />
                ))
                : (
                  <video
                    src={extractedVideo.url}
                    controls
                    onError={(e) => {
                      const mediaError = (e.currentTarget as HTMLVideoElement).error;
                      setErrorMessage(mediaError?.message || "Unknown error occurred");
                      setError(true);
                    }}
                    className="w-full h-full cursor-pointer"
                  />
          ))}
      </div>
  </div>

  );

};
export default VideoPlayer;