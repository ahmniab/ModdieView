import React from "react";
import MessageItem from "./MessageItem";
import type { Message } from "../../types";
import { useEffect } from "react";
import { useState } from "react";
import type { Emoji } from "../../types";

interface MessageListProps {
  messages: Message[];
  onToggleReaction: (id: string, emoji: Emoji) => void;
}

const MessageList = ({ messages, onToggleReaction }: MessageListProps) => {
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const openMessage = (id: string) => setActiveMessageId(id);

  useEffect(() => {
    const close = () => setActiveMessageId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} 
          isActive={activeMessageId === msg.id}
          onOpen={() => openMessage(msg.id)}
          onClose={() => setActiveMessageId(null)}
          onToggleReaction={onToggleReaction} />
      ))}
    </div>
  );
};

export default MessageList;