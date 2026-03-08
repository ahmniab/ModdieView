import Navbar from "../components/home/Navbar";
import{ HeroSection, FeatureSection} from "@/components/home";
import { MdAttachEmail } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";


const HomePage: React.FC = () => {
  const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.4
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white overflow-x-hidden">
      <Navbar />
      
      <main className="flex flex-col">
        <HeroSection container={container} item={item}/>
        <FeatureSection/>
      </main>

      <footer className="px-10 py-10 sm:px-20 sm:py-16 bg-gray-900">
        <div className="flex items-center">
          <MdOutlineMailOutline className="mr-2 size-7"/>
          <a href="mailto:moddieview@gmail.com" target="_blank" rel="noopener noreferrer" className="text-md">moddieview@gmail.com</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;