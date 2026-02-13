import EmojiPicker from "emoji-picker-react";

interface ReactionPickerProps {
  onEmojiSelect: (emoji: string) => void;
  className?: string;
}

const ReactionPicker = ({ onEmojiSelect, className }: ReactionPickerProps) => {
  return (
    <div className={`z-50 ${className ?? ""}`}>
      <EmojiPicker
        onMouseDown={(e) => e.stopPropagation()}
        onEmojiClick={(emojiData) => onEmojiSelect(emojiData.emoji)}
        theme="dark"
        previewConfig={{ showPreview: false }}
        emojiSize={15}
        height={290}
        width="250px"
      />
    </div>
  );
};

export default ReactionPicker;