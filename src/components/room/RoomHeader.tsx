import { BsPersonLinesFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import roomLogo from "@/assets/roomLogo.png";
import { ImExit } from "react-icons/im";
import SearchBar from '../SearchBar';
import { IoLink } from "react-icons/io5";
import { copyToClipboard  } from "@/utils";
import { toast } from "react-hot-toast";
import { useRoom } from "@/contexts/RoomContext";
import { useEffect, useState, useCallback } from "react";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import SettingsModal from "./SettingsModal";

interface RoomHeaderPrpos {
    isBelowMd : boolean;
    roomLink: string;
    toggleUsersPanel: () => void;
    showUsersPanel: boolean;
}


const RoomHeader = ({ isBelowMd, roomLink, toggleUsersPanel, showUsersPanel }: RoomHeaderPrpos ) => {
  const { name, setRoomName } = useRoom();
  const [currentName, setCurrentName] = useState<string>(name);
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const handleKeyboardShortcut = useCallback(() => {
    navigate("/");
  }, [navigate]);

    useKeyboardShortcut({
    shortcutKeys: ["shift+q"],
    callback: handleKeyboardShortcut
    });

  useEffect(() => {
    if (name) {
      setCurrentName(name);
    }
  }, [name]);
  const handleNameChange = (newName: string) => {
    setCurrentName(newName);
  };

  return (
    <div className="relative w-full h-14 flex items-center px-3 py-4 sm:px-6 sm:py-4
     bg-gradient-to-r from-gray-900 to-purple-900 sticky top-0 z-50">

        <div className='relative flex gap-3 items-center'>
          {!isBelowMd &&
            <button className='cursor-pointer' title="Manage Profile"
              onMouseDown={(e) => {
                e.stopPropagation();
                setShowSettings((prev) => !prev);
            }}>
              <BsPersonLinesFill size={28}/>
            </button>
          }

          <div className='flex items-center'>
              <Link to='/'>
                  <img src={roomLogo} alt="ModdieView Logo" title='ModdieView' className='w-auto h-6 sm:h-8'></img>
              </Link>
              <input 
                  type="text" 
                  placeholder='Random Room' 
                  maxLength={20}
                  title='Room name' 
                  className='w-60 text-lg text-yellow-500 font-semibold 
                              focus:outline-none p-1 sm:text-xl md:text-base lg:text-xl' 
                  value={currentName} 
                  onChange={(e) => handleNameChange(e.target.value)} 
                  onBlur={() => {
                      setRoomName(currentName);                    
                  }}
              />
          </div>
        </div>

        {isBelowMd ? null : 
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <SearchBar/>
        </div>}

        <div className='absolute right-0 pr-2 sm:pr-5
         flex gap-4 sm:gap-5 justify-center items-center'>

            <button className='cursor-pointer ' title='Copy URL' type="button"
                onClick={ async () => {
                    const success = await copyToClipboard(roomLink);
                    if (success) { 
                        toast.success("Copied", { toasterId: "global-toaster" });
                    }   
                }}>
                {<IoLink size={30} />}
            </button>
            
            <Link to="/"
                title="Exit (shift+q)"
                className='cursor-pointer'>
                <ImExit className="size-6 sm:size-6"/>
            </Link>
        </div>
        {showSettings && (
          <SettingsModal onClose={() => setShowSettings(false)} toggleUsersPanel={toggleUsersPanel} showUsersPanel={showUsersPanel}/>
        )}
    </div>
  )
}

export default RoomHeader