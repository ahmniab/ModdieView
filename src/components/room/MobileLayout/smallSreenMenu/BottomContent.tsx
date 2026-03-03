import ChatPanel from "@/components/chat/ChatPanel";
import { default as SearchBar } from "@/components/SearchBar/index";
import type { ChatReaction, IoChatMessage, Message } from "@/types";

interface Props {
  activeTab: "chat" | "search" | null;
  messages: Message[];
  addMessage: (newMessage: IoChatMessage) => void;
  addReaction: (reaction: ChatReaction) => void;
  userId: string;
  userName: string;
  onClose: () => void;
  onVideoChange: (value: string) => (void);
}

const BottomContent = ({
  activeTab,
  messages,
  addMessage,
  addReaction,
  userId,
  userName,
  onClose,
  onVideoChange,
}: Props) => {

  if (!activeTab) return null;

  return (
    <div className="h-full overflow-y-auto w-full">

      {activeTab === "chat" && (
        <ChatPanel
          messages={messages}
          userName={userName}
          isBelowMd
          AddMessage={addMessage}
          onAddReaction={addReaction}
          userId={userId}
          onCloseChat={onClose}
        />
      )}

      {activeTab === "search" && (
        <div className="h-full bg-gray-800 p-3 border-3 border-gray-700 flex justify-center">
          <SearchBar video={onVideoChange}/>
        </div>
      )}

    </div>
  );
};

export default BottomContent;