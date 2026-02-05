import MessageReactions from "./MessageReactions";
import { useState } from "react";
import ReactionPicker from "./ReactionPicker";
import type { Emoji } from "../../types";
import { MdReply } from "react-icons/md";
import { MdOutlineContentCopy } from "react-icons/md";import { MdDelete } from "react-icons/md";

interface MessageOptionsProps {
  onReact: (emoji: Emoji) => void;
  selectedEmoji?: Emoji | null;
  isOwn: boolean;
}

const MessageOptions = ({ onReact, selectedEmoji, isOwn }: MessageOptionsProps) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className={`absolute top-full bg-gray-900 rounded-xl z-50  ${
          isOwn ? "right-2" : "left-2"
        } `}
        onClick={(e) => e.stopPropagation()}
    >

      <div className={`border border-gray-700 rounded-lg ${showPicker ? "p-0" : "p-2"}`}
      >
        {!showPicker ? (
          <MessageReactions
            onSelect={(emoji) => onReact(emoji)}
            onOpenPicker={() => setShowPicker(true)}
            selectedEmoji={selectedEmoji}
          />
        ) : (
          <ReactionPicker
            onEmojiSelect={(emoji) => {
              onReact(emoji);
              setShowPicker(false);
            }}
          />
        )}

      </div>
      <div className="flex flex-col items-start gap-2 text-white p-2 rounded-b-xl  border-box text-[16px]">
        <button type="button" className="w-full flex items-center gap-3 text-left cursor-pointer hover:bg-gray-700" title="Reply">
          <MdReply  size={22} /> Reply
        </button>

        <button type="button" className="w-full flex items-center gap-3 text-left cursor-pointer hover:bg-gray-700" title="Copy">
          <MdOutlineContentCopy  size={20} /> Copy
        </button>

        <button type="button" className="w-full flex items-center gap-3 text-left cursor-pointer hover:bg-gray-700" title="Delete">
          <MdDelete  size={22} /> Delete
        </button>

      </div>
    </div>
  );
};

export default MessageOptions;