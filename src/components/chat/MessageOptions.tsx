import MessageReactions from "./MessageReactions";
import { useState } from "react";
import ReactionPicker from "./ReactionPicker";
import type { Emoji } from "../../types";

interface MessageOptionsProps {
  onReact: (emoji: Emoji) => void;
  selectedEmoji?: Emoji | null;
  isOwn: boolean;
}

const MessageOptions = ({ onReact, selectedEmoji, isOwn }: MessageOptionsProps) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div
      className={`absolute top-10 bg-gray-900 rounded-xl p-2 z-50 ${
                isOwn
                  ? "right-2"
                  : "left-2"
              }`}
      onClick={(e) => e.stopPropagation()}
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
  );
};

export default MessageOptions;