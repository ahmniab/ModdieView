import MessageOptions from "./MessageOptions";
import type { Message } from "../../types";
import type { Emoji } from "../../types";
import { BsFillReplyAllFill } from "react-icons/bs";

interface MessageItemProps {
  message: Message;
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggleReaction: (id: string, emoji: Emoji) => void;
  onReply: (message: Message) => void;
}


const MessageItem = ({ message, isActive, onOpen, onClose, onToggleReaction, onReply }: MessageItemProps) => {  
  return (
    <div className={`flex ${ message.isOwn ? "justify-end" : "justify-start"} ${message.reactions.length > 0 ? "mb-7" : "mb-2"}`}>

      <div
        className={`relative px-2 py-2 rounded-xl max-w-[70%] overflow-visible text-white break-words ${
          message.isOwn ? "bg-purple-700" : "bg-gray-600"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (isActive) {
            onClose();
          } else {
            onOpen();
          }
        }}
      >

        <span
          className={`absolute top-[-1px] w-4 h-4 ${
            message.isOwn ? "right-[0.2px] bg-purple-700" : "left-[0.2px] bg-gray-600"
          }`}
          style={{
            clipPath: message.isOwn
              ? "polygon(0 10%, 100% 0%, 100% 100%)"
              : "polygon(0 100%, 100% 10%, 0 0)",
          }}
        />
        {message.replyTo && (
          <div className="flex flex-col text-sm bg-black/20 px-2 py-1 rounded mb-1 border-l-4 border-white">
            <div className="flex items-center">
              <BsFillReplyAllFill size={17} className="inline mr-2" />
              <div className="font-semibold">{message.senderName}</div>
            </div>
            <div className="truncate">
              {message.replyTo.text}
            </div>
          </div>
        )}

{message.text}

        {isActive && (
          <MessageOptions
            onReact={(emoji) => {
              onToggleReaction(message.id, emoji);
              onClose();
            }}
            selectedEmoji={message.reactions[0] ?? null}
            isOwn={message.isOwn}
            messageText={message.text}
            onClose={onClose}
            onReply={() => onReply(message)}
          />
        )}

        {message.reactions.length > 0 && (
          <div
            className={`absolute -bottom-5 flex gap-1 cursor-pointer ${
              message.isOwn ? "right-0" : "left-0"
            }`}
          >
            {message.reactions.map((r, i) => (
              <span
                key={i}
                className="bg-black/30 px-2 py-0.5 rounded-full text-sm whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleReaction(message.id, r);
                  onClose();
                }}
              >
                {r}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
