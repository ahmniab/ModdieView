import SearchTextBox from "./SearchTextBox";
import { useState, useContext, useEffect, useRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import YoutubeContext from "../../contexts/YoutubeContext";
import SearchResults from "./SearchResults";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { YoutubeVideo } from "@/types";
import { extractVideoUrl } from "@/utils/video";
import { useRoom } from "@/contexts/RoomContext";

const SearchBar = () => {
  const { changeRoomContent } = useRoom();

  const [search, setSearch] = useState("");
  const [shouldShowResults, setShouldShowResults] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const onActiveIndexChange = (activeIndex: number) =>{
    setActiveIndex(activeIndex);
  }
  const debouncedSearch = useDebounce(search, 300);
  const { useYoutubeSearch } = useContext(YoutubeContext);
  const { data, isLoading, isError } = useYoutubeSearch(debouncedSearch);
  const trimmed = search.trim();
  const video = extractVideoUrl(trimmed);
  const usingKeyboard = useRef(false);
  useEffect(() => {
  const handleMouseMove = () => {
    usingKeyboard.current = false;
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = () => {
    if (!trimmed) return;

    if (video) {
      changeRoomContent(video);
    } else if (data?.length) {
      handleSelect(data[0]);
    }
    setSearch("");
    setShouldShowResults(false);
  };

  const handleSelect = (v: YoutubeVideo) => {
    changeRoomContent({
      ...v,
      platform: "youtube",
      videoTime: 0,
      isPlaying: false,
      lastTimePlayed: Date.now(),
      playbackRate: 1
    });

    setSearch("");
    setShouldShowResults(false);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setShouldShowResults(false));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement;
        if ( target && 
            (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable) &&
            !containerRef.current?.contains(target)
      ){ return;}
      if (e.key === "Enter") {
        e.preventDefault();

        if (activeIndex >= 0 && data) {
          handleSelect(data[activeIndex]);
        } else {
          handleSubmit();
        }

        return;
      }

      if (!shouldShowResults || !data?.length) return;

      if (e.key === "ArrowDown") {
        usingKeyboard.current = true;
        e.preventDefault();
        setActiveIndex((prev) =>
          prev === data.length - 1 ? -1 : prev + 1
        );
      }

      if (e.key === "ArrowUp") {
        usingKeyboard.current = true;
        e.preventDefault();
        setActiveIndex((prev) => (prev <= 0 ? -1 : prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [data, activeIndex, shouldShowResults]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [search]);

  useEffect(() => {
    setShouldShowResults(Boolean(trimmed));
  }, [trimmed]);

  return (
    <div className="max-w-md mx-auto" ref={containerRef}>
      <SearchTextBox
        search={search}
        setSearch={setSearch}
        onEnter={() => {
          if (activeIndex >= 0 && data) {
            handleSelect(data[activeIndex]);
          } else {
            handleSubmit();
          }
        }}
      />

      {shouldShowResults && (
        <SearchResults
          videos={data}
          isLoading={isLoading}
          isError={isError}
          activeIndex={activeIndex}
          onActiveIndexChange={onActiveIndexChange}
          onSelect={handleSelect}
          usingKeyboard={usingKeyboard}
        />
      )}
    </div>
  );
};

export default SearchBar;