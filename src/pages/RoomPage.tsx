import { useRoom } from "../contexts/RoomContext";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, use } from "react";
import { RoomModal, RoomHeader } from "@/components/room";
import MobileLayout from "../components/room/MobileLayout/MobileLayout";
import DesktopLayout from "../components/room/DesktopLayout/DesktopLayout";
import useChat from "@/hooks/useChat";

const RoomPage = () => {
  const [chatWidth, setChatWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const stopDragging = () => setIsDragging(false);
  const { socket, room, joinRoom } = useRoom();
  const { 
    chatMsgs: messages, 
    userId, 
    userName: Name, 
    sendMessage, 
    sendReaction 
  } = useChat();
  const { roomId } = useParams<{ roomId: string }>();
  const [showModal, setShowModal] = useState(true);
  const [isBelowMd, setIsBelowMd] = useState(window.innerWidth < 768);
  const video = "https://youtu.be/UUBf8bSGq54?si=5wGMO4Hou3klUJMv";

useEffect(() => {
  const handleResize = () => {
    setIsBelowMd(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  useEffect(() => {
    if (roomId) {
      joinRoom(roomId);
    }
  }, []);
  useEffect(() => {
    if (!socket) {
      console.warn("Socket not initialized yet"); 
      return;
    }
    socket.on("CMD:usersUpdate", (updatedUsers: any[]) => {
      console.log("Received users update:", updatedUsers);
    });
    socket.emit("CMD:name", "ahmed nabil");
  }, [room, socket]);

  const onDrag = useCallback((e: MouseEvent) => {
    if (!isDragging || isBelowMd ) return;

    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 240 && newWidth < 500) {
      setChatWidth(newWidth);
    }
  }, [isDragging, isBelowMd]);

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [onDrag]);
  
  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      <div className={`flex flex-col h-full ${ showModal ? "pointer-events-none" : ""}`}>
        <RoomHeader isBelowMd={isBelowMd} />

        <div className={`relative flex flex-1 min-h-0 overflow-hidden bg-gray-900 ${isBelowMd ? "flex-col" : "flex-row"}`}>

          {isBelowMd? (
            <MobileLayout
              video={video}
              userId={userId}
              messages={messages || []}
              addMessage={sendMessage}
              addReaction={sendReaction}
            />
           ) : (
            <DesktopLayout 
              video={video} 
              userId={userId} 
              chatMsgs={messages} 
              sendMessage={sendMessage} 
              sendReaction={sendReaction} 
              userName={Name}
            />)}


         </div>
      </div>
      {showModal && (
        <RoomModal onConfirm={() => {
          setShowModal(false);
          const name = localStorage.getItem("moddieview:name") || "Anonymous Moddie";
        }} roomLink={`https://moddieview.com/room/${roomId}`} />
      )}
    </div>
  );
};

export default RoomPage;