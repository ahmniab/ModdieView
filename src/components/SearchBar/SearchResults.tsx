import RC from "react";
import type { YoutubeVideo } from "@/types/YoutubeVideo";
import SearchItem from "./SearchItem";

type SearchResultsProps = {
    videos: YoutubeVideo[]|undefined;
    isLoading: boolean;
    isError: boolean;
    onSelect: (video: YoutubeVideo) => void;
    activeIndex: number;
}

const SearchResults: RC.FC<SearchResultsProps> = ({videos, isLoading, isError, onSelect, activeIndex}) => {
    return (
        <div className="sm:w-[390px] w-[330px] md:absolute md:top-full md:left-1/2 md:w-[400px] md:-translate-x-1/2  max-h-96 lg:w-[500px] overflow-y-auto bg-gray-700 border border-black rounded-lg p-4 mt-2 shadow-lg z-[100]">
            
            { isLoading ? (
                    <p className="text-gray-400">Loading...</p>
                ) : isError ? (
                    <p className="text-red-500">Error fetching results.</p>
                ) : videos && videos.length > 0 ? (
                        videos.map((video, index) => (
                            <SearchItem 
                                key={video.id}
                                active={index === activeIndex}
                                video={video} 
                                onClick={(v) => onSelect(v)}
                            />
                        ))
                ) : (
                    <p className="text-gray-400">No results found.</p>
                )
            }
            {/* { videos && videos.length > 0 ? (
                videos.map((video) => (
                    <SearchItem key={video.id} video={video} />
                ))
            ) : (
                <p className="text-gray-400">No results found.</p>
            )} */}
        </div>
    );
}
export default SearchResults;