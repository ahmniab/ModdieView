import { useState, useCallback, useEffect } from "react";
import type { IoChatMessage, Message, RoomContent } from "@/types";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import ChatPanel from "../../chat/ChatPanel";
import ResizeHandle from "./ResizeHandle";
import { BsChatText } from "react-icons/bs";
import { default as UsersPanel} from "./UsersPanel"
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";

interface Props {
  video: RoomContent;
  userName: string;
  chatMsgs?: Message[];
  userId?: string;
  sendMessage?: (msg: IoChatMessage) => void;
  sendReaction?: (reaction: any) => void;
  showUsersPanel: boolean;
  toggleUsersPanel: () => void;
}

const DesktopLayout = ({
  video,
  userName,
  chatMsgs,
  sendMessage,
  sendReaction,
  userId,
  showUsersPanel,
  toggleUsersPanel,
}: Props) => {
  const [chatWidth, setChatWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const toggleChat = useCallback(() => {
    setShowChat(prev => !prev);
  }, []);

  useKeyboardShortcut({
    shortcutKeys: ["c"],
    callback: toggleChat,
  });

  useKeyboardShortcut({
    shortcutKeys: ["u"],
    callback: toggleUsersPanel,
  });

  const onDrag = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const newWidth = window.innerWidth - e.clientX;

    if (newWidth > 240 && newWidth < 500) {
      setChatWidth(newWidth);
    }
  }, [isDragging]);

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", () => setIsDragging(false));

    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", () => setIsDragging(false));
    };
  }, [onDrag]);

  return (
    <div className="flex flex-1 bg-gray-900 overflow-hidden">
      {showUsersPanel && (
        <div className="w-[130px] shrink-0 border-r border-white/40 bg-gray-500/30 overflow-y-auto custom-scroll">
          <UsersPanel userId={userId}/>
        </div> 
      )}

      <div className="flex-1 flex items-center justify-center min-w-0">
        <VideoPlayer
          video={video}
          userName={userName}
        />
      </div>

      {showChat? (
        <>
          <ResizeHandle onStartDrag={() => setIsDragging(true)} />
          <div style={{ width: chatWidth }} className="shrink-0 min-w-[280px] box-border">
            <ChatPanel
              messages={chatMsgs || []}
              isBelowMd={false}
              AddMessage={sendMessage || (() => {})}
              onAddReaction={sendReaction || (() => {})}
              userId={userId || "unknown"}
              onCloseChat={() => setShowChat(false)}
            />
          </div>
        </>
        ) : (
            <button
                type="button"
                title="Start chatting (c)"
                className="absolute bottom-4 right-4 p-3 bg-purple-800 rounded-full hover:bg-purple-700 z-5 cursor-pointer"
                onClick={() => setShowChat(true)}
            >
                <BsChatText size={35} />
            </button>
          )}
    </div>
  );
};

export default DesktopLayout;