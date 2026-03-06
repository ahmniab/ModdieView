import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, description }: any) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
      <Icon className="size-12 mb-4 text-white/60" />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;