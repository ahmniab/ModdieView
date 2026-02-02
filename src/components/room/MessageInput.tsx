import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { MdInsertEmoticon } from "react-icons/md";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="p-3 border-t border-gray-700 flex items-center gap-2">
      <div className="flex-1 flex items-center bg-gray-700 rounded-xl px-3 py-2">
        <input
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full text-white outline-none bg-transparent"
        />
        <button>
          <MdInsertEmoticon size={20} />
        </button>
      </div>

      <button
        onClick={handleSend}
        className="p-2.5 rounded bg-purple-800 hover:bg-purple-700 transition text-white"
      >
        <IoSend size={20} />
      </button>
    </div>
  );
};

export default MessageInput;