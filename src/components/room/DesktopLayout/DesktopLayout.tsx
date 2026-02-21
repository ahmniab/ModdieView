import { useState, useCallback, useEffect } from "react";
import type { Message } from "@/types";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import ChatPanel from "../../chat/ChatPanel";
import ResizeHandle from "./ResizeHandle";
import { BsChatText } from "react-icons/bs";
interface Props {
  video: string;
  userName: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const DesktopLayout = ({
  video,
  userName,
  messages,
  setMessages
}: Props) => {
  const [chatWidth, setChatWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const [showChat, setShowChat] = useState(true);

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
    <div className="flex flex-1 overflow-hidden bg-gray-900">

      <div className="flex-1 flex items-center justify-center">
        <VideoPlayer
          video={video}
          userName={userName}
        />
      </div>

      {showChat? (
        <>
          <ResizeHandle onStartDrag={() => setIsDragging(true)} />
          <div style={{ width: chatWidth }}>
            <ChatPanel
              width={chatWidth}
              messages={messages}
              isBelowMd={false}
              setMessages={setMessages}
              userName={userName}
              onCloseChat={() => setShowChat(false)}
            />
          </div>
        </>
        ) : (
            <button
                type="button"
                title="Start chatting"
                className="absolute bottom-4 right-4 p-3 bg-purple-700 rounded-full hover:bg-purple-600 z-5 cursor-pointer"
                onClick={() => setShowChat(true)}
            >
                <BsChatText size={35} />
            </button>
          )}
    </div>
  );
};

export default DesktopLayout;