import RC from "react";
import { LiaSearchSolid } from "react-icons/lia";
import { HiOutlineX } from "react-icons/hi";
import { useCallback } from "react";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import { useRef } from "react";

const SearchTextBox: RC.FC<{
    search: string;
    setSearch: (value: string) => void;
    onEnter: () => void;
}> = ({search, setSearch, onEnter}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleKeyboardShortcut = useCallback(() => {
        inputRef.current?.focus();
      }, []);
    useKeyboardShortcut({
        shortcutKeys: ["s"],
        callback: handleKeyboardShortcut
    });
    return (
        <div className='w-[330px] h-11 sm:w-[390px] sm:h-10 md:w-[320px] md:h-10 lg:w-[360px] lg:h-8 bg-gray-600 border border-black rounded-2xl p-4 flex items-center gap-2 outline-none cursor-pointer'>
            <LiaSearchSolid className="size-7 sm:size-6"/>
            <input 
                type="text"
                ref= {inputRef}
                placeholder='Enter a link or search YouTube'
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        onEnter();
                        inputRef.current?.blur();
                    }
                }}
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                className='w-full rounded-lg focus:outline-none
                focus:border-transparent'>
            </input>

            <button onClick={() => setSearch("")}
            className='cursor-pointer'><HiOutlineX size={18}/></button>
        </div>
    );
}
export default SearchTextBox;