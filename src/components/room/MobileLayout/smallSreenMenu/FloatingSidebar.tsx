import menuItems from "./MenuItems";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: "chat" | "search" | "home") => void;
}

const FloatingSidebar = ({ isOpen, onClose, setActiveTab }: SidebarProps) => {
  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      <div
        className={`fixed top-[40%] right-0 max-h-[85vh] bg-gray-900 rounded-3xl
          shadow-xl border border-gray-700 p-1 z-50 transition-all duration-300
          ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        `}
      >

        <div className="flex flex-col">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key); 
                  onClose();
                }}
                className="flex items-center p-2 rounded-xl transition">
                  
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-gray-800">
                  <Icon size={18} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FloatingSidebar;