import React, { useState } from "react";
import { useClickOutside } from "@/hooks";
import { useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ShortcutsList from "../ShortcutsList";
import { IoIosArrowDown } from "react-icons/io";

interface SettingsModalProps {
  onClose: () => void;
  toggleUsersPanel: () => void;
  showUsersPanel:boolean;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  toggleUsersPanel,
  showUsersPanel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, onClose);
  const [showShortcutsList, setShortcutsList] = useState(false);
  return (
    <div className="absolute left-2 top-14 bg-gray-800 flex items-center justify-center z-[50] rounded-b-xl" 
    ref={containerRef}>
      <div className="w-[300px] h-[400px] px-6 py-4 shadow-lg overflow-y-auto custom-scroll">

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">General</h2>
          <div className="px-2 flex flex-col text-md">
            <div className="flex justify-between items-center py-2 text-left">
              <div>Shortcuts</div>
              <button className="size-5 text-gray-400 cursor-pointer" 
                onClick={() => setShortcutsList((prev) => !prev) }
                > {showShortcutsList? <IoIosArrowForward/> : <IoIosArrowDown/>}</button>
              </div>
              {showShortcutsList && (
                  <ShortcutsList/>
              )}
            </div>
          </div>
        <div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Room</h2>
          <div className="flex justify-between">
          <span
            
            className="px-2 flex flex-col text-md"> Show Users Panel
          </span>
          <kbd className={`bg-gray-700 w-[35px] h-[25px] rounded cursor-pointer flex items-center justify-center ${showUsersPanel? "text-white" : "text-gray-400"}`}
            onClick={() => {
            toggleUsersPanel();
          }}>
            {showUsersPanel ? "on" : "off"}
          </kbd>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  );
};

export default SettingsModal;