import React from "react";

interface MessageItemProps {
  message: string;
  isOwn: boolean;
}

const MessageItem = ({ message, isOwn }: MessageItemProps) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`relative px-4 py-2 rounded-2xl max-w-[70%] text-white break-words ${
          isOwn ? "bg-purple-700" : "bg-gray-600"
        }`}
      >

        <span
          className={`absolute top-[-1px] w-4 h-4 ${
            isOwn ? "right-[0.2px] bg-purple-700" : "left-[0.2px] bg-gray-600"
          }`}
          style={{
            clipPath: isOwn
              ? "polygon(0 10%, 100% 0%, 100% 100%)"
              : "polygon(0 100%, 100% 10%, 0 0)",
          }}
        />

        {message}
      </div>
    </div>
  );
};

export default MessageItem;
