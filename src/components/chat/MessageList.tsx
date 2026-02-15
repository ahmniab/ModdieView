import MessageItem from "./MessageItem";
import type { Message, Emoji } from "@/types";
import { useEffect, useRef ,useState } from "react";

interface MessageListProps {
  messages: Message[];
  onToggleReaction: (id: string, emoji: Emoji) => void;
  onReply: (message: Message) => void;
  chatHeaderHeight: number;
}

const MessageList = ({ messages, onToggleReaction, onReply, chatHeaderHeight = 0 }: MessageListProps) => {
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const openMessage = (id: string) => setActiveMessageId(id);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isNearBottom = () => {
  const el = containerRef.current;
  if (!el) return true;
  return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const didISendLastMessage = lastMessage?.isOwn;
    if(didISendLastMessage || isNearBottom()){
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);


  return (
    <div className="flex-1 pt-4 pr-4 pl-4 overflow-y-auto space-y-4" ref={containerRef}>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} 
          isActive={activeMessageId === msg.id}
          onOpen={() => openMessage(msg.id)}
          onClose={() => setActiveMessageId(null)}
          onToggleReaction={onToggleReaction}
          chatHeaderHeight={chatHeaderHeight}
          onReply={(message) => {
            setActiveMessageId(null);
            onReply(message);
          }}
           />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;