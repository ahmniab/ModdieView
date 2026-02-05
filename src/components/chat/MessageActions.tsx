import { MdReply, MdOutlineContentCopy, MdDelete } from "react-icons/md";

interface MessageActionsProps {
  onReply?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
}

const MessageActions = ({
  onReply,
  onCopy,
  onDelete,
}: MessageActionsProps) => {
  return (
    <div className="flex flex-col gap-2 p-2 text-white text-[15px]">
      <button
        type="button"
        title="Reply"
        className="w-full flex items-center gap-3 text-left hover:bg-gray-700 cursor-pointer"
        onClick={onReply}
      >
        <MdReply size={22} /> Reply
      </button>

      <button
        type="button"
        title="Copy"
        className="w-full flex items-center gap-3 text-left hover:bg-gray-700 cursor-pointer"
        onClick={onCopy}
      >
        <MdOutlineContentCopy size={20} /> Copy
      </button>

      <button
        type="button"
        title="Delete"
        className="w-full flex items-center gap-3 text-left hover:bg-gray-700 cursor-pointer"
        onClick={onDelete}
      >
        <MdDelete size={22} /> Delete
      </button>
    </div>
  );
};

export default MessageActions;