import React from 'react'
import { BsPersonLinesFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import roomLogo from "../../assets/roomLogo.png";
import { ImExit } from "react-icons/im";
import SearchBar from '../SearchBar';
import { IoLink } from "react-icons/io5";

const RoomHeader = () => {
  return (
    <div className="relative w-full h-14 flex items-center px-6 py-4 bg-gradient-to-r from-gray-900 to-purple-900 sticky top-0">

        <div className='flex gap-3 items-center'>
            <BsPersonLinesFill size={28} className='cursor-pointer'/>
            <div className='flex items-center'>
                <Link to='/'>
                    <img src={roomLogo} alt="ModdieView Logo" title='ModdieView' className='w-auto h-8'></img>
                </Link>
                <input type="text" placeholder='randomRoom' title='Room name' className='w-200 text-xl  text-yellow-500 font-semibold focus:outline-none p-1'></input>
            </div>
        </div>

        <SearchBar/>

        <div className='absolute right-0 pr-5 flex gap-5 justify-center items-center'>
            <div className='cursor-pointer ' title='Copy'><IoLink size={30}/></div>
            <Link to="/"
                title="Exit"
                className='cursor-pointer'>
                <ImExit size={23}/>
            </Link>
        </div>

    </div>
  )
}

export default RoomHeader