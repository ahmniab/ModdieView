import FeatureCard from "./FeatureCard";
import { BsChatText } from "react-icons/bs";
import { ImVideoCamera } from "react-icons/im";
import { MdNoAccounts } from "react-icons/md";

const FeatureSection = () => {
  return (
    <section className="py-24  bg-gray-800 px-6 border-y-2 border-gray-400/20">
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <FeatureCard icon= {ImVideoCamera} title="Synced Playback" description="Everyone watches the same moment together."/>

            <FeatureCard icon= {BsChatText} title="Live Chat" description="Talk with friends while watching."/>

            <FeatureCard icon= {MdNoAccounts} title="No Account Needed" description="Create a room and start instantly."/>
          
        </div>
    </section>
    );
};

export default FeatureSection;