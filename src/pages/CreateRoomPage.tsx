import { useState, useEffect, useCallback } from "react";
import { CreateRoomModal, VideoPlayer, ChatPanel, RoomHeader } from "@/components/room";
import { IoChatboxEllipses } from "react-icons/io5";
import type { Message } from "@/types";

const CreateRoomPage = () => {
  const [chatWidth, setChatWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const startDragging = () => setIsDragging(true);
  const stopDragging = () => setIsDragging(false);
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showModal, setShowModal] = useState(true);
  const [userName, setUserName] = useState(localStorage.getItem("moddieview:name") || "Anonymous Moddie");
  const videoId = "InalcSwrMTA";

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
      <div className={`flex flex-col h-full ${ showModal ? "pointer-events-none" : ""}`}>
        <RoomHeader />

        <div className="relative flex flex-1 min-h-0 overflow-hidden">
          <VideoPlayer videoId={videoId} userName={userName} 
          key={showModal ? "loading" : "active"} />


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
                userName={userName}
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
      {showModal && (
        <CreateRoomModal onConfirm={() => {
          setShowModal(false);
          const name = localStorage.getItem("moddieview:name") || "Anonymous Moddie";
          setUserName(name);
        }} roomLink="https://moddieview.com/room/12345" />
      )}
    </div>
  );
};

export default CreateRoomPage;