import { useState } from "react";
import { SlOptions } from "react-icons/sl";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import type { Message } from "../../types";
import type { Emoji } from "../../types";


interface ChatPanelProps {
  width: number;
}

const ChatPanel = ({ width }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (text: string) => {
    setMessages((prev) => [...prev, 
      {
        id: crypto.randomUUID(),
        text,
        reactions: [],
        isOwn: true,
      },
    ]);
  };

  const toggleReaction = (id: string, emoji: Emoji) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              reactions: m.reactions[0] === emoji ? [] : [emoji],
            }
          : m
      )
    );
  };


  return (
    <div
      className="relative h-full bg-gray-800 flex flex-col border-l border-gray-700 shrink-0"
      style={{ width, minWidth: 280 }}
    >

      <div className="p-3 border-b border-gray-700 flex justify-between items-center">
        <span className="font-semibold">Start Conversation</span>
        <button type="button" className="p-2 hover:bg-gray-700 rounded">
          <SlOptions />
        </button>
      </div>

      <MessageList messages={messages} onToggleReaction={toggleReaction}/>
      <MessageInput onSend={handleSendMessage} />
      
    </div>
  );
};

export default ChatPanel;