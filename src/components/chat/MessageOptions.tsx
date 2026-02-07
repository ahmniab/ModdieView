import MessageReactions from "./MessageReactions";
import { useEffect, useState } from "react";
import ReactionPicker from "./ReactionPicker";
import type { Emoji } from "../../types";
import MessageActions from "./MessageActions";
import { copyToClipboard } from "../../utils/copyToClipboard";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

interface MessageOptionsProps {
  messageText: string;
  onReact: (emoji: Emoji) => void;
  selectedEmoji?: Emoji | null;
  isOwn: boolean;
  onClose: () => void;
  onReply: () => void;
}

const MessageOptions = ({ onReact, selectedEmoji, isOwn, messageText, onClose, onReply }: MessageOptionsProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, onClose);
  const [openUpwards, setOpenUpwards] = useState(false);

  useEffect(() => {
  const el = containerRef.current;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  setOpenUpwards(spaceBelow < 200 && spaceAbove > spaceBelow);
  }, []);


  return (
    <div 
      ref={containerRef}
      className={`absolute bg-gray-900 rounded-xl z-50
        ${
          isOwn ? "right-2" : "left-2"
        } ${openUpwards ? "bottom-full mb-1" : "top-full mt-1"}`}
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
            onReply={() => {
              onReply();
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