import ChatPanel from "@/components/chat/ChatPanel";
import SearchBar from "@/components/SearchBar/index";
import type { ChatReaction, IoChatMessage, Message } from "@/types";
import { useRoom } from "@/contexts/RoomContext";
import { FaUsers } from "react-icons/fa";
import UsersCard from "@/components/room/UsersCard" ;

interface Props {
  activeTab: "chat" | "search" | "home";
  messages: Message[];
  addMessage: (newMessage: IoChatMessage) => void;
  addReaction: (reaction: ChatReaction) => void;
  userId: string;
  onClose: () => void;
  onSeek: (seconds: number) => void;
}

const BottomContent = ({
  activeTab,
  messages,
  addMessage,
  addReaction,
  userId,
  onClose,
  onSeek
}: Props) => {
  const { users } = useRoom();
  const usersCount = Object.keys(users ?? {}).length;

  if (!activeTab) return null;

  return (
    <div className="h-full overflow-y-auto w-full custom-scroll">

      {activeTab === "chat" && (
        <ChatPanel
          messages={messages}
          isBelowMd
          AddMessage={addMessage}
          onAddReaction={addReaction}
          userId={userId}
          onCloseChat={onClose}
          onSeek={onSeek}
        />
      )}

      {activeTab === "search" && (
        <div className="h-full bg-gray-800 p-3 border-3 border-gray-700 flex justify-center">
          <SearchBar />
        </div>
      )}

      {activeTab === "home" && (
        <div className=" flex flex-col">
          <div className=" text-gray-400/90 text-[24px] font-semibold flex items-center justify-end mr-5 gap-1"
            title="Number of Users">
            <FaUsers className="size-6" />
            {usersCount}
          </div>
          <UsersCard userId={userId}/>
      </div>
      )}
    </div>
  );
};

export default BottomContent;