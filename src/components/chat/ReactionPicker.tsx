import { MdInsertEmoticon } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

interface ReactionPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const ReactionPicker = ({ onEmojiSelect }: ReactionPickerProps) => {
  return (
    <div className="absolute bottom-14 right-0 z-50 w-[100%] max-w-[300px]">
      <EmojiPicker
        onEmojiClick={(emojiData) => onEmojiSelect(emojiData.emoji)}
        theme="dark"
        previewConfig={{ showPreview: false }}
        emojiSize={15}
        height={300}
        width="100%"
      />
    </div>
  );
};

export default ReactionPicker;