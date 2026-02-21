import { BsPersonLinesFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import roomLogo from "@/assets/roomLogo.png";
import { ImExit } from "react-icons/im";
import SearchBar from '../SearchBar';
import { IoLink } from "react-icons/io5";

const RoomHeader = ({ isBelowMd }: { isBelowMd: boolean }) => {
  return (
    <div className="relative w-full h-14 flex items-center px-3 py-4 sm:px-6 sm:py-4
     bg-gradient-to-r from-gray-900 to-purple-900 sticky top-0 z-50">

        <div className='flex gap-3 items-center'>
            <BsPersonLinesFill size={28} className='cursor-pointer'/>
            <div className='flex items-center'>
                <Link to='/'>
                    <img src={roomLogo} alt="ModdieView Logo" title='ModdieView' className='w-auto h-6 sm:h-8'></img>
                </Link>
                <input type="text" placeholder='randomRoom' title='Room name' className='w-60 text-lg text-yellow-500 font-semibold focus:outline-none p-1 sm:text-xl md:text-base lg:text-xl'></input>
            </div>
        </div>

        {isBelowMd ? null : 
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <SearchBar/>
        </div>}

        <div className='absolute right-0 pr-2 sm:pr-5
         flex gap-4 sm:gap-5 justify-center items-center'>
            <div className='cursor-pointer ' title='Copy'><IoLink size={30}/></div>
            <Link to="/"
                title="Exit"
                className='cursor-pointer'>
                <ImExit className="size-6 sm:size-6"/>
            </Link>
        </div>

    </div>
  )
}

export default RoomHeader