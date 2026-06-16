import menuItems from "./MenuItems";
interface Props {
  activeTab: "chat" | "search" | "home";
  setActiveTab: (tab: "chat" | "search" | "home") => void;
}

const BottomMenu = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="h-10 w-full mb-[0%] flex border border-gray-600 bg-gray-900">

      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex-1 flex items-center justify-center transition-colors cursor-pointer
              ${activeTab === item.key
                ? "bg-yellow-600/30"
                : "text-gray-400"}
            `}
          >
            <Icon size={22} />
          </button>
        );
      })}

    </div>
  );
};

export default BottomMenu;