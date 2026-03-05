import { useRoom } from "@/contexts/RoomContext";
import { FaUsers } from "react-icons/fa";
import UsersCard from "../UsersCard";

interface UsersPanelProps {
  userId?: string;
}

const UsersPanel = ( { userId } : UsersPanelProps ) => {
  const { users } = useRoom();
  const userCount = Object.keys(users ?? {}).length;
  
  return (
    <>
      <div className="flex items-center gap-1 text-gray-300 text-sm font-semibold text-[20px] px-3 mt-1">
        <FaUsers size={24}/>
        {userCount}
      </div>
      <UsersCard userId={userId}/>
    </>
  );
};

export default UsersPanel;