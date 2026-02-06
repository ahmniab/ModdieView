import { MdOutlineAddReaction } from "react-icons/md";
import type { Emoji } from "../../types";
import { EMOJIS } from "../../types";

interface MessageReactionsProps {
  onSelect: (emoji: Emoji) => void;
  onOpenPicker: () => void;
  selectedEmoji?: Emoji | null;
}

const MessageReactions = ({
  onSelect,
  onOpenPicker,
  selectedEmoji,
}: MessageReactionsProps) => {
  return (
    <div
      className="flex gap-1 rounded-lg border border-gray-700 p-2"
      onClick={(e) => e.stopPropagation()}
    >
      {EMOJIS.map(({ value, label }) => {
        const isSelected = selectedEmoji === value;

        return (
          <button
            key={value}
            onClick={() => onSelect(value)}
            title={label}
            className={`text-[19px] transition rounded-full px-0.5 py-0.5 cursor-pointer
              ${
                isSelected
                  ? "bg-purple-600"
                  : "hover:scale-125"
              }
            `}
          >
            {value}
          </button>
        );
      })}

      <button
        onClick={onOpenPicker}
        className="opacity-70 hover:opacity-100 hover:scale-125 transition cursor-pointer"
        title="More reactions"
      >
        <MdOutlineAddReaction size={23} />
      </button>
    </div>
  );
};

export default MessageReactions;
