import { createContext } from "react";
import type { YoutubeVideo } from "../types";
import useYoutubeSearch from "../hooks/useYoutubeSearch"

type YoutubeContextType = {
    useYoutubeSearch: (query: string) => {
        data: YoutubeVideo[] | undefined;
        isLoading: boolean;
        isError: boolean;
    };
};

const YoutubeContext = createContext<YoutubeContextType>({
    useYoutubeSearch: useYoutubeSearch
});
export default YoutubeContext;