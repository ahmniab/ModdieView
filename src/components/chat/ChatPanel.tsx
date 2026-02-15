import { useRef, useState } from "react";
import { SlOptions } from "react-icons/sl";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import type { Message, Emoji } from "@/types";
import ChatToaster from "./ChatToaster";
import ChatSettingsModal from "./ChatSettingsModal";

interface ChatPanelProps {
  width: number;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onCloseChat: () => void;
  userName: string;
}

const ChatPanel = ({ width, messages, setMessages, onCloseChat, userName }: ChatPanelProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const chatHeaderHeight = headerRef.current?.offsetHeight ?? 0;
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const handleSendMessage = (text: string) => {
    setMessages((prev) => [...prev, 
      {
        id: crypto.randomUUID(),
        text,
        reactions: [],
        isOwn: true,
        senderName: userName,
        replyTo: replyTo ? { id: replyTo.id, text: replyTo.text, senderName: replyTo.senderName, isOwn: replyTo.isOwn }
        : undefined,
        sentAt: Date.now(),
      }
    ]);
    setReplyTo(null);
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

      <div ref={headerRef} className="p-3 border-b border-gray-700 flex justify-between items-center">
        <span className="font-semibold">Start Conversation</span>
        <button type="button" title="Chat Settings"
        className="p-2 hover:bg-gray-700 rounded cursor-pointer"
        onMouseDown={(e) => {
          e.stopPropagation();
          setShowSettings((prev) => !prev);
        }}>
          <SlOptions />
        </button>
      </div>

      <MessageList messages={messages} onToggleReaction={toggleReaction} onReply={setReplyTo} chatHeaderHeight={chatHeaderHeight} />
      <MessageInput onSend={handleSendMessage} replyTo={replyTo} onCancelReply={() => setReplyTo(null)}/>
      <ChatToaster />

      {showSettings && (
              <ChatSettingsModal
                onCloseChat={() => onCloseChat()}
                onCloseSettings={() => setShowSettings(false)}
                />
      )}

    </div>
  );
};

export default ChatPanel;