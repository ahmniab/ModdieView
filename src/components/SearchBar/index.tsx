import SearchTextBox from './SearchTextBox';
import { useState, useContext, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import YoutubeContext from '../../contexts/YoutubeContext';
import SearchResults from './SearchResults';

const SearchBar = () => {
    const [search, setSearch] = useState<string>("");
    const [shouldShowResults, setShouldShowResults] = useState<boolean>(true);
    const debouncedSearch = useDebounce(search, 300);
    const { useYoutubeSearch } = useContext(YoutubeContext);
    const { data, isLoading, isError } = useYoutubeSearch(debouncedSearch);

    useEffect(() => {
        if (search.trim() === "") {
            setShouldShowResults(false);
        } else {
            setShouldShowResults(true);
        }
    }, [search]);

    return (
        <>
            <SearchTextBox search={search} setSearch={setSearch} />
            {shouldShowResults && <SearchResults 
                videos={data} 
                isLoading={isLoading} 
                isError={isError} 
                onSelect={(v) => { console.log(v); setSearch(""); setShouldShowResults(false); }}
            />}
        </>
    )
}

export default SearchBar
