import RC from "react";
import { LiaSearchSolid } from "react-icons/lia";
import { HiOutlineX } from "react-icons/hi";

const SearchTextBox: RC.FC<{
    search: string;
    setSearch: (value: string) => void;
}> = ({search, setSearch}) => {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className='w-[390px] h-8 bg-gray-600 border border-black rounded-2xl p-4 flex items-center gap-2 outline-none cursor-pointer'>
                <LiaSearchSolid size={20}/>
                <input 
                type="text"
                placeholder='Serach'
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                className='w-full rounded-lg focus:outline-none
                focus:border-transparent'></input>

                <button onClick={() => setSearch("")}
                className='cursor-pointer'><HiOutlineX size={18}/></button>
            </div>
        </div>
    );
}
export default SearchTextBox;