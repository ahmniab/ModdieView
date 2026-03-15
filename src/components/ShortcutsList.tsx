import { Shortcuts } from "@/types";

const ShortcutsList = () => {
  return (
    <div className="flex flex-col text-gray-400 ml-4">
      {Shortcuts.map((shortcut, index) => (
        <div className="flex justify-between py-1" key={index}>
          <span>{shortcut.description}</span>
          <kbd className="bg-gray-700 px-2 rounded">{shortcut.keys}</kbd>
        </div>
      ))}
    </div>
  );
};

export default ShortcutsList;