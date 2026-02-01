import { useState, useEffect } from "react";
import VideoPlayer from "../components/room/VideoPlayer";
import ChatPanel from "../components/room/ChatPanel";
import RoomHeader from "../components/room/RoomHeader";

const CreateRoomPage = () => {
  const [chatWidth, setChatWidth] = useState(330);
  const [isDragging, setIsDragging] = useState(false);

  const startDragging = () => setIsDragging(true);
  const stopDragging = () => setIsDragging(false);

  const onDrag = (e: globalThis.MouseEvent) => {
    if (!isDragging) return;

    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 240 && newWidth < 500) {
      setChatWidth(newWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [isDragging]);

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <RoomHeader />

      <div className="flex flex-1">
        <VideoPlayer />

        {/* Drag handle */}
        <div
          onMouseDown={startDragging}
          className="w-1 cursor-col-resize bg-gray-700 hover:bg-purple-600"
        />

        <ChatPanel width={chatWidth} />
      </div>
    </div>
  );
};

export default CreateRoomPage;