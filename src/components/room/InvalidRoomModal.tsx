import { MdErrorOutline } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { useRoom } from "@/contexts/RoomContext";
import { useNavigate } from "react-router-dom";

export const InvalidRoomModal = () => {
    const { quitRoom } = useRoom();
    const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center flex-col bg-gray-800/90">
        <div className="flex items-center justify-center mb-2">
            <MdErrorOutline className="size-10 inline mr-2"/>
            <h2 className="text-3xl font-semibold">
                Room not found
            </h2>
        </div>
        <p className="text-white/60 mb-8">
          This room doesn't exist or was deleted.
        </p>
        <button
          onClick={() => {
            quitRoom();
            navigate("/");
        }}
          className="bg-purple-600/60 px-4 py-2 rounded-lg">
            <div className="flex items-center justify-center">
                <IoIosHome className="size-5 mr-1"/>
                Go Home
            </div>
        </button>
    </div>
  );
};