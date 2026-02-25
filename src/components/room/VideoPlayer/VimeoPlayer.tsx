import { useVimeoPlayer } from "@/hooks";
import { useRef } from "react";

interface VimeoPlayerProps {
    videoId: number;
    onError?: (msg: string) => void;
}

const VimeoPlayer = ({ videoId, onError }: VimeoPlayerProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(new HTMLIFrameElement());
    useVimeoPlayer(iframeRef, videoId, onError);
    const videoUrl = `https://player.vimeo.com/video/${videoId}?autoplay=0&loop=1&autopause=0&muted=0&color=ffffff&portrait=0&controls=1`;
  return (
    <iframe
      ref={iframeRef}
      src={videoUrl}
      width="100%"
      height="100%"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      title="Vimeo Player"
    >
      
    </iframe>
  )
}

export default VimeoPlayer