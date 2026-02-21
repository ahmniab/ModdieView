import ChatPanel from "@/components/chat/ChatPanel";
import { default as SearchBar } from "@/components/SearchBar/index";
import type { Message } from "@/types";

interface Props {
  activeTab: "chat" | "search" | null;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  userName: string;
  onClose: () => void;
}

const BottomContent = ({
  activeTab,
  messages,
  setMessages,
  userName,
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
          setMessages={setMessages}
          userName={userName}
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