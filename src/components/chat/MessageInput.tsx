import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { MdInsertEmoticon } from "react-icons/md";
import ReactionPicker from "./ReactionPicker";
import { useRef } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="relative p-3 border-t border-gray-700 flex items-center gap-2">
      <div className="flex-1 flex items-center bg-gray-700 rounded-xl px-3 py-2">

        <input
          placeholder="Send a message..."
          ref={inputRef}
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
              if (!inputRef.current) return;

              const input = inputRef.current;
              const start = input.selectionStart ?? input.value.length;
              const end = input.selectionEnd ?? input.value.length;

              setInput((prev) => {
                const newValue =
                  prev.slice(0, start) + emoji + prev.slice(end);

                requestAnimationFrame(() => {
                  input.focus();
                  const cursorPos = start + emoji.length;
                  input.setSelectionRange(cursorPos, cursorPos);
                });
                return newValue;
              });
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
