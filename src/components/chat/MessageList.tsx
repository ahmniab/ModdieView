import React from "react";
import MessageItem from "./MessageItem";
import type { Message } from "../../types";
import { useState } from "react";
import type { Emoji } from "../../types";

interface MessageListProps {
  messages: Message[];
  onToggleReaction: (id: string, emoji: Emoji) => void;
  onReply: (message: Message) => void;
}

const MessageList = ({ messages, onToggleReaction, onReply }: MessageListProps) => {
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const openMessage = (id: string) => setActiveMessageId(id);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} 
          isActive={activeMessageId === msg.id}
          onOpen={() => openMessage(msg.id)}
          onClose={() => setActiveMessageId(null)}
          onToggleReaction={onToggleReaction}
          onReply={(message) => {
            setActiveMessageId(null);
            onReply(message);
          }}
           />
      ))}
    </div>
  );
};

export default MessageList;