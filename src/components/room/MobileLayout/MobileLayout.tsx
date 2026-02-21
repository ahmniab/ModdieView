import { useState } from "react";
import type { Message } from "@/types";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import BottomMenu from "./smallSreenMenu/BottomMenu";
import BottomContent from "./smallSreenMenu/BottomContent";
import FloatingSidebar from "./smallSreenMenu/FloatingSidebar";
import { FaGripLinesVertical } from "react-icons/fa";

interface Props {
  video: string;
  userName: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const MobileLayout = ({
  video,
  userName,
  messages,
  setMessages,
}: Props) => {
  const [activeTab, setActiveTab] =
    useState<"chat" | "search" | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="h-[100dvh] sm: w-full flex flex-col bg-gray-900 overflow-hidden">

        <div className="h-[35dvh] flex-shrink-0 mb-1">
          <VideoPlayer video={video} userName={userName} />
        </div>

        <div className="flex-1 flex flex-col min-h-0">

          <div className="flex-1 min-h-0 overflow-y-auto">
            <BottomContent
              activeTab={activeTab}
              messages={messages}
              setMessages={setMessages}
              userName={userName}
              onClose={() => setActiveTab(null)}
            />
          </div>

          <div className="hidden sm:block h-25 flex-shrink-0 border-t border-white/10 bg-gray-900">
            <BottomMenu
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

        </div>
      </div>

      <FloatingSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        setActiveTab={setActiveTab}
      />
      {!sidebarOpen && (
        <div className="sm:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
          <FaGripLinesVertical
            onClick={() => setSidebarOpen(true)}
            size={28}
            className="text-white/30 cursor-pointer"
          />
          <div className="w-[10px] h-[100px] bg-white/20 backdrop-blur-sm rounded-tl-[8px] rounded-bl-[8px]" />
        </div>
      )}
    </>
  );
};

export default MobileLayout;