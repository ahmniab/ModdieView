import React from "react";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: string[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      {messages.map((msg, index) => (
        <MessageItem key={index} message={msg} isOwn={true}/>
      ))}
    </div>
  );
};

export default MessageList;