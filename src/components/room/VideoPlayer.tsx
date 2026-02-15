import YouTube from "react-youtube";
  
interface VideoPlayerProps {
  videoId: string;
  userName: string;
}

const VideoPlayer = ({ videoId}: VideoPlayerProps) => {
  return (
  <div className="flex-1 flex items-center justify-center bg-gray-900">
    <div className="w-[90%] h-[80%] rounded-lg bg-black border border-gray-700 overflow-hidden">
        <YouTube
          videoId={videoId}
          iframeClassName="w-full h-full"
          className="h-full w-full"
          opts={{
          width: "100%",
          height: "100%",
          playerVars: {
          autoplay: 0,
          controls: 1,
          },
          }}
        />
      </div>
  </div>

  );

};
export default VideoPlayer;