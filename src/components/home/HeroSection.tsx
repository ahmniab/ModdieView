import { motion } from "framer-motion";
import MapSection from "./MapSection.tsx";
import createNewRoom from "@/network/createNewRoom.ts";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ container, item }: any) => {
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
    <section className="bg-gray-800/70 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-6xl flex flex-col items-center text-center py-12 sm:py-18">
            <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[23px] font-bold mb-2 sm:mb-4 md:mb-4 lg:mb-6 sm:text-3xl md:text-4xl lg:text-5xl"
            >
                Moments Are Better Together
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 max-w-xl mb-14 sm:mb-8 md:mb-8 lg:mb-8"
            >
                Create a room, invite others, and enjoy shared moments in real time..
            </motion.p>

            <MapSection container={container} item={item}/>  

            <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={createRoom}
                title="Create a new room"
                className="mt-19 sm:mt-10 rounded-lg bg-purple-700 px-5 py-4 lg:px-10 lg:py-4 text-lg font-semibold hover:bg-purple-600 transition shadow-xl cursor-pointer"
            >
                Create Room
            </motion.button>
        </div>
    </section>
    );
};

export default HeroSection;