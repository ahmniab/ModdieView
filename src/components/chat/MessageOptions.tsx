import MessageReactions from "./MessageReactions";
import { useLayoutEffect, useState } from "react";
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
  chatHeaderHeight: number;
  anchorRef: React.RefObject<HTMLDivElement>;
}

const MessageOptions = ({ onReact, selectedEmoji, isOwn, messageText, onClose, onReply, chatHeaderHeight, anchorRef }: MessageOptionsProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, onClose);
  const [openUpwards, setOpenUpwards] = useState(false);

  useLayoutEffect(() => {
    const anchorEl = anchorRef.current;
    const floatingEl = containerRef.current;
    if (!anchorEl || !floatingEl) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const floatingHeight = showPicker ? 360 : 220;

    const spaceBelow = window.innerHeight - anchorRect.bottom;
    const spaceAbove = anchorRect.top - chatHeaderHeight;

    if (spaceBelow >= floatingHeight) {
      setOpenUpwards(false);
    } else if (spaceAbove >= floatingHeight) {
      setOpenUpwards(true);
    } else {
      setOpenUpwards(spaceAbove > spaceBelow);
    }
  }, [showPicker, chatHeaderHeight]);


  return (
    <div 
      ref={containerRef}
      onMouseDown={(e) => e.stopPropagation()}
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
              if (success) {toast.success("Copied", {toasterId: "chat-toaster"});};
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