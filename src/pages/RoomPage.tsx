import { useRoom } from "../contexts/RoomContext";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { RoomModal, RoomHeader } from "@/components/room";
import MobileLayout from "../components/room/MobileLayout/MobileLayout";
import DesktopLayout from "../components/room/DesktopLayout/DesktopLayout";
import useChat from "@/hooks/useChat";

const RoomPage = () => {  const { 
    socket, 
    room, 
    currentVideo,
    joinRoom, 
    setUserName 
  } = useRoom();

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
  const roomLink = (window.location.origin || `https://moddieview.com/room`) + `/${roomId}`;
  const [showUsersPanel, setShowUsersPanel] = useState(true);
  const toggleUsersPanel = () => {
    setShowUsersPanel(prev => !prev);
  };

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

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      <div className={`flex flex-col h-full ${ showModal ? "pointer-events-none" : ""}`}>
        <RoomHeader isBelowMd={isBelowMd} roomLink= {roomLink} toggleUsersPanel={toggleUsersPanel} showUsersPanel={showUsersPanel}/>

        <div className={`relative flex flex-1 min-h-0 overflow-hidden bg-gray-900 ${isBelowMd ? "flex-col" : "flex-row"}`}>

          {isBelowMd? (
            <MobileLayout
              video={currentVideo}
              userId={userId}
              messages={messages || []}
              addMessage={sendMessage}
              addReaction={sendReaction}
              userName={Name}
            />
           ) : (
            <DesktopLayout 
              video={currentVideo}
              userId={userId} 
              chatMsgs={messages} 
              sendMessage={sendMessage} 
              sendReaction={sendReaction} 
              userName={Name}
              showUsersPanel={showUsersPanel}
              toggleUsersPanel={toggleUsersPanel}
            />)}


         </div>
      </div>
      {showModal && (
        <RoomModal onConfirm={() => {
          setShowModal(false);
          const name = localStorage.getItem("moddieview:name") || "Anonymous Moddie";
          setUserName(name);
        }} roomLink= {roomLink} />
      )}
    </div>
  );
};

export default RoomPage;