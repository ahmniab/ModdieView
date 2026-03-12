import { useEffect } from "react";

interface UseKeyboardShortcutProps {
  shortcutKeys: string[];
  callback: () => void;
}

const blacklistedTargets = ["INPUT", "TEXTAREA"];
const useKeyboardShortcut = ({ shortcutKeys, callback }: UseKeyboardShortcutProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, target, repeat } = event;
      if (repeat) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (
        target instanceof HTMLElement &&
        (blacklistedTargets.includes(target.tagName) || target.isContentEditable)
      ) return;

      const pressedKey = key.toLowerCase();

      for (const shortcut of shortcutKeys) {
        const parts = shortcut.toLowerCase().split("+");
        const hasShift = parts.includes("shift");
        const mainKey = parts[parts.length - 1];

        if (
          pressedKey === mainKey &&
          (!!hasShift === event.shiftKey)
        ) {
          event.preventDefault();
          callback();
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcutKeys, callback]);
};

export default useKeyboardShortcut;