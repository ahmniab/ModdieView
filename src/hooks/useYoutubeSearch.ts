import type { YoutubeVideo } from "../types";
import { useQuery } from "@tanstack/react-query";
import { youtubeSearch } from "../network/searchOnYoutube";

const useYoutubeSearch = (query: string) => {
    const useQueryResult = useQuery<YoutubeVideo[]>({
        queryKey: ["youtubeSearch", query],
        queryFn: async () => {
            return await youtubeSearch(query);
        },
        enabled: query.length > 0
    });
    return useQueryResult;
}
export default useYoutubeSearch;