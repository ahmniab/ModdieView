import ChatPanel from "@/components/chat/ChatPanel";
import { default as SearchBar } from "@/components/SearchBar/index";
import type { ChatReaction, IoChatMessage, Message } from "@/types";

interface Props {
  activeTab: "chat" | "search" | null;
  messages: Message[];
  addMessage: (newMessage: IoChatMessage) => void;
  addReaction: (reaction: ChatReaction) => void;
  userId: string;
  onClose: () => void;
}

const BottomContent = ({
  activeTab,
  messages,
  addMessage,
  addReaction,
  userId,
  onClose
}: Props) => {

  if (!activeTab) return null;

  return (
    <div className="h-full overflow-y-auto w-full">

      {activeTab === "chat" && (
        <ChatPanel
          width={window.innerWidth}
          messages={messages}
          isBelowMd
          AddMessage={addMessage}
          onAddReaction={addReaction}
          userId={userId}
          onCloseChat={onClose}
        />
      )}

      {activeTab === "search" && (
        <div className="h-full bg-gray-800 p-3 border-3 border-gray-700 flex justify-center">
          <SearchBar/>
        </div>
      )}

    </div>
  );
};

export default BottomContent;