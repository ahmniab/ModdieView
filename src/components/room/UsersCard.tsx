import { FaHouseUser } from "react-icons/fa";
import { useRoom } from "@/contexts/RoomContext";

interface UsersCardProps {
  userId?: string;
}

const UsersCard = ({ userId }: UsersCardProps) => {
  const { users } = useRoom();
  const usersList = Object.entries(users ?? {});
  return (
     <div className="flex flex-wrap">
        {usersList.map(([id, user]) => (
        <div key={id} className="p-1 w-[105px] h-[105px] bg-gray-500/60 flex items-center flex-col rounded-sm m-2 border border-white/40">
            <FaHouseUser className="size-12 text-white/90" />

            <div className="max-w-full min-w-0 text-center truncate text-yellow-500 text-sm">
                {user.name}
                <span className="block text-white font-semibold">
                    {id === userId && "(You)"}
                </span>
            </div>
        </div>
        ))}
      </div>
  );
};

export default UsersCard;