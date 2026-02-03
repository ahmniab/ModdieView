export const EMOJIS = [
    { value: "👍", label: "Like" },
    { value: "❤️", label: "Love" },
    { value: "😂", label: "Funny" },
    { value: "😮", label: "Wow" },
    { value: "😢", label: "Sad" },] as const;
export type QuickEmoji = typeof EMOJIS[number]["value"];
export type Emoji = QuickEmoji | string;
export type EmojiItem = typeof EMOJIS[number];