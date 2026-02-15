import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import createNewRoom from "../network/createNewRoom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const createRoom = async () => {
    try {
      const room = await createNewRoom("New Room");
      navigate(`/room/${room.roomId}`);
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1 px-6 py-2 flex items-center justify-center">
        <button onClick={createRoom} className="rounded-lg bg-purple-700 px-10 py-4 text-white text-lg font-semibold transition duration-300 ease-in-out hover:shadow-2xl cursor-pointer">Create Room</button>
      </main>
    </div>
  );
};

export default HomePage;