import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { MdInsertEmoticon } from "react-icons/md";
import ReactionPicker from "./ReactionPicker";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="p-3 border-t border-gray-700 flex items-center gap-2">
      <div className="relative flex-1 flex items-center bg-gray-700 rounded-xl px-3 py-2">

        <input
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="w-full text-white outline-none bg-transparent"
        />

        <button type="button" className="cursor-pointer" onClick={() => setShowEmoji((prev) => !prev)} title="Emoji">
          <MdInsertEmoticon size={20} />
        </button>

        {showEmoji && (
          <ReactionPicker
            onEmojiSelect={(emoji) => {
            setInput((prev) => prev + emoji);
            setShowEmoji(false);
            }}
          />
        )}

      </div>

      <button
        type="submit"
        onClick={handleSend}
        title="Send"
        className="p-2.5 rounded bg-purple-800 hover:bg-purple-700 transition text-white cursor-pointer"
      >
        <IoSend size={20} />
      </button>
    </div>
  );
};

export default MessageInput;
