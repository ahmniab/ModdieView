import SearchTextBox from './SearchTextBox';
import { useState, useContext, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import YoutubeContext from '../../contexts/YoutubeContext';
import SearchResults from './SearchResults';

const SearchBar = ({ video } : { video : (url: string) => void}) => {
    const [search, setSearch] = useState<string>("");
    const [shouldShowResults, setShouldShowResults] = useState<boolean>(true);
    const debouncedSearch = useDebounce(search, 300);
    const { useYoutubeSearch } = useContext(YoutubeContext);
    const { data, isLoading, isError } = useYoutubeSearch(debouncedSearch);
    const trimmed = search.trim();
    const handleSubmit = () => {
        if (!trimmed) return;
        if (trimmed.startsWith("http")) {
            video(trimmed);
        }
        setSearch("");
        setShouldShowResults(false);
    };

    useEffect(() => {
        if (!trimmed) {
            setShouldShowResults(false);
        } else {
            setShouldShowResults(true);
        }
    }, [search]);

    return (
        <div className="max-w-md mx-auto">
            <SearchTextBox search={search} setSearch={setSearch} onSubmit={handleSubmit}/>
            {shouldShowResults && <SearchResults
                videos={data} 
                isLoading={isLoading} 
                isError={isError} 
                onSelect={(v) => { 
                    video(`https://www.youtube.com/watch?v=${v.id}`);
                    setSearch(""); 
                    setShouldShowResults(false); 
                }}
            />}
        </div>
    )
}

export default SearchBar
