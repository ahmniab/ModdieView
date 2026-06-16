import { useRef, useCallback } from "react";

const REMOTE_ACTION_WINDOW = 500; // ms to suppress local broadcasts after a remote action

export default function useRemoteAction() {
  const lastRemoteActionTime = useRef(0);

  const markRemoteAction = useCallback(() => {
    lastRemoteActionTime.current = Date.now();
  }, []);

  const isRemoteActionRecent = useCallback(() => {
    return Date.now() - lastRemoteActionTime.current < REMOTE_ACTION_WINDOW;
  }, []);

  return { markRemoteAction, isRemoteActionRecent };
}
