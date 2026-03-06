import { motion } from "framer-motion";
import worldMap from "@/assets/world.png";

const MapSection = ({ container, item }: any) => {
  return (
    <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative w-full max-w-[800px] aspect-[8/3] lg:aspect-[8/3] sm:aspect-[8/3] rounded-xl flex items-center justify-center bg-center bg-contain bg-no-repeat opacity-90"
    >
        <img
            src={worldMap}
            loading="eager"
            className="absolute inset-0 w-full h-full object-contain opacity-90 pointer-events-none scale-[1.4] sm:scale-100 origin-center"
        />

        <motion.div
            variants={item}
            className="absolute 
            left-[9%] top-[2%]
            sm:left-[19%] sm:top-[22%]
            text-xl drop-shadow-[0_0_8px_red]"
        >
            📍
        </motion.div>

        <motion.div
            variants={item}
            className="absolute 
            left-[70%] top-[0%]
            sm:left-[65%] sm:top-[23%]
            text-xl drop-shadow-[0_0_8px_red]"
        >
            📍
        </motion.div>

        <motion.div
            variants={item}
            className="absolute 
            right-[60%] top-[4%]
            sm:left-[8%] sm:top-[24%] sm:right-auto
            flex flex-col items-center"
        >
            🙂

            <motion.div
                variants={item}
                className="bg-zinc-700 p-3 rounded-lg mt-4 select-none"
            >
                Want to spend time together?
            </motion.div>
        </motion.div>

        <motion.div
            variants={item}
            className="absolute 
            left-[72%] top-[5%]
            sm:left-[66%] sm:top-[25%]
            flex flex-col items-center"
        >
            😄

            <motion.div
                variants={item}
                className="bg-gray-600 p-3 rounded-lg mt-4 select-none"
            >
                Sure!
            </motion.div>
        </motion.div>
    </motion.div>
  );
};

export default MapSection;