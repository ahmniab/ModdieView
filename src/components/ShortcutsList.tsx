const ShortcutsList = () => {
  return (
    <div className="flex flex-col text-gray-400 ml-4">

      <div className="flex justify-between py-1">
        <span>Play / Pause Video</span>
        <kbd className="bg-gray-700 px-2 rounded">Space</kbd>
      </div>

      <div className="flex justify-between py-1">
        <span>Seek Video</span>
        <kbd className="bg-gray-700 px-2 rounded">← / →</kbd>
      </div>

      <div className="flex justify-between py-1">
        <span>Fullscreen Video</span>
        <kbd className="bg-gray-700 px-2 rounded">F</kbd>
      </div>

      <div className="flex justify-between py-1">
        <span>Toggle Chat</span>
        <kbd className="bg-gray-700 px-2 rounded">C</kbd>
      </div>

      <div className="flex justify-between py-1">
        <span>Toggle Users Panel</span>
        <kbd className="bg-gray-700 px-2 rounded">U</kbd>
      </div>

      <div className="flex justify-between py-1">
        <span>Search</span>
        <kbd className="bg-gray-700 px-2 rounded">S</kbd>
      </div>

      <div className="flex justify-between py-1">
        <span>Exit Room</span>
        <kbd className="bg-gray-700 px-2 rounded">Shift + Q</kbd>
      </div>

    </div>
  );
};

export default ShortcutsList;