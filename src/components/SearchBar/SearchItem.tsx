import type { YoutubeVideo } from "@/types/YoutubeVideo";
import RC, { useEffect, useRef } from "react";

const SearchItem: RC.FC<{video: YoutubeVideo; onClick: (video: YoutubeVideo) => void; active: boolean}> = ({video, onClick, active}) => {
    const activeItemRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (active) {
            activeItemRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });}
    }, [active]);
    return (
        <div ref={activeItemRef} className={`flex gap-4 mb-4 cursor-pointer p-2 zcursor-pointer ${active ? "bg-gray-800/80" : ""}`}
            title={video.title}
            onClick={() => {
                onClick(video);
            }}
        >
            <img 
                src={video.thumbnail.url} 
                alt={video.title} 
                className="w-25 h-20 rounded-lg aspect-video object-cover bg-gray-400"
            />
            <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">{video.title}</h3>
                <p className="text-xs text-gray-400">{video.description}</p>
            </div>
        </div>
    );
}
export default SearchItem;