import { useRoom } from "@/contexts/RoomContext";
import { RoomHeader, DesktopLayout, MobileLayout } from "./";
import useChat from "@/hooks/useChat";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRoomVideo from "@/hooks/useRoomVideo";

export const RoomLayout = () => {
  const {
    currentVideo,
  } = useRoom();

  const {
    chatMsgs: messages,
    userId,
    userName: Name,
    sendMessage,
    sendReaction,
  } = useChat();

  const { roomId } = useParams<{ roomId: string }>();
  const [showUsersPanel, setShowUsersPanel] = useState(true);
  const [isBelowMd, setIsBelowMd] = useState(window.innerWidth < 768);
  const roomLink = (window.location.origin || "https://moddieview.com") + `/room/live/${roomId}`;
  const { broadcastVideoSeek } = useRoomVideo();
  const onSeek = (seconds: number) => {
    broadcastVideoSeek(seconds);
    }

  const toggleUsersPanel = () => {
    setShowUsersPanel((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsBelowMd(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`flex flex-col h-full`}>
      <RoomHeader
        isBelowMd={isBelowMd}
        roomLink={roomLink}
        toggleUsersPanel={toggleUsersPanel}
        showUsersPanel={showUsersPanel}
      />

      <div
        className={`relative flex flex-1 min-h-0 overflow-hidden bg-gray-900 ${
          isBelowMd ? "flex-col" : "flex-row"
        }`}
      >
        {isBelowMd ? (
          <MobileLayout
            video={currentVideo}
            userId={userId}
            messages={messages || []}
            addMessage={sendMessage}
            addReaction={sendReaction}
            userName={Name}
            onSeek={onSeek}
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
            onSeek={onSeek}
          />
        )}
      </div>
    </div>
  );
};