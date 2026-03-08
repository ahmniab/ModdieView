import SearchTextBox from './SearchTextBox';
import { useState, useContext, useEffect, useRef } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import YoutubeContext from '../../contexts/YoutubeContext';
import SearchResults from './SearchResults';
import { useClickOutside } from "@/hooks/useClickOutside";
import type { YoutubeVideo } from '@/types';

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
    const handleSelect = (v : YoutubeVideo) => {
        video(`https://www.youtube.com/watch?v=${v.id}`);
        setSearch(""); 
        setShouldShowResults(false); 
    };
    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside(containerRef, () => setShouldShowResults(false));
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!shouldShowResults || !data?.length) return;

            if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => ( prev == data.length-1? -1 : prev+1));
            }

            if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) =>
                (prev <= 0 ? - 1 : prev - 1)
        );
    }
    
            if (e.key === "Enter" && activeIndex >= 0) {
                e.preventDefault();
                handleSelect(data[activeIndex]);
            }
    };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [data, activeIndex, shouldShowResults]);

    useEffect(() => {
        setActiveIndex(-1);
    }, [search]);

    useEffect(() => {
        if (!trimmed) {
            setShouldShowResults(false);
        } else {
            setShouldShowResults(true);
        }
    }, [search]);

    return (
        <div className="max-w-md mx-auto" ref={containerRef}>
            <SearchTextBox search={search} setSearch={setSearch}
            onEnter={() => {
                if (activeIndex >= 0 && data) {
                    handleSelect(data[activeIndex]);
                } else {
                    handleSubmit();
                }}}
            />
            {shouldShowResults && <SearchResults
                videos={data} 
                isLoading={isLoading} 
                isError={isError}
                activeIndex={activeIndex}
                onSelect={handleSelect}
            />}
        </div>
    )
}

export default SearchBar
