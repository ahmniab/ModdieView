import { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { MdInsertEmoticon } from "react-icons/md";

interface ChatPanelProps {
  width: number;
}

const ChatPanel = ({ width } : ChatPanelProps) => {
  return (
    <div className="bg-gray-800 flex flex-col border-l border-gray-700 shrink-0"
    style={{width, minWidth: 280}}>

        <div className="p-3 border-b border-gray-700 flex justify-between items-center">
            <span className="font-semibold">Start Conversation</span>

            <button className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            <SlOptions />
            </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
      </div>

        <div className="p-3 border-t border-gray-700 flex items-center gap-2">
            <div className="flex-1 flex items-center justify-center bg-gray-700 rounded-xl px-3 py-2">
        <input
                placeholder="Send a message..."
                className="
                    w-full
                    text-white
                    outline-none
                "
        />
                <button className="cursor-pointer">
                    <MdInsertEmoticon size={20}/>
                </button>
            </div>

            <button
            title="Send"
            className="
                p-2.5
                rounded
                bg-purple-800
                hover:bg-purple-700
                transition
                text-white
                cursor-pointer
            "
            >
            <IoSend size={20} />
            </button>
      </div>

    </div>

  );
};

export default ChatPanel;