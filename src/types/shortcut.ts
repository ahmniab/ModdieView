export type Shortcut = {
  description: string;
  keys: string;
};

export const Shortcuts: Shortcut[] = [
  { description: "Play / Pause Video", keys: "Space"},
  { description: "Seek Video", keys: "← / →" },
  { description: "Fullscreen Video", keys: "F" },
  { description: "Toggle Chat", keys: "C" },
  { description: "Toggle Users Panel", keys: "U" },
  { description: "Focus Search", keys: "S" },
  { description: "Exit Room", keys: "Shift + Q" },
];

export const shortcutKeys = {
  PLAY_PAUSE: " ",
  SEEK_LEFT: "ArrowLeft",
  SEEK_RIGHT: "ArrowRight",
  FULLSCREEN: "f",
  TOGGLE_CHAT: "c",
  TOGGLE_USERS: "u",
  FOCUS_SEARCH: "s",
  EXIT_ROOM: "Shift+q",
} as const;


export const reservedShortcutKeys = new Set(
  Object.values(shortcutKeys).map((k) => k.toLowerCase())
);