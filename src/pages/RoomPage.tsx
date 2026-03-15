import { useRoom } from "../contexts/RoomContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {RoomLayout, RoomModal, LoadingRoomModal, InvalidRoomModal} from "@/components/room";

const RoomPage = () => {
  const { isConnected, roomExist, joinRoom, setUserName } = useRoom();
  const { roomId } = useParams<{ roomId: string }>();
  const [showModal, setShowModal] = useState<boolean>(true);
  const roomLink = (window.location.origin || "https://moddieview.com") + `/room/live/${roomId}`;
  useEffect(() => {
    (window as any).__shortcutsDisabled = showModal;
  }, [showModal]);
  

  useEffect(() => {
    if (roomId) joinRoom(roomId);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">

      {isConnected ? (
        <RoomLayout/>
      ) : roomExist === false ? (
        <InvalidRoomModal />
      ) : (
        <LoadingRoomModal />
      )}

      {isConnected && roomExist && showModal && (
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