import type { YoutubeVideo } from "@/types/YoutubeVideo";
import RC from "react";

const SearchItem: RC.FC<{video: YoutubeVideo; onClick: (video: YoutubeVideo) => void}> = ({video, onClick}) => {
    return (
        <div className="flex gap-4 mb-4 cursor-pointer"
            onClick={(e) => {
                onClick(video);
            }}
        >
            <img 
                src={video.thumbnail.url} 
                alt={video.title} 
                
                className="w-32 h-20 object-cover rounded-lg"
            />
            <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">{video.title}</h3>
                <p className="text-xs text-gray-400">{video.description}</p>
            </div>
        </div>
    );
}
export default SearchItem;