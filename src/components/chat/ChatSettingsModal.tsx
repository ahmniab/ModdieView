import React, { useRef } from 'react'
import { HiOutlineX } from "react-icons/hi";
import { useClickOutside } from "../../hooks/useClickOutside";

interface ChatSettingsModalProps {
    onCloseChat: () => void;
    onCloseSettings: () => void;
}

const ChatSettingsModal = ({ onCloseChat, onCloseSettings }: ChatSettingsModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside(containerRef, onCloseSettings);
  
  return (
    <div ref={containerRef}
     className='absolute top-[58px] bg-gray-900 right-2 rounded-lg p-2 z-50 flex flex-col gap-1 text-nowrap text-[15px]'>
        <button className="flex pr-20 p-1 hover:bg-gray-700 rounded cursor-pointer gap-1 items-center" type="button" title="Close chat" onClick={() => onCloseChat()}>
        <HiOutlineX size={20} className="inline mr-2" />
          Close chat

        </button>
    </div>
  )
}

export default ChatSettingsModal
