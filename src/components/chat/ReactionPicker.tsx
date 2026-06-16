import EmojiPicker, { Theme } from "emoji-picker-react";

interface ReactionPickerProps {
  onEmojiSelect: (emoji: string) => void;
  className?: string;
}

const ReactionPicker = ({ onEmojiSelect, className }: ReactionPickerProps) => {
  return (
    <div className={`z-50 ${className ?? ""}`} onMouseDown={(e) => e.stopPropagation()}>
      <EmojiPicker
        onEmojiClick={(emojiData) => onEmojiSelect(emojiData.emoji)}
        theme={Theme.DARK}
        previewConfig={{ showPreview: false }}
        height={290}
        width="250px"
      />
    </div>
  );
};

export default ReactionPicker;