import React, { useState } from "react";
import YouTube from "react-youtube";
import { getYouTubeErrorMessage } from "@/utils";

interface YouTubePlayerProps {
  id: string;
  onError?: (msg: string) => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ id, onError }) => {
  const [error, setError] = useState(false);
  return (
    <YouTube
        videoId={id}
        onError={(e) => { 
            const errorMessage = getYouTubeErrorMessage(e.data);
            if (onError) {
                onError(errorMessage);
            }
            setError(true);
        }}
        iframeClassName="w-full h-full"
        className="h-full w-full"
        title="YouTube Video"
        opts={{
            width: "100%",
            height: "100%",
            playerVars: {
            autoplay: 0,
            controls: 1,
            },
        }}
    />
  );
};

export default YouTubePlayer;