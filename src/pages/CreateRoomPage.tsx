import { useState, useEffect, useCallback } from "react";
import { VideoPlayer, ChatPanel, RoomHeader } from "../components/room";
import { IoChatboxEllipses } from "react-icons/io5";
import type { Message } from "../types";


const CreateRoomPage = () => {
  const [chatWidth, setChatWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const startDragging = () => setIsDragging(true);
  const stopDragging = () => setIsDragging(false);
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const onDrag = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 240 && newWidth < 500) {
      setChatWidth(newWidth);
    }
  }, [isDragging]);

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [onDrag]);

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <RoomHeader />

      <div className="relative flex flex-1 min-h-0 overflow-hidden">
        <VideoPlayer />


        {showChat ? (
          <>
              {/* Drag handle */}
              <div
                onMouseDown={startDragging}
                className="w-1 cursor-col-resize bg-gray-700 hover:bg-purple-600"
              />

              <ChatPanel
              width={chatWidth}
              messages={messages}
              setMessages={setMessages}
              onCloseChat={() => setShowChat(false)}
              />
          </>
        ) :  (
          <button
            type="button"
            title="Start chatting"
            className="absolute bottom-4 right-4 p-3 bg-purple-700 rounded-full hover:bg-purple-700 z-50 cursor-pointer"
            onClick={() => setShowChat(true)}
          >
            <IoChatboxEllipses size={34}/>
          </button>)
        }

      </div>
    </div>
  );
};

export default CreateRoomPage;