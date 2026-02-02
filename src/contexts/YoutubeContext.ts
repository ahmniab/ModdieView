import { createContext } from "react";
import type { YoutubeVideo } from "../modules/types";
import { useQuery } from "@tanstack/react-query";
import { youtubeSearch } from "../network/searchOnYoutube";

type YoutubeContextType = {
    useYoutubeSearch: (query: string) => {
        data: YoutubeVideo[] | undefined;
        isLoading: boolean;
        isError: boolean;
    };
};

const YoutubeContext = createContext<YoutubeContextType>({
    useYoutubeSearch: (query: string) => {
        const { data, isLoading, isError } = useQuery<YoutubeVideo[]>({
        queryKey: ["youtubeSearch", query],
        queryFn: async () => {
            return await youtubeSearch(query);
        },
        enabled: query.length > 0,
        });
        return { data, isLoading, isError };
    },
});
export default YoutubeContext;