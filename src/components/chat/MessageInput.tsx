import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { MdInsertEmoticon } from "react-icons/md";
import ReactionPicker from "./ReactionPicker";
import { useRef } from "react";
import { BsFillReplyAllFill } from "react-icons/bs";
import { HiOutlineX } from "react-icons/hi";


interface MessageInputProps {
  onSend: (message: string, replyTo?: { id: string; text: string }) => void;
  replyTo?: { id: string; text: string } | null;
  senderName: string;
  onCancelReply: () => void;
}

const MessageInput = ({ onSend, replyTo, senderName, onCancelReply }: MessageInputProps) => {
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    // <div className="border-t border-gray-700">
      <div className="relative p-3 border-t border-gray-700 flex items-end gap-2">
        <div className="flex-1 flex flex-col bg-gray-700 rounded-xl px-3 py-2 gap-2">
          {replyTo && (
            <div className="relative flex flex-col bg-black/20 text-sm px-2 py-1 rounded mb-1 border-l-4 border-white">
              <div className="flex items-center">
                <BsFillReplyAllFill size={17} className="inline mr-2" />
                <div className="font-semibold">{senderName}</div>
                <button
                  type="button"
                  title="Cancel Reply"
                  onClick={onCancelReply}
                  className="opacity-70 hover:opacity-100 absolute right-2 top-1 cursor-pointer"
                >
                  <HiOutlineX size={18} />
                </button>
              </div>
              <span className="truncate">
                {replyTo.text}
              </span>
            </div>

          )}

          <div className="flex items-center gap-2">

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
                className="absolute bottom-14 right-0 p-3"
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
      // </div>
    );
  };

 export default MessageInput;
