import { useState } from "react";
import { SlOptions } from "react-icons/sl";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface ChatPanelProps {
  width: number;
}

const ChatPanel = ({ width }: ChatPanelProps) => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div
      className="bg-gray-800 flex flex-col border-l border-gray-700 shrink-0"
      style={{ width, minWidth: 280 }}
    >

      <div className="p-3 border-b border-gray-700 flex justify-between items-center">
        <span className="font-semibold">Start Conversation</span>
        <button type="button" className="p-2 hover:bg-gray-700 rounded">
          <SlOptions />
        </button>
      </div>

      <MessageList messages={messages} />
      <MessageInput onSend={handleSendMessage} />
      
    </div>
  );
};

export default ChatPanel;