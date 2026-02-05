import MessageReactions from "./MessageReactions";
import { useState } from "react";
import ReactionPicker from "./ReactionPicker";
import type { Emoji } from "../../types";
import MessageActions from "./MessageActions";
import { copyToClipboard } from "../../utils/copyToClipboard";
import toast from "react-hot-toast";

interface MessageOptionsProps {
  messageText: string;
  onReact: (emoji: Emoji) => void;
  selectedEmoji?: Emoji | null;
  isOwn: boolean;
  onClose: () => void;
}

const MessageOptions = ({ onReact, selectedEmoji, isOwn, messageText, onClose }: MessageOptionsProps) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className={`absolute top-full bg-gray-900 rounded-xl z-50  ${
          isOwn ? "right-2" : "left-2"
        } `}
        onClick={(e) => e.stopPropagation()}
    >

      <div
      >
        {!showPicker ? (
          <>

            <MessageReactions
              onSelect={(emoji) => {
                onReact(emoji);
                onClose();
              }}
              onOpenPicker={() => setShowPicker(true)}
              selectedEmoji={selectedEmoji}
            />

            <MessageActions
            onCopy={async () => { const success = await copyToClipboard(messageText);
              if (success) {
                toast.success("Copied");
              }
              onClose();
            }}
            />

          </>
        ) : (
          <ReactionPicker
            onEmojiSelect={(emoji) => {
              onReact(emoji);
              setShowPicker(false);
              onClose();
            }}
          />
        )}

      </div>
    </div>
  );
};

export default MessageOptions;