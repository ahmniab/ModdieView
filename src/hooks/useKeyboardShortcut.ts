import { useEffect, type RefObject } from "react";
import { reservedShortcutKeys } from "@/types";

interface UseKeyboardShortcutProps {
  shortcutKeys: string[];
  callback: () => void;
  focusRef?: RefObject<HTMLInputElement | null>;
}

const blacklistedTargets = ["INPUT", "TEXTAREA"];
const useKeyboardShortcut = ({
  shortcutKeys,
  callback,
  focusRef,
}: UseKeyboardShortcutProps) => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((window as any).__shortcutsDisabled) return;
      const { key, target, repeat } = event;

      if (repeat) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      if ( target instanceof HTMLElement &&
        (blacklistedTargets.includes(target.tagName) || target.isContentEditable)) return;

      const pressedKey = key.toLowerCase();

      for (const shortcut of shortcutKeys) {
        const parts = shortcut.toLowerCase().split("+");
        const hasShift = parts.includes("shift");
        const mainKey = parts[parts.length - 1];

        if (pressedKey === mainKey &&(!!hasShift === event.shiftKey)) {
          event.preventDefault();
          callback();
          return;
        }
      }

      if (focusRef && key.length===1 && !reservedShortcutKeys.has(pressedKey)) {
        focusRef.current?.focus();
      }

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [shortcutKeys, callback, focusRef]);
};

export default useKeyboardShortcut;