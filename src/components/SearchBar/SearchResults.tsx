import RC from "react";
import type { YoutubeVideo } from "../../modules/types";
import SearchItem from "./SearchItem";

type SearchResultsProps = {
    videos: YoutubeVideo[]|undefined;
    isLoading: boolean;
    isError: boolean;
    onSelect: (video: YoutubeVideo) => void;
}

const SearchResults: RC.FC<SearchResultsProps> = ({videos, isLoading, isError, onSelect}) => {
    return (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[600px] max-h-96 overflow-y-auto bg-gray-700 border border-black rounded-lg p-4">
            
            { isLoading ? (
                    <p className="text-gray-400">Loading...</p>
                ) : isError ? (
                    <p className="text-red-500">Error fetching results.</p>
                ) : videos && videos.length > 0 ? (
                        videos.map((video) => (
                            <SearchItem 
                                key={video.id} 
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